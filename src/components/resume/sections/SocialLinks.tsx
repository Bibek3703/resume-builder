import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useResume } from "@/contexts/resume-context";
import React from "react";

function SocialLinks() {
    const { form } = useResume();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            <FormField
                control={form.control}
                name="content.personalInfo.socialLinks.linkedin.url"
                render={({ field }) => (
                    <FormItem className="w-full gap-2">
                        <FormLabel
                            htmlFor="linkedin"
                            className="text-sm text-white"
                        >
                            Linkedin
                        </FormLabel>

                        <FormControl>
                            <Input
                                placeholder="Linkedin url"
                                id="linkedin"
                                className="bg-secondary border-gray-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 duration-300"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="content.personalInfo.socialLinks.github.url"
                render={({ field }) => (
                    <FormItem className="w-full gap-2">
                        <FormLabel
                            htmlFor="github"
                            className="text-sm text-white"
                        >
                            Github
                        </FormLabel>

                        <FormControl>
                            <Input
                                placeholder="Github url"
                                id="github"
                                className="bg-secondary border-gray-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 duration-300"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="content.personalInfo.socialLinks.twitter.url"
                render={({ field }) => (
                    <FormItem className="w-full gap-2">
                        <FormLabel
                            htmlFor="twitter"
                            className="text-sm text-white"
                        >
                            Twitter
                        </FormLabel>

                        <FormControl>
                            <Input
                                placeholder="Twitter url"
                                id="twitter"
                                className="bg-secondary border-gray-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 duration-300"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="content.personalInfo.socialLinks.portfolio.url"
                render={({ field }) => (
                    <FormItem className="w-full gap-2">
                        <FormLabel
                            htmlFor="portfolio"
                            className="text-sm text-white"
                        >
                            Portfolio
                        </FormLabel>

                        <FormControl>
                            <Input
                                placeholder="Portfolio url"
                                id="portfolio"
                                className="bg-secondary border-gray-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 duration-300"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="content.personalInfo.socialLinks.other.url"
                render={({ field }) => (
                    <FormItem className="w-full gap-2">
                        <FormLabel
                            htmlFor="other"
                            className="text-sm text-white"
                        >
                            Other
                        </FormLabel>

                        <FormControl>
                            <Input
                                placeholder="Other url"
                                id="other"
                                className="bg-secondary border-gray-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 duration-300"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}

export default SocialLinks;
