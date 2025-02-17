import { stripe } from "../stripe";

export async function getPlanName(productId?: string) {
    if (!productId) return 'Free';
    const product = await stripe.products.retrieve(productId, {
        expand: ['price'],
    });
    // console.log({price})
    // if (productId.includes('basic')) return 'Basic';
    // if (productId.includes('pro')) return 'Pro';
    // if (productId.includes('premium')) return 'Premium';
    return product.name;
}