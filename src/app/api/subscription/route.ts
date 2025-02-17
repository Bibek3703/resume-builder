import { users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { getPlanName } from '@/lib/stripe/price';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

// Define response types
interface SubscriptionInactive {
    status: 'inactive';
}

interface SubscriptionActive {
    status: 'active';
    plan: string;
    renewalDate: string;
}

type SubscriptionResponse = SubscriptionInactive | SubscriptionActive;


export async function GET(): Promise<NextResponse<SubscriptionResponse | { error: string }>> {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized access' },
                { status: 401 }
            );
        }

        const user = await db
            .select({
                stripeSubscriptionId: users.stripeSubscriptionId,
                stripePriceId: users.stripePriceId,
                stripeCurrentPeriodEnd: users.stripeCurrentPeriodEnd
            })
            .from(users)
            .where(eq(users.id, userId))
            .then(rows => rows[0]);

        if (!user?.stripeSubscriptionId || !user?.stripePriceId) {
            return NextResponse.json({ status: 'inactive' });
        }

        const subscription = await stripe.subscriptions.retrieve(user?.stripeSubscriptionId);

        console.log({subscription})

        const plan = await getPlanName(subscription?.items.data[0]?.price.product as string)

        return NextResponse.json({
            status: 'active',
            plan: plan,
            renewalDate: user.stripeCurrentPeriodEnd?.toISOString() ?? new Date().toISOString()
        });
    } catch (error) {
        console.error('[SUBSCRIPTION_STATUS_ERROR]', error instanceof Error ? error.message : 'Unknown error');

        return NextResponse.json(
            { error: 'Failed to fetch subscription status' },
            { status: 500 }
        );
    }
}