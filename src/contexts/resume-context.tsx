"use client";

import { resumeDefaultValues } from "@/app/data/values";
import { GeneratedType, useAIGenerative } from "@/hooks/use-aiGenerative";
import { ResumeFormData, resumeSchema } from "@/types/content";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext } from "react";
import {
    FieldArrayWithId,
    useFieldArray,
    UseFieldArrayAppend,
    UseFieldArrayRemove,
    useForm,
    UseFormReturn,
} from "react-hook-form";

interface ResumeContextType {
    form: UseFormReturn<ResumeFormData>;
    onSubmit: (data: ResumeFormData) => Promise<void>;
    handleAIHelp: (prompt: string) => Promise<void>;
    experienceFields: FieldArrayWithId<ResumeFormData, "content.experience">[];
    appendExperience: UseFieldArrayAppend<ResumeFormData, "content.experience">;
    removeExperience: UseFieldArrayRemove;
    educationFields: FieldArrayWithId<ResumeFormData, "content.education">[];
    appendEducation: UseFieldArrayAppend<ResumeFormData, "content.education">;
    removeEducation: UseFieldArrayRemove;
    skillFields: FieldArrayWithId<ResumeFormData, "content.skills">[];
    appendSkill: UseFieldArrayAppend<ResumeFormData, "content.skills">;
    removeSkill: UseFieldArrayRemove;
    isLoading: boolean;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export default function ResumeProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const form = useForm<ResumeFormData>({
        resolver: zodResolver(resumeSchema),
        defaultValues: resumeDefaultValues,
        mode: "onChange",
    });
    const { isLoading, generateSection } = useAIGenerative();

    const {
        fields: experienceFields,
        append: appendExperience,
        remove: removeExperience,
    } = useFieldArray({ control: form.control, name: "content.experience" });

    const {
        fields: educationFields,
        append: appendEducation,
        remove: removeEducation,
    } = useFieldArray({ control: form.control, name: "content.education" });

    const { fields: skillFields, append: appendSkill, remove: removeSkill } =
        useFieldArray({ control: form.control, name: "content.skills" });

    const onSubmit = async (data: ResumeFormData) => {
        try {
            const response = await fetch("/api/resumes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                router.push("/resumes");
            } else {
                console.error("Failed to create resume");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const handleAIHelp = async (prompt: string) => {
        const generated = await generateSection(prompt) as GeneratedType;
        if (generated?.content) {
            const contents = JSON.parse(generated.content);
            form.setValue("content.personalInfo.summary", contents.summary);
        }
    };

    return (
        <ResumeContext.Provider
            value={{
                form,
                onSubmit,
                handleAIHelp,
                experienceFields,
                appendExperience,
                removeExperience,
                educationFields,
                appendEducation,
                removeEducation,
                skillFields,
                appendSkill,
                removeSkill,
                isLoading,
            }}
        >
            {children}
        </ResumeContext.Provider>
    );
}

export const useResume = () => {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error("useResume must be used within a ResumeProvider");
    }
    return context;
};
