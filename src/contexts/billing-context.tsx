"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface BillingContextType {
    data: BillingData | null;
    loading: boolean;
}

const BillingContext = createContext<BillingContextType>({
    data: null,
    loading: false,
});

export interface BillingData {
    subscription: {
        status: string;
        plan: string;
        renewalDate: string;
    };
    invoices: Array<{
        id: string;
        amount: number;
        currency: string;
        status: string;
        pdfUrl: string;
        date: string;
    }>;
}

export default function BillingProvider(
    { children }: { children: React.ReactNode },
) {
    const [data, setData] = useState<BillingData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/billing");
                const json = await res.json();
                setData(json);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        <BillingContext.Provider value={{ data, loading }}>
            {children}
        </BillingContext.Provider>
    );
}

export const useBilling = () => useContext(BillingContext);
