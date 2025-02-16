import {  users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { createPortalLink } from '@/lib/stripe';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST() {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    try {
        const fetchedUsers: { stripeCustomerId: string | null }[] = await db.select({ stripeCustomerId: users.stripeCustomerId }).from(users).where(eq(users.id, userId));
        
        if (!fetchedUsers || fetchedUsers.length === 0) {
            return new NextResponse("No subscription found", { status: 400 });
        }

        const user = fetchedUsers[0]

        if (!user?.stripeCustomerId) {
            return new NextResponse("No subscription found", { status: 400 });
        }

        const portalUrl = await createPortalLink(user.stripeCustomerId);
        return NextResponse.json({ url: portalUrl });
    } catch (error) {
        console.error('[BILLING_PORTAL_ERROR]', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}