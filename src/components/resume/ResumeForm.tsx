"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ExperienceCard from "./sections/ExperienceCard";
import Educationcard from "./sections/EducationCard";
import PersonalCard from "./sections/PersonalCard";
import {
    Briefcase,
    GraduationCap,
    Lightbulb,
    Loader2Icon,
    PlusCircle,
} from "lucide-react";
import SkillItem from "./sections/SkillItem";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { useResume } from "@/contexts/resume-context";

export default function ResumeForm() {
    const {
        form,
        onSubmit,
        experienceFields,
        appendExperience,
        educationFields,
        appendEducation,
        skillFields,
        appendSkill,
        isLoading,
    } = useResume();

    if (!form) return null;

    return (
        <div className="w-full">
            <div className="flex items-center justify-between border-b border-gray-700 pb-3">
                <h3 className="text-2xl font-bold text-blue-400">
                    Create New Resume
                </h3>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-8 mt-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="w-full gap-2">
                                    <FormLabel
                                        htmlFor="title"
                                        className="text-lg font-semibold text-blue-400"
                                    >
                                        Resume Title
                                    </FormLabel>

                                    <FormControl>
                                        <Input
                                            placeholder="Your resume title"
                                            id="title"
                                            className="bg-secondary border-gray-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 duration-300"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-blue-400 flex items-center">
                                <span className="bg-blue-800 rounded-full p-2 mr-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </span>
                                Personal Information
                            </h3>
                            <PersonalCard />
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold flex items-center">
                                <Briefcase className="mr-2" />
                                Experience
                            </h3>
                            {experienceFields.map((_, index) => (
                                <ExperienceCard
                                    key={index}
                                    index={index}
                                />
                            ))}
                            <Button
                                type="button"
                                onClick={() =>
                                    appendExperience({
                                        company: "",
                                        position: "",
                                        location: "",
                                        startDate: "",
                                        endDate: "",
                                        current: false,
                                        description: "",
                                    })}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                <PlusCircle className="mr-2 h-4 w-4" />{" "}
                                Add Experience
                            </Button>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-blue-400 flex items-center">
                                <GraduationCap className="mr-2 text-blue-500" />
                                Education
                            </h3>
                            {educationFields.map((_, index) => (
                                <Educationcard
                                    key={index}
                                    index={index}
                                />
                            ))}
                            <Button
                                type="button"
                                onClick={() =>
                                    appendEducation({
                                        school: "",
                                        degree: "",
                                        field: "",
                                        graduationDate: "",
                                        location: "",
                                    })}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                <PlusCircle className="mr-2 h-4 w-4" />{" "}
                                Add Education
                            </Button>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-blue-400 flex items-center">
                                <Lightbulb className="mr-2 text-blue-500" />
                                Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skillFields.map((skill, index) => (
                                    <SkillItem
                                        key={index}
                                        index={index}
                                    />
                                ))}
                            </div>
                            <Button
                                type="button"
                                onClick={() =>
                                    appendSkill({
                                        name: "",
                                        level: "Beginner",
                                    })}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                <PlusCircle className="mr-2 h-4 w-4" />{" "}
                                Add Skill
                            </Button>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4 border-t border-gray-700 mt-6 pt-6">
                        <Button
                            type="button"
                            variant="outline"
                            className="bg-gray-700 text-gray-100 border-gray-600 hover:bg-gray-600"
                            onClick={() => form.reset()}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700"
                            disabled={form.formState.isSubmitting ||
                                isLoading}
                        >
                            {(form.formState.isSubmitting || isLoading) && (
                                <Loader2Icon className="animate-spin" />
                            )}
                            Create Resume
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
