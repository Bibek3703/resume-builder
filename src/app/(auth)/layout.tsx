import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Resume Builder - Authentication",
    description: "Sign in or create an account",
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div>{children}</div>;
}
