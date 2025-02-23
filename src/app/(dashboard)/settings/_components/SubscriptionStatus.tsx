"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useBilling } from "@/contexts/billing-context";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Calendar, CreditCard, Zap } from "lucide-react";
import Link from "next/link";
import { MouseEvent, useState } from "react";

function SubscriptionStatus() {
    const { loading, data } = useBilling();
    const [isHovered, setIsHovered] = useState(false);

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

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const element = document.querySelector("#pricing-list");
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    if (loading) return <div>Loading subscription status...</div>;

    return (
        <Card className="w-full bg-gradient-to-br from-gray-900 to-gray-800 border-gray-600 overflow-hidden text-white shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
            <CardContent className="p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl font-bold mb-6 text-blue-400 flex items-center">
                        <Zap className="w-6 h-6 mr-2 text-yellow-400" />
                        Current Plan
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <motion.div
                                className="text-lg font-semibold bg-blue-600 rounded-full px-4 py-2 flex items-center"
                                whileHover={{ scale: 1.05 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 10,
                                }}
                            >
                                <Zap className="w-5 h-5 mr-2" />
                                {data?.subscription.plan || "Free Tier"}
                            </motion.div>
                        </div>
                        {data?.subscription.renewalDate && (
                            <div className="flex items-center text-sm text-gray-300">
                                <Calendar className="w-4 h-4 mr-2" />
                                Next billing date: {format(
                                    new Date(data.subscription.renewalDate),
                                    "PPP",
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </CardContent>
            <CardFooter className="bg-gray-800 p-4">
                <motion.div
                    className="w-auto mr-auto"
                    whileHover={{ scale: 1.02 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                >
                    <Button
                        onClick={handlePortal}
                        variant="outline"
                        className="w-full bg-transparent border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
                    >
                        <CreditCard
                            className={`w-4 h-4 mr-2 ${
                                isHovered ? "animate-pulse" : ""
                            }`}
                        />
                        Manage Billing
                    </Button>
                </motion.div>
                <motion.div
                    className="w-auto ml-auto"
                    whileHover={{ scale: 1.02 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                >
                    <Link
                        href="#pricing-list"
                        onClick={handleClick}
                        className="flex items-center gap-2 w-full bg-transparent border h-10 rounded-md px-4 text-sm border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
                    >
                        <CreditCard
                            className={`w-4 h-4 mr-2 ${
                                isHovered ? "animate-pulse" : ""
                            }`}
                        />
                        Change Plan
                    </Link>
                </motion.div>
            </CardFooter>
        </Card>
    );
}

export default SubscriptionStatus;
