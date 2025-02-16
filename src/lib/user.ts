import { currentUser } from '@clerk/nextjs/server';

export async function getNavbarUserData() {
    const user = await currentUser();
    if (!user) return null;

    return {
        fullName: `${user.firstName} ${user.lastName}`.trim(),
        email: user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)?.emailAddress
    };
}