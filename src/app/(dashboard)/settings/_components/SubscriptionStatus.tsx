"use client";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";

interface SubscriptionData {
    status: string;
    plan: string;
    renewalDate: string;
}

function SubscriptionStatus() {
    const { user } = useUser();
    const [loading, setLoading] = useState(true);
    const [subscription, setSubscription] = useState<SubscriptionData | null>(
        null,
    );

    useEffect(() => {
        const fetchSubscription = async () => {
            try {
                const res = await fetch("/api/subscription");
                const data = await res.json();
                setSubscription(data);
            } catch (error) {
                console.error("Subscription fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubscription();
    }, []);

    if (loading) return <SettingsSkeleton />;
    return (
        <Card className="p-6 rounded-xl shadow-2xl shadow-gray-500/50 w-full border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-4">
                Subscription Status
            </h2>
            <div className="space-y-2">
                <p>
                    Plan:{" "}
                    <span className="font-medium">
                        {subscription?.plan || "Free Tier"}
                    </span>
                </p>
                {subscription?.renewalDate && (
                    <p>
                        Renewal Date:{" "}
                        {format(new Date(subscription.renewalDate), "PPP")}
                    </p>
                )}
                <p>
                    Status:{" "}
                    <span
                        className={`px-2 py-1 rounded ${
                            subscription?.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                        }`}
                    >
                        {subscription?.status?.toUpperCase() || "INACTIVE"}
                    </span>
                </p>
            </div>
        </Card>
    );
}

export default SubscriptionStatus;

function SettingsSkeleton() {
    return (
        <div className="max-w-4xl mx-auto py-8 space-y-6">
            <Skeleton className="h-10 w-1/3 mb-8" />
            <div className="space-y-4">
                <Skeleton className="h-24 w-full" />
            </div>
        </div>
    );
}
