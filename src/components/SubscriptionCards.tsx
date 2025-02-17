"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CardSpotlight } from "./ui/card-spotlight";
import { CheckIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBilling } from "@/contexts/billing-context";

const PLANS = [
    {
        productId: "prod_RmlbgN79GrwQfj",
        name: "Free",
        currency: "EUR",
        prices: {
            month: {
                priceId: "price_1QtC3t08FJZCNFhyfUY0058r",
                price: "0.00",
            },
            year: {
                priceId: "price_1QtC4f08FJZCNFhysgMUqGVI",
                price: "0.00",
            },
        } as PriceObject,
        features: [
            { title: "Single resume template", included: true },
            { title: "Basic text editor", included: true },
            { title: "PDF export", included: true },
            { title: "Save up to 1 resume", included: true },
            {
                title: "Basic sections (education, experience, skills)",
                included: true,
            },
            { title: "Email support", included: false },
            { title: "Custom sections", included: false },
            { title: "AI content suggestions", included: false },
            { title: "Multiple templates", included: false },
            { title: "ATS optimization", included: false },
        ],
    },
    {
        productId: "prod_RmlerP7girJIz0",
        name: "Pro",
        currency: "EUR",
        prices: {
            month: {
                priceId: "price_1QtC7R08FJZCNFhyf03t2Ykl",
                price: "2.99",
            },
            year: {
                priceId: "price_1QtCCV08FJZCNFhy8Yw7EXic",
                price: "20.00",
            },
        } as PriceObject,
        features: [
            { title: "Single resume template", included: true },
            { title: "Basic text editor", included: true },
            { title: "PDF export", included: true },
            { title: "Save up to 5 resumes", included: true },
            {
                title: "Basic sections (education, experience, skills)",
                included: true,
            },
            { title: "Email support", included: true },
            { title: "Custom sections", included: true },
            { title: "AI content suggestions", included: true },
            { title: "Multiple templates", included: false },
            { title: "ATS optimization", included: false },
        ],
    },
    {
        productId: "prod_RmljX1d9OzBkjW",
        name: "Premium",
        currency: "EUR",
        prices: {
            month: {
                priceId: "price_1QtCC508FJZCNFhykxg8S6vv",
                price: "4.99",
            },
            year: {
                priceId: "price_1QtCD308FJZCNFhy3T75oCjM",
                price: "45.00",
            },
        } as PriceObject,
        features: [
            { title: "Single resume template", included: true },
            { title: "Basic text editor", included: true },
            { title: "PDF export", included: true },
            { title: "Unlimited resumes", included: true },
            {
                title: "Basic sections (education, experience, skills)",
                included: true,
            },
            { title: "Priority email support", included: true },
            { title: "Custom sections", included: true },
            { title: "Advanced AI content suggestions", included: true },
            { title: "Multiple templates", included: true },
            { title: "ATS optimization", included: true },
        ],
    },
];

type MapObject = {
    [key: string]: string;
};

type PriceObject = {
    [key: string]: MapObject;
};

const currencySymbols = {
    "EUR": "€",
    "USD": "$",
} as MapObject;

const frequencyIds = {
    month: "mo",
    year: "yr",
} as MapObject;

export function SubscriptionCards(
    { frequency = "month" }: { frequency?: string },
) {
    const [loading, setLoading] = useState<string | null>(null);
    const { data } = useBilling();

    const handleSubscribe = async (priceId: string) => {
        setLoading(priceId);
        try {
            const res = await fetch("/api/subscription/checkout", {
                method: "POST",
                body: JSON.stringify({ priceId }),
            });
            const { url } = await res.json();
            window.location.href = url;
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 w-full border-t">
            {PLANS.map((plan, idx) => (
                <CardSpotlight
                    key={plan.prices[frequency].priceId}
                    color={"#fff"}
                    className={cn(
                        "flex flex-col col-span-1 p-6 rounded-none border-none",
                        idx === 1
                            ? "bg-white text-black shadow-2xl shadow-gray-500 drop-shadow-xl"
                            : "bg-gray-200 text-gray-700",
                    )}
                >
                    <h3 className="text-xl font-bold mb-4 z-20">
                        {plan.name}
                    </h3>
                    <p className="text-3xl font-bold relative z-20 mt-2">
                        {currencySymbols[plan.currency]}
                        {plan.prices[frequency].price} /{" "}
                        {frequencyIds[frequency]}
                    </p>
                    <div className="flex-grow mt-4 relative z-20">
                        Features:
                        <ul className="list-none  mt-2">
                            {plan.features.map((feature) => (
                                <Step
                                    key={feature.title}
                                    title={feature.title}
                                    included={feature.included}
                                />
                            ))}
                        </ul>
                    </div>
                    <div className="mt-4 relative z-20">
                        <Button
                            onClick={() =>
                                handleSubscribe(plan.prices[frequency].priceId)}
                            disabled={!!loading ||
                                plan.name === data?.subscription.plan}
                            className="w-full bg-green-500"
                        >
                            {loading === plan.prices[frequency].priceId
                                ? "Processing..."
                                : "Subscribe"}
                        </Button>
                    </div>
                </CardSpotlight>
            ))}
        </div>
    );
}

const Step = (
    { title, included = false }: { title: string; included: boolean },
) => {
    return (
        <li className="flex gap-2 items-start">
            {included
                ? <CheckIcon className="text-green-500" />
                : <X className="text-destructive" />}
            <p className="flex-1 text-sm">{title}</p>
        </li>
    );
};
