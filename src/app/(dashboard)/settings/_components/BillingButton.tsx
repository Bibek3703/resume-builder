"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

function BillingButton() {
    const [loading, setLoading] = useState(false);

    const handlePortal = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/billing/portal", { method: "POST" });
            const { url } = await res.json();
            window.location.href = url;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Button
            onClick={handlePortal}
            disabled={loading}
            variant="outline"
        >
            {loading ? "Loading..." : "Manage Billing"}
        </Button>
    );
}

export default BillingButton;
