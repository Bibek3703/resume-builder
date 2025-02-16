import { Card } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Account Management - ResumeCraft",
};

export default function AccountPage() {
    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Account Management</h1>
            <div className="space-y-12">
                <Card className="p-6 rounded-xl shadow-2xl shadow-gray-500/50 w-full border-t border-gray-200">
                    <h2 className="text-xl font-semibold mb-4">
                        Billing & Subscriptions
                    </h2>
                    {/* Add Stripe billing portal integration here */}
                </Card>

                <Card className="p-6 rounded-xl shadow-2xl shadow-gray-500/50 w-full border-t border-gray-200">
                    <h2 className="text-xl font-semibold mb-4">Security</h2>
                    {/* Add security settings here */}
                </Card>
            </div>
        </div>
    );
}
