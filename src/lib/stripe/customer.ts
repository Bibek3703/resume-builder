import { db } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { users } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import Stripe from 'stripe';

interface CustomerCreationParams {
    userId: string;
    email: string;
}

/**
 * Gets an existing Stripe customer or creates a new one.
 * @throws {Error} If database operations or Stripe API calls fail
 */
export async function getOrCreateCustomer({ userId, email }: CustomerCreationParams): Promise<string> {
    try {
        // First attempt to fetch existing user
        const existingUser = await db
            .select({ stripeCustomerId: users.stripeCustomerId })
            .from(users)
            .where(eq(users.id, userId))
            .then(rows => rows[0]);

        // If we have a customer ID, verify it exists in Stripe
        if (existingUser?.stripeCustomerId) {
            try {
                // Verify the customer still exists in Stripe
                await stripe.customers.retrieve(existingUser.stripeCustomerId);
                return existingUser.stripeCustomerId;
            } catch (stripeError) {
                // If customer doesn't exist in Stripe, we'll create a new one
                if ((stripeError as Stripe.errors.StripeError).code === 'resource_missing') {
                    console.warn(`Stripe customer ${existingUser.stripeCustomerId} not found, creating new customer`);
                } else {
                    throw stripeError;
                }
            }
        }

        // Create new Stripe customer
        const customer = await stripe.customers.create({
            email,
            metadata: {
                userId,
                createdAt: new Date().toISOString()
            }
        });

        // Update database with new customer ID
        await db
            .update(users)
            .set({
                stripeCustomerId: customer.id,
                updatedAt: new Date()
            })
            .where(eq(users.id, userId));

        return customer.id;
    } catch (error) {
        console.error(
            '[STRIPE_CUSTOMER_ERROR]',
            error instanceof Error ? error.message : 'Unknown error',
            { userId, email }
        );
        throw new Error(
            'Failed to get or create Stripe customer',
            { cause: error }
        );
    }
}

/**
 * Validates that the input email is properly formatted.
 * @throws {Error} If email is invalid
 */
function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
    }
    return true;
}