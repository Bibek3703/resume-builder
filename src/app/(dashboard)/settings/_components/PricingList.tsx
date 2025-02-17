"use client";

import { SubscriptionCards } from "@/components/SubscriptionCards";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

function PricingList() {
    const [value, setValue] = useState("month");
    return (
        <div className="flex flex-col border border-black/[0.2] group/canvas-card items-center dark:border-white/[0.2] w-full max-w-4xl mx-auto py-4 relative">
            <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
            <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
            <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
            <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

            <Header value={value} onValueChange={setValue} />
            <SubscriptionCards frequency={value} />
            <div className="relative mt-28 mb-12 flex flex-col md:flex-row items-center w-full bg-gray-50">
                <div className="absolute top-0 md:-left-7 w-full md:w-[106.5%] border-t border-dashed border-black/20" />
                <div className="absolute top-0 md:-top-5 md:left-5 h-full md:h-[118%] md:border-l border-dashed border-black/20" />
                <div className="absolute bottom-0 md:-left-7 w-full md:w-[106.5%] border-t border-dashed border-black/20" />
                <div className="absolute top-0 md:-top-5 md:right-5 h-full md:h-[118%] md:border-l border-dashed border-black/20" />

                <div className="p-10 md:pl-20 w-full md:max-w-lg flex flex-col gap-6 items-start">
                    <h1>
                        Buy for your team of 10 people and get pro upgrade
                        absolutely free.
                    </h1>
                    <div className="flex gap-4">
                        <Button>Buy now</Button>
                        <Button variant="outline">
                            Talk to us <MessageCircle />
                        </Button>
                    </div>
                </div>
                <div className="flex-1 p-10 w-auto border-none md:border-l md:border-dashed md:border-black/20 flex flex-col justify-center">
                    <p>
                        "This is the best product ever when it comes to
                        shipping. Ten on ten recommended. I just can't wait to
                        see what happens with this product."
                    </p>
                    <p className="font-bold mt-4">Echo AI</p>
                    <span>Side projects builder</span>
                </div>
            </div>
        </div>
    );
}

export default PricingList;

export const Header = (
    { onValueChange = () => {}, value = "" }: {
        value: string;
        onValueChange: (value: string) => void;
    },
) => {
    return (
        <div className="w-full flex flex-col items-center gap-2 p-6 py-12 border-b border-black/[0.2]">
            <h1 className="text-3xl font-bold">
                Choose the plan that suits your needs
            </h1>
            <p className="text-md">
                Pick a plan that suits your needs and get started instantly.
            </p>
            <RadioGroup
                defaultValue="comfortable"
                value={value}
                onValueChange={onValueChange}
                className="flex items-center gap-0 mt-4"
            >
                <RadioGroupItem
                    value="month"
                    id="month"
                    className={cn(
                        "w-20 h-8 border-none rounded-none rounded-s-full text-sm",
                        value === "month"
                            ? "bg-primary text-primary-foreground"
                            : "bg-gray-500 text-primary-foreground",
                    )}
                >
                    Month
                </RadioGroupItem>

                <RadioGroupItem
                    value="year"
                    id="year"
                    className={cn(
                        "w-20 h-8 border-none rounded-none rounded-e-full text-sm",
                        value === "year"
                            ? "bg-primary text-primary-foreground"
                            : "bg-gray-500 text-primary-foreground",
                    )}
                >
                    Year
                </RadioGroupItem>
            </RadioGroup>
        </div>
    );
};

export const Icon = ({ className, ...rest }: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={className}
            {...rest}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m6-6H6"
            />
        </svg>
    );
};
