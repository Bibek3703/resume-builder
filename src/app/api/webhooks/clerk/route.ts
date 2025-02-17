import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import { stripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
    const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET || ""

    if (!SIGNING_SECRET) {
        throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Get headers
    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error: Missing Svix headers', {
            status: 400,
        })
    }

    // Get body
    const payloadString = await req.text()

    let evt: WebhookEvent;

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET)

    // Verify payload with headers
    try {
        evt = wh.verify(payloadString, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error: Could not verify webhook:', err)
        return NextResponse.json({ message: 'Error: Verification error' }, { status: 400 })
    }

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data
    const eventType = evt.type


    switch (eventType) {
        case "user.created": {
            if (id ) {
                console.log(`Create new user's profile with ID ${id}`)

                const clerkUser = evt.data;
                const name = `${clerkUser.first_name} ${clerkUser.last_name}`.trim();
                // Create Stripe customer
                const customer = await stripe.customers.create({
                    email: clerkUser.email_addresses[0].email_address,
                    name,
                    metadata: {
                        clerkUserId: clerkUser.id
                    }
                });

                // Add to user.created handler
                const subscription = await stripe.subscriptions.create({
                    customer: customer.id,
                    items: [{ price: process.env.STRIPE_BASIC_PRICE_ID }],
                    payment_behavior: 'default_incomplete',
                    expand: ['latest_invoice.payment_intent'],
                    metadata: {
                        clerkUserId: clerkUser.id
                    }
                });

              
                // Insert user into database with Stripe customer ID
                await db.insert(users)
                    .values({ 
                        id, 
                        email: clerkUser.email_addresses[0].email_address,
                        stripeCustomerId: customer.id, 
                        stripeSubscriptionId: subscription.id,
                        stripePriceId: process.env.STRIPE_BASIC_PRICE_ID,
                        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
                        createdAt: new Date(), 
                        updatedAt: new Date() 
                    })
                    .onConflictDoUpdate({ target: users.id, set: { 
                        email: clerkUser.email_addresses[0].email_address,
                        stripeCustomerId: customer.id,
                        stripeSubscriptionId: subscription.id,
                        stripePriceId: process.env.STRIPE_BASIC_PRICE_ID,
                        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
                        createdAt: new Date(),
                        updatedAt: new Date() 
                     } });
                break;
            }
        }
        case "user.deleted": {
            if (id) {

                const user = await db
                    .select()
                    .from(users)
                    .where(eq(users.id, id))
                    .then(rows => rows[0]);
                if (user && evt?.data) {
                    console.log(`Delete user's profile of user with ID ${id}`)
                    await db.delete(users).where(eq(users.id, id))
                }
                break;
            }
        }
        default:
            console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
            break;
    }
    // console.log('Webhook payload:', body)
    return NextResponse.json({ message: 'Webhook received' }, { status: 200 })
}