import { users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { createPortalLink } from '@/lib/stripe';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

interface BillingPortalResponse {
    url: string;
}

export async function POST(): Promise<NextResponse<BillingPortalResponse | { error: string }>> {
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
                stripeCustomerId: users.stripeCustomerId
            })
            .from(users)
            .where(eq(users.id, userId))
            .then(rows => rows[0]);

        if (!user?.stripeCustomerId) {
            return NextResponse.json(
                { error: 'No active subscription found' },
                { status: 400 }
            );
        }

        const portalUrl = await createPortalLink(user.stripeCustomerId);

        return NextResponse.json({ url: portalUrl });
    } catch (error) {
        console.error('[BILLING_PORTAL_ERROR]', error instanceof Error ? error.message : 'Unknown error');

        return NextResponse.json(
            { error: 'Failed to create billing portal link' },
            { status: 500 }
        );
    }
}