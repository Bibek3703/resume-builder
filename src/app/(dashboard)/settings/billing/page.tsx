"use client";

import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import PricingList from "../_components/PricingList";
import { useBilling } from "@/contexts/billing-context";
import SubscriptionStatus from "../_components/SubscriptionStatus";

export default function BillingPage() {
    const { data, loading } = useBilling();

    if (loading) return <BillingSkeleton />;

    return (
        <div className="max-w-4xl mx-auto py-8 space-y-8">
            {/* Current Subscription Section */}
            <section className="bg-white p-6 rounded-lg shadow">
                <SubscriptionStatus />
            </section>

            {/* Billing History Section */}
            <section className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-6">Billing History</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4">Date</th>
                                <th className="text-left py-3 px-4">Amount</th>
                                <th className="text-left py-3 px-4">Status</th>
                                <th className="text-left py-3 px-4">Invoice</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.invoices.map((invoice) => (
                                <tr key={invoice.id} className="border-b">
                                    <td className="py-3 px-4">
                                        {format(
                                            new Date(invoice.date),
                                            "MMM dd, yyyy",
                                        )}
                                    </td>
                                    <td className="py-3 px-4">
                                        {(invoice.amount / 100).toLocaleString(
                                            "en-US",
                                            {
                                                style: "currency",
                                                currency: invoice.currency,
                                            },
                                        )}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-2 py-1 rounded text-sm ${
                                                invoice.status === "paid"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {invoice.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <a
                                            href={invoice.pdfUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            View PDF
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Upgrade Section */}
            <PricingList />
        </div>
    );
}

function BillingSkeleton() {
    return (
        <div className="max-w-4xl mx-auto py-8 space-y-8">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-96 w-full" />
        </div>
    );
}
