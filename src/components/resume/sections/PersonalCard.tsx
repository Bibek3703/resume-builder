import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useResume } from "@/contexts/resume-context";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";

function PersonalCard() {
    const { form, handleAIHelp, isLoading } = useResume();

    const handleOnAIHelp = async () => {
        const isValid = await form.trigger([
            "title",
            "content.personalInfo.fullName",
            "content.personalInfo.email",
            "content.personalInfo.phone",
            "content.personalInfo.location.city",
            "content.personalInfo.location.country",
        ]);
        if (!isValid) {
            return;
        }
        const title = form.getValues("title");
        const content = JSON.stringify(form.getValues("content.personalInfo"));
        const prompt =
            `Generate professional summary section for '${title}' resume based on: Resume title and personal information: ${content}`;
        await handleAIHelp(prompt);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-2">
                <FormField
                    control={form.control}
                    name="content.personalInfo.fullName"
                    render={({ field }) => (
                        <FormItem className="w-full gap-2">
                            <FormLabel
                                htmlFor="fullName"
                                className="text-gray-300"
                            >
                                Full Name
                            </FormLabel>

                            <FormControl>
                                <Input
                                    id="fullname"
                                    placeholder="Your fullname"
                                    className="bg-secondary border-gray-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 duration-300"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="space-y-2">
                <FormField
                    control={form.control}
                    name="content.personalInfo.email"
                    render={({ field }) => (
                        <FormItem className="w-full gap-2">
                            <FormLabel
                                htmlFor="email"
                                className="text-gray-300"
                            >
                                Email
                            </FormLabel>

                            <FormControl>
                                <Input
                                    id="fullname"
                                    placeholder="Your email address"
                                    className="bg-secondary border-gray-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 duration-300"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="space-y-2">
                <FormField
                    control={form.control}
                    name="content.personalInfo.phone"
                    render={({ field }) => (
                        <FormItem className="w-full gap-2">
                            <FormLabel
                                htmlFor="phone"
                                className="text-gray-300"
                            >
                                Phone
                            </FormLabel>

                            <FormControl>
                                <Input
                                    id="phone"
                                    placeholder="Your phone number"
                                    className="bg-secondary border-gray-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 duration-300"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="space-y-2">
                <FormField
                    control={form.control}
                    name="content.personalInfo.location.city"
                    render={({ field }) => (
                        <FormItem className="w-full gap-2">
                            <FormLabel
                                htmlFor="city"
                                className="text-gray-300"
                            >
                                City
                            </FormLabel>

                            <FormControl>
                                <Input
                                    id="city"
                                    placeholder="City name"
                                    className="bg-secondary border-gray-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 duration-300"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="space-y-2">
                <FormField
                    control={form.control}
                    name="content.personalInfo.location.state"
                    render={({ field }) => (
                        <FormItem className="w-full gap-2">
                            <FormLabel
                                htmlFor="state"
                                className="text-gray-300"
                            >
                                State
                            </FormLabel>

                            <FormControl>
                                <Input
                                    id="state"
                                    placeholder="State name"
                                    className="bg-secondary border-gray-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 duration-300"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="space-y-2">
                <FormField
                    control={form.control}
                    name="content.personalInfo.location.country"
                    render={({ field }) => (
                        <FormItem className="w-full gap-2">
                            <FormLabel
                                htmlFor="country"
                                className="text-gray-300"
                            >
                                Country
                            </FormLabel>

                            <FormControl>
                                <Input
                                    id="country"
                                    placeholder="Country name"
                                    className="bg-secondary border-gray-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 duration-300"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="space-y-2">
                <FormField
                    control={form.control}
                    name="content.personalInfo.location.postalCode"
                    render={({ field }) => (
                        <FormItem className="w-full gap-2">
                            <FormLabel
                                htmlFor="state"
                                className="text-gray-300"
                            >
                                Postal Code
                            </FormLabel>

                            <FormControl>
                                <Input
                                    id="postalCode"
                                    placeholder="Postal code"
                                    className="bg-secondary border-gray-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 duration-300"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="space-y-2 md:col-span-2">
                <FormField
                    control={form.control}
                    name="content.personalInfo.summary"
                    render={({ field }) => (
                        <FormItem className="w-full gap-2">
                            <FormLabel
                                htmlFor="summary"
                                className="flex items-center justify-between text-gray-300"
                            >
                                <span>Summary</span>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="animate-pulse hover:animate-none"
                                    onClick={handleOnAIHelp}
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? <Loader2 className="animate-spin" />
                                        : (
                                            <Image
                                                src="/images/text.png"
                                                width={24}
                                                height={24}
                                                alt="AI Assistant"
                                                className="invert"
                                            />
                                        )}
                                </Button>
                            </FormLabel>

                            <FormControl>
                                <Textarea
                                    id="summary"
                                    placeholder="Your summary"
                                    className="bg-secondary border-gray-700 text-gray-100 min-h-[100px] focus-visible:ring-blue-500 duration-300"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}

export default PersonalCard;
