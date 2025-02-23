import { UserProfile } from "@clerk/nextjs";
import { Metadata } from "next";
import SubscriptionBilling from "../_components/SubscriptionBilling";
import Profile from "../_components/Profile";

export const metadata: Metadata = {
    title: "Account Settings - ResumeCraft",
};

export default function Settings() {
    return (
        <div className="flex flex-col max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
            <div className="mb-12 w-full">
                <SubscriptionBilling />
            </div>
            <Profile />
        </div>
    );
}
