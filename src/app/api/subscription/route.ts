import { users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

// Define subscription plans as an enum for type safety
export enum SubscriptionPlan {
    Free = 'Free',
    Pro = 'Pro Plan',
    Premium = 'Premium Plan',
    Custom = 'Custom Plan'
}

// Define response types
interface SubscriptionInactive {
    status: 'inactive';
}

interface SubscriptionActive {
    status: 'active';
    plan: SubscriptionPlan;
    renewalDate: string;
}

type SubscriptionResponse = SubscriptionInactive | SubscriptionActive;

// Price ID mapping for better maintainability
const PRICE_ID_TO_PLAN: Record<string, SubscriptionPlan> = {
    'price_pro': SubscriptionPlan.Pro,
    'price_premium': SubscriptionPlan.Premium,
    // Add more price mappings as needed
};

function getPlanName(priceId: string | null | undefined): SubscriptionPlan {
    if (!priceId) return SubscriptionPlan.Free;

    // Look up plan in mapping first
    for (const [key, plan] of Object.entries(PRICE_ID_TO_PLAN)) {
        if (priceId.includes(key)) return plan;
    }

    // Fallback to basic checks
    if (priceId.includes('pro')) return SubscriptionPlan.Pro;
    if (priceId.includes('premium')) return SubscriptionPlan.Premium;

    return SubscriptionPlan.Custom;
}

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

        return NextResponse.json({
            status: 'active',
            plan: getPlanName(user.stripePriceId),
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