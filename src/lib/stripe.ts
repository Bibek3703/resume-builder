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