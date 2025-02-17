import { users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    try {
        const { newPriceId } = await req.json();
        const user = await db.select({
            stripeCustomerId: users.stripeCustomerId,
            stripeSubscriptionId: users.stripeSubscriptionId
        }).from(users)
        .where(eq(users.id, userId))
        .then(rows => rows[0]);

        if (!user?.stripeCustomerId) {
            return new NextResponse("Customer not found", { status: 400 });
        }

        await stripe.subscriptions.update(
            user.stripeSubscriptionId!,
            {
                items: [{
                    price: newPriceId,
                }]
            }
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[SUBSCRIPTION_UPDATE_ERROR]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}