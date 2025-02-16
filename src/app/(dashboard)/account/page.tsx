import { Card } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Account Management - ResumeCraft",
};

export default function AccountPage() {
    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Account Management</h1>
            <div className="space-y-6">
                <Card className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        Billing & Subscriptions
                    </h2>
                    {/* Add Stripe billing portal integration here */}
                </Card>

                <Card className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Security</h2>
                    {/* Add security settings here */}
                </Card>
            </div>
        </div>
    );
}
