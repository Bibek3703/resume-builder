import { users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    try {
         const user = await db
                    .select({
                        stripeCustomerId: users.stripeCustomerId
                    })
                    .from(users)
                    .where(eq(users.id, userId))
                    .then(rows => rows[0]);

        if (!user?.stripeCustomerId) {
            return NextResponse.json({
                subscription: { status: 'inactive' },
                invoices: []
            });
        }

        // Get subscription
        const subscription = await stripe.subscriptions.list({
            customer: user.stripeCustomerId,
            limit: 1,
            status: 'active',
        });

        // Get invoices
        const invoices = await stripe.invoices.list({
            customer: user.stripeCustomerId,
            limit: 12,
        });

        const plan = await getPlanName(subscription.data[0]?.items.data[0]?.price.product as string)

        return NextResponse.json({
            subscription: {
                status: subscription.data[0]?.status || 'inactive',
                plan,
                renewalDate: subscription.data[0]?.current_period_end
                    ? new Date(subscription.data[0].current_period_end * 1000).toISOString()
                    : null,
            },
            invoices: invoices.data.map(invoice => ({
                id: invoice.id,
                amount: invoice.amount_paid,
                currency: invoice.currency,
                status: invoice.status || 'paid',
                pdfUrl: invoice.invoice_pdf,
                date: new Date(invoice.created * 1000).toISOString(),
            }))
        });
    } catch (error) {
        console.log({error})
        return new NextResponse("Internal Error", { status: 500 });
    }
}

async function getPlanName(productId?: string) {
    if (!productId) return 'Free';
    const product = await stripe.products.retrieve(productId, {
        expand: ['price'],
    });
    // console.log({price})
    // if (productId.includes('basic')) return 'Basic';
    // if (productId.includes('pro')) return 'Pro';
    // if (productId.includes('premium')) return 'Premium';
    return product.name;
}