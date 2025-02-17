import { users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
    const body = await req.json()
    const signature = await req.headers.get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error) {
        return new NextResponse('Webhook Error', { status: 400 });
    }

    switch (event.type) {
        case 'customer.subscription.updated':
            const subscription = event.data.object as Stripe.Subscription;
            await db.update(users)
                .set({
                    stripeSubscriptionId: subscription.id,
                    stripePriceId: subscription.items.data[0].price.id,
                    stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
                })
                .where(eq(users.stripeCustomerId, subscription.customer as string));
            break;

        case 'customer.subscription.deleted':
            const deletedSubscription = event.data.object as Stripe.Subscription;
            await db.update(users)
                .set({
                    stripeSubscriptionId: null,
                    stripePriceId: null,
                    stripeCurrentPeriodEnd: null,
                })
                .where(eq(users.stripeCustomerId, deletedSubscription.customer as string));
            break;
    
        case 'checkout.session.completed':
            const session = event.data.object as Stripe.Checkout.Session;
            await db.update(users)
                .set({
                    stripeSubscriptionId: session.subscription as string,
                    stripePriceId: session.metadata?.priceId,
                })
                .where(eq(users.stripeCustomerId, session.customer as string));
            break;
    }

    return new NextResponse(null, { status: 200 });
}