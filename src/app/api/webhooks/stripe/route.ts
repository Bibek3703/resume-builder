import { invoices, users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import {  NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
    const body = await req.text()
    const headerPayload = await headers()
    const signature =  headerPayload.get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error) {
        console.log(`Customer subscription created ${error}`)
        return new NextResponse('Webhook Error: '+error, { status: 500 });
    }


    switch (event.type) {
        case 'customer.subscription.created': {
                console.log(`Customer subscription created`)
                const subscription = event.data.object as Stripe.Subscription;
                await db.update(users)
                    .set({
                        stripeSubscriptionId: subscription.id,
                        stripePriceId: subscription.items.data[0].price.id,
                        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
                    })
                    .where(eq(users.stripeCustomerId, subscription.customer as string));
            }
            break;

        case 'customer.subscription.deleted':{
                console.log(`Customer subscription deleted`)
                const deletedSubscription = event.data.object as Stripe.Subscription;
                await db.update(users)
                    .set({
                        stripeSubscriptionId: null,
                        stripePriceId: null,
                        stripeCurrentPeriodEnd: null,
                    })
                    .where(eq(users.stripeCustomerId, deletedSubscription.customer as string));
            }
            break;
    
        case 'checkout.session.completed':{
                console.log(`Customer checkout completed`)
                const session = event.data.object as Stripe.Checkout.Session;
                const subscription = await stripe.subscriptions.retrieve(
                    session.subscription as string
                );

                // Cancel previous subscription
                if (session?.metadata?.previous_subscription) {
                    await stripe.subscriptions.update(
                        session.metadata.previous_subscription,
                        { cancel_at_period_end: true }
                    );
                }

                // Update database
                await db.update(users)
                    .set({
                        stripeSubscriptionId: subscription.id,
                        stripePriceId: subscription.items.data[0].price.id,
                        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)
                    })
                    .where(eq(users.stripeCustomerId, session.customer as string));
            }
            break;
        
        case 'invoice.payment_succeeded':{
            const invoice = event.data.object as Stripe.Invoice;
            console.log({ userId: invoice?.subscription_details?.metadata })
            const userId = invoice?.subscription_details?.metadata?.clerkUserId || "" as string
            console.log({ userId })

            if(invoice){
                await db.insert(invoices).values({
                    id: invoice.id,
                    userId,
                    amount: invoice.total,
                    currency: invoice.currency,
                    status: 'paid',
                    pdfUrl: invoice.invoice_pdf,
                    date: new Date(invoice.created * 1000),
                });
            }
        }
        break;

        case 'invoice.payment_failed':{
            const failedInvoice = event.data.object as Stripe.Invoice;
            // console.log({failedInvoice})
            const userId = failedInvoice?.subscription_details?.metadata?.clerkUserId || "" as string
            if (failedInvoice){
                await db.insert(invoices).values({
                    id: failedInvoice.id,
                    userId,
                    amount: failedInvoice.amount_paid,
                    currency: failedInvoice.currency,
                    status: 'failed',
                    pdfUrl: failedInvoice.invoice_pdf,
                    date: new Date(failedInvoice.created * 1000),
                });
            }
        }
        break;
    }

    return new NextResponse(null, { status: 200 });
}