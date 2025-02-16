import '@clerk/nextjs';

declare module '@clerk/nextjs' {
    interface UserButtonProps {
        appearance?: {
            elements?: {
                userButtonAvatarBox?: string;
                userButtonPopoverCard?: string;
            };
        };
    }
}