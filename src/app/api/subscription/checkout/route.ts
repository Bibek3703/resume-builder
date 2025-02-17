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
        const { priceId } = await req.json();
        const user = await db.select({
                        stripeCustomerId: users.stripeCustomerId
                    })
                    .from(users)
                    .where(eq(users.id, userId))
                    .then(rows => rows[0]);
        

        if (!user?.stripeCustomerId) {
            return new NextResponse("Customer not found", { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            customer: user.stripeCustomerId,
            payment_method_types: ['card'],
            line_items: [{
                price: priceId,
                quantity: 1,
            }],
            mode: 'subscription',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
            subscription_data: {
                metadata: {
                    userId: userId
                }
            }
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('[CHECKOUT_ERROR]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}