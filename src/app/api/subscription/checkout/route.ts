import { users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { createSubscriptionSession, getActiveSubscription } from '@/lib/stripe';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    try {
        const { priceId } = await req.json();

        const user = await db.select({
            stripeCustomerId: users.stripeCustomerId
        })
        .from(users)
        .where(eq(users.id, userId))
        .then(rows => rows[0]);

        const subscription = await getActiveSubscription(user.stripeCustomerId!);
        

        if (!user?.stripeCustomerId) {
            return new NextResponse("Customer not found", { status: 400 });
        }

        const session = await createSubscriptionSession(
            user.stripeCustomerId!,
            priceId,
            subscription?.id
        );

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('[CHECKOUT_ERROR]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}