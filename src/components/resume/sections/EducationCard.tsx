import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useResume } from "@/contexts/resume-context";
import { X } from "lucide-react";
import React from "react";

function Educationcard({
    index = 0,
}: {
    index: number;
}) {
    const { form, removeEducation } = useResume();
    return (
        <Card className="bg-secondary border-gray-600">
            <CardHeader className="relative pb-0">
                <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeEducation(index)}
                    className="absolute top-2 right-2 z-10 rounded-full"
                >
                    <X />
                </Button>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name={`content.education.${index}.school`}
                        render={({ field }) => (
                            <FormItem className="w-full gap-2">
                                <FormLabel
                                    htmlFor={`school-${index}`}
                                    className="text-gray-300"
                                >
                                    School
                                </FormLabel>

                                <FormControl>
                                    <Input
                                        id={`school-${index}`}
                                        placeholder="School name"
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
                        name={`content.education.${index}.degree`}
                        render={({ field }) => (
                            <FormItem className="w-full gap-2">
                                <FormLabel
                                    htmlFor={`degree-${index}`}
                                    className="text-gray-300"
                                >
                                    Degree
                                </FormLabel>

                                <FormControl>
                                    <Input
                                        id={`degree-${index}`}
                                        placeholder="Degree name"
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
                        name={`content.education.${index}.field`}
                        render={({ field }) => (
                            <FormItem className="w-full gap-2">
                                <FormLabel
                                    htmlFor={`field-${index}`}
                                    className="text-gray-300"
                                >
                                    Field of Study
                                </FormLabel>

                                <FormControl>
                                    <Input
                                        id={`field-${index}`}
                                        placeholder="Field name"
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
                        name={`content.education.${index}.graduationDate`}
                        render={({ field }) => (
                            <FormItem className="w-full gap-2">
                                <FormLabel
                                    htmlFor={`graduationDate-${index}`}
                                    className="text-gray-300"
                                >
                                    Graduation Date
                                </FormLabel>

                                <FormControl>
                                    <Input
                                        id={`graduationDate-${index}`}
                                        type="date"
                                        placeholder="Graduation Date"
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
                        name={`content.education.${index}.location`}
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
                                        placeholder="School location"
                                        className="bg-secondary border-gray-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 duration-300"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </CardContent>
        </Card>
    );
}

export default Educationcard;
