import { users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    try {
        const fetchedUsers: { stripeSubscriptionId: string | null, stripePriceId: string | null, stripeCurrentPeriodEnd : Date | null}[] = await db.select({
            stripeSubscriptionId: users.stripeSubscriptionId,
            stripePriceId: users.stripePriceId,
            stripeCurrentPeriodEnd: users.stripeCurrentPeriodEnd
        }).from(users).where(eq(users.id, userId));

        if (!fetchedUsers || fetchedUsers.length === 0){
            return NextResponse.json({ status: 'inactive' });
        }

        const user = fetchedUsers[0]

        if (!user?.stripeSubscriptionId || !user?.stripePriceId) {
            return NextResponse.json({ status: 'inactive' });
        }

        return NextResponse.json({
            status: 'active',
            plan: getPlanName(user?.stripePriceId),
            renewalDate: user.stripeCurrentPeriodEnd?.toISOString()
        });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

function getPlanName(priceId?: string) {
    if (!priceId) return 'Free';
    // Add your Stripe price ID mappings
    if (priceId.includes('pro')) return 'Pro Plan';
    if (priceId.includes('premium')) return 'Premium Plan';
    return 'Custom Plan';
}