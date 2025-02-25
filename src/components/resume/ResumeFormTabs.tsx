"use client";

import { Tabs } from "../ui/tabs";
import PersonalCard from "./sections/PersonalCard";
import { useResume } from "@/contexts/resume-context";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import ExperienceCard from "./sections/ExperienceCard";
import Educationcard from "./sections/EducationCard";
import SkillItem from "./sections/SkillItem";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, PlusCircle } from "lucide-react";
import { Input } from "../ui/input";
import SocialLinks from "./sections/SocialLinks";
import { useState } from "react";

export default function ResumeFormTabs() {
    const { form } = useResume();
    const [activeIndex, setActiveIndex] = useState(0);

    const tabs = [
        {
            title: "Resume Header",
            value: "header",
            content: (
                <div className="flex flex-col w-full overflow-hidden relative h-full rounded-2xl p-3 md:p-6 bg-gradient-to-br from-purple-700 to-violet-900">
                    <p className="text-xl md:text-4xl font-bold text-white mb-3">
                        Resume Header
                    </p>
                    <HeaderContent />
                </div>
            ),
        },
        {
            title: "Personal",
            value: "personal",
            content: (
                <div className="flex flex-col w-full relative h-full rounded-2xl p-3 md:p-6 bg-gradient-to-br from-purple-700 to-violet-900">
                    <p className="text-xl md:text-4xl font-bold text-white mb-3">
                        Personal Information
                    </p>
                    <ScrollArea className="flex-grow max-h-full bg-background border border-gray-600 rounded-xl">
                        <div className="p-4">
                            <PersonalCard />
                        </div>
                    </ScrollArea>
                </div>
            ),
        },
        {
            title: "Experience",
            value: "experience",
            content: (
                <div className="flex flex-col w-full relative h-full rounded-2xl p-3 md:p-6 bg-gradient-to-br from-purple-700 to-violet-900">
                    <p className="text-xl md:text-4xl font-bold text-white mb-3">
                        Experience
                    </p>
                    <ExperienceContent />
                </div>
            ),
        },
        {
            title: "Education",
            value: "education",
            content: (
                <div className="flex flex-col w-full relative h-full rounded-2xl p-10 bg-gradient-to-br from-purple-700 to-violet-900">
                    <p className="text-xl md:text-4xl font-bold text-white mb-3">
                        Education
                    </p>
                    <EducationContent />
                </div>
            ),
        },
        {
            title: "Skills",
            value: "skills",
            content: (
                <div className="flex flex-col w-full relative h-full rounded-2xl p-10 bg-gradient-to-br from-purple-700 to-violet-900">
                    <p className="text-xl md:text-4xl font-bold text-white mb-3">
                        Skills
                    </p>
                    <SkillContent />
                </div>
            ),
        },
        {
            title: "Projects",
            value: "projects",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
                    <p>Projects</p>
                </div>
            ),
        },
        {
            title: "Awards",
            value: "awards",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
                    <p>Awards</p>
                </div>
            ),
        },
    ];

    return (
        <div className="h-[100vh] md:h-[85vh] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start">
            <div className="flex items-center justify-center gap-6 w-full py-1">
                <Button
                    size="icon"
                    className="rounded-full w-8 h-8 p-0"
                    disabled={activeIndex === 0}
                    onClick={() => {
                        setActiveIndex((prevIndex) =>
                            prevIndex > 0 ? prevIndex - 1 : prevIndex
                        );
                    }}
                >
                    <ArrowLeft />
                </Button>
                <Button
                    size="icon"
                    className="rounded-full w-8 h-8 p-0"
                    disabled={activeIndex === tabs.length - 1}
                    onClick={() => {
                        setActiveIndex((prevIndex) =>
                            prevIndex < tabs.length - 1
                                ? prevIndex + 1
                                : prevIndex
                        );
                    }}
                >
                    <ArrowRight className="w-6 h-6" />
                </Button>
            </div>
            <Form {...form}>
                <Tabs
                    tabs={tabs}
                    contentClassName="mt-20"
                    containerClassName="lg:justify-center"
                    showTabNavs={false}
                    activeIndex={activeIndex}
                />
            </Form>
        </div>
    );
}

const HeaderContent = () => {
    const { form } = useResume();
    return (
        <div className="flex-grow max-h-full bg-background border border-gray-600 rounded-xl p-4">
            <div className="flex flex-col gap-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="w-full max-w-md gap-2">
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
                <div className="flex flex-col gap-2 mt-3">
                    <h3 className="text-lg font-semibold text-blue-400 border-b mb-3">
                        Links
                    </h3>
                    <SocialLinks />
                </div>
            </div>
        </div>
    );
};

const ExperienceContent = () => {
    const {
        experienceFields,
        appendExperience,
    } = useResume();
    return (
        <ScrollArea className="flex-grow max-h-full bg-background border border-gray-600 rounded-xl">
            <div className="flex flex-col gap-3 p-4">
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
                    className="bg-blue-600 hover:bg-blue-700 w-auto mr-auto"
                >
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
                </Button>
            </div>
        </ScrollArea>
    );
};

const EducationContent = () => {
    const {
        educationFields,
        appendEducation,
    } = useResume();
    return (
        <ScrollArea className="flex-grow max-h-full bg-background border border-gray-600 rounded-xl">
            <div className="flex flex-col gap-3 p-4">
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
                    className="bg-blue-600 hover:bg-blue-700 w-auto mr-auto"
                >
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Education
                </Button>
            </div>
        </ScrollArea>
    );
};

const SkillContent = () => {
    const { skillFields, appendSkill } = useResume();
    return (
        <ScrollArea className="flex-grow max-h-full bg-background border border-gray-600 rounded-xl">
            <div className="flex flex-col gap-3 p-4">
                <div className="flex flex-wrap gap-2">
                    {skillFields.map((_, index) => (
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
                    className="bg-blue-600 hover:bg-blue-700 w-auto mr-auto"
                >
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
                </Button>
            </div>
        </ScrollArea>
    );
};
