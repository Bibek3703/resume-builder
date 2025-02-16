import { Card } from "@/components/ui/card";
import { UserProfile } from "@clerk/nextjs";
import { Metadata } from "next";
import SubscriptionStatus from "../_components/SubscriptionStatus";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Account Settings - ResumeCraft",
};

export default function Settings() {
    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
            <div className="mb-12 pr-4 w-full">
                <SubscriptionStatus />
            </div>
            <div className="mb-12 pr-4 w-full">
                <Card className="p-6 rounded-xl shadow-2xl shadow-gray-500/50 w-full border-t border-gray-200">
                    <h2 className="text-xl font-semibold mb-4">
                        Billing & Subscriptions
                    </h2>
                    <Button asChild>
                        <Link href="/settings/billing">
                            Manage Subscriptions
                        </Link>
                    </Button>
                </Card>
            </div>

            <UserProfile
                path="/settings"
                routing="path"
                appearance={{
                    elements: {
                        rootBox: "w-full",
                        card: "shadow-none w-full",
                        navbar: "hidden",
                        profileSection__username: "hidden",
                        profileSection__danger:
                            "border-t border-gray-200 mt-6 pt-6",
                    },
                }}
            />
        </div>
    );
}
