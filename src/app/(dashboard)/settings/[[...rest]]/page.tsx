import { UserProfile } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Account Settings - ResumeCraft",
};

export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
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
