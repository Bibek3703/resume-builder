"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { CreditCard, Zap } from "lucide-react";
import Link from "next/link";

function SubscriptionBilling() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="p-6 rounded-xl shadow-2xl bg-secondary border-gray-600 overflow-hidden relative">
                <motion.div
                    className="absolute inset-0 bg-blue-500/10"
                    animate={{
                        background: isHovered
                            ? [
                                "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, rgba(17, 24, 39, 0) 50%)",
                                "radial-gradient(circle at 60% 60%, rgba(59, 130, 246, 0.1) 0%, rgba(17, 24, 39, 0) 50%)",
                                "radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.1) 0%, rgba(17, 24, 39, 0) 50%)",
                                "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, rgba(17, 24, 39, 0) 50%)",
                            ]
                            : "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0) 0%, rgba(17, 24, 39, 0) 50%)",
                    }}
                    transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                    }}
                />
                <div className="relative z-10">
                    <h2 className="text-xl font-semibold mb-4 text-blue-400 flex items-center">
                        <Zap className="w-6 h-6 mr-2 text-yellow-400" />
                        Billing & Subscriptions
                    </h2>
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                    >
                        <Button
                            asChild
                            className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
                        >
                            <Link
                                href="/settings/billing"
                                className="flex items-center"
                            >
                                <CreditCard className="w-4 h-4 mr-2" />
                                Manage Subscriptions
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </Card>
        </motion.div>
    );
}

export default SubscriptionBilling;
