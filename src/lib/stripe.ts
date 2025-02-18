import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // apiVersion: '2023-10-16',
    typescript: true,
});

export const createPortalLink = async (customerId: string) => {
    const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
    });
    return session.url;
};

export async function updateSubscription(
    customerId: string,
    newPriceId: string
) {
    const subscription = await stripe.subscriptions.list({
        customer: customerId,
        limit: 1
    });

    if (subscription.data.length === 0) {
        throw new Error('No active subscription');
    }

    return await stripe.subscriptions.update(subscription.data[0].id, {
        items: [{
            id: subscription.data[0].items.data[0].id,
            price: newPriceId,
        }],
        proration_behavior: 'create_prorations'
    });
}

export async function getActiveSubscription(customerId: string) {
    const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: 'active',
        limit: 1
    });

    return subscriptions.data[0];
}

export async function createSubscriptionSession(
    clerkUserId: string,
    customerId: string,
    priceId: string,
    currentSubscriptionId?: string
) {
    return stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [{ price: priceId, quantity: 1 }],
        mode: 'subscription',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing`,
        subscription_data: {
            metadata: {
                clerkUserId,
                previous_subscription: currentSubscriptionId || '',
                priceId,
            }
        }
    });
}