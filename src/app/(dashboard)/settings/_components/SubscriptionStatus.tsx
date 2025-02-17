"use client";
import { Button } from "@/components/ui/button";
import { useBilling } from "@/contexts/billing-context";
import { format } from "date-fns";

function SubscriptionStatus() {
    const { loading, data } = useBilling();

    const handlePortal = async () => {
        try {
            const res = await fetch("/api/billing/portal", { method: "POST" });
            const { url } = await res.json();
            window.location.href = url;
        } catch (error) {
            console.error(error);
        } finally {
            // setLoading(false);
        }
    };

    if (loading) return <div>Loading subscription status...</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Current Plan</h2>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <p className="text-lg font-semibold">
                        {data?.subscription.plan || "Free Tier"}
                    </p>
                    {data?.subscription.renewalDate && (
                        <p className="text-sm text-gray-600">
                            Next billing date: {format(
                                new Date(data.subscription.renewalDate),
                                "PPP",
                            )}
                        </p>
                    )}
                </div>
                <Button
                    onClick={() => handlePortal()}
                    variant="outline"
                >
                    Manage Billing
                </Button>
            </div>
        </div>
    );
}

export default SubscriptionStatus;
