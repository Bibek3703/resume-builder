import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { X } from "lucide-react";
import React from "react";

function ExperienceCard({
    index = 0,
}: {
    index: number;
}) {
    const { form, removeExperience } = useResume();
    return (
        <div className="relative w-full p-4 bg-secondary rounded-md">
            <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeExperience(index)}
                className="absolute top-2 right-2 z-10 rounded-full"
            >
                <X />
            </Button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name={`content.experience.${index}.company`}
                        render={({ field }) => (
                            <FormItem className="w-full gap-2">
                                <FormLabel
                                    htmlFor={`company-${index}`}
                                    className="text-gray-300"
                                >
                                    Company
                                </FormLabel>

                                <FormControl>
                                    <Input
                                        id={`company-${index}`}
                                        placeholder="Company name"
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
                        name={`content.experience.${index}.position`}
                        render={({ field }) => (
                            <FormItem className="w-full gap-2">
                                <FormLabel
                                    htmlFor={`position-${index}`}
                                    className="text-gray-300"
                                >
                                    Position
                                </FormLabel>

                                <FormControl>
                                    <Input
                                        id={`position-${index}`}
                                        placeholder="Your position"
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
                        name={`content.experience.${index}.location`}
                        render={({ field }) => (
                            <FormItem className="w-full gap-2">
                                <FormLabel
                                    htmlFor={`location-${index}`}
                                    className="text-gray-300"
                                >
                                    Location
                                </FormLabel>

                                <FormControl>
                                    <Input
                                        id={`location-${index}`}
                                        placeholder="Company location"
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
                        name={`content.experience.${index}.startDate`}
                        render={({ field }) => (
                            <FormItem className="w-full gap-2">
                                <FormLabel
                                    htmlFor={`startDate-${index}`}
                                    className="text-gray-300"
                                >
                                    Start Date
                                </FormLabel>

                                <FormControl>
                                    <Input
                                        id={`startDate-${index}`}
                                        type="date"
                                        placeholder="Start Date"
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
                        name={`content.experience.${index}.endDate`}
                        render={({ field }) => (
                            <FormItem className="w-full gap-2">
                                <FormLabel
                                    htmlFor={`endDate-${index}`}
                                    className="text-gray-300"
                                >
                                    End Date
                                </FormLabel>

                                <FormControl>
                                    <Input
                                        id={`endDate-${index}`}
                                        type="date"
                                        placeholder="End Date"
                                        className="bg-secondary border-gray-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 duration-300"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <FormField
                        control={form.control}
                        name={`content.experience.${index}.current`}
                        render={({ field }) => (
                            <FormItem className="w-full flex items-center gap-2">
                                <FormControl>
                                    <Checkbox
                                        id={`current-${index}`}
                                        checked={field.value}
                                        className="bg-gray-600 border-gray-500 mt-2"
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel
                                    htmlFor={`current-${index}`}
                                    className="text-gray-300"
                                >
                                    Current Position
                                </FormLabel>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <FormField
                        control={form.control}
                        name={`content.experience.${index}.description`}
                        render={({ field }) => (
                            <FormItem className="w-full gap-2">
                                <FormLabel
                                    htmlFor={`description-${index}`}
                                    className="text-gray-300"
                                >
                                    Description
                                </FormLabel>

                                <FormControl>
                                    <Textarea
                                        id={`description-${index}`}
                                        placeholder="Description"
                                        className="bg-secondary border-gray-500 text-gray-100 min-h-[100px] focus-visible:ring-blue-500 duration-300"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export default ExperienceCard;
