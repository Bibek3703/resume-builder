"use client";

import React from "react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalTrigger,
} from "../ui/animated-modal";
import { MessageSquareMore } from "lucide-react";
import { HoverEffect } from "../ui/card-hover-effect";

export type AISuggestion = {
    title: string;
    description: string;
    link?: string;
};

function ResumeAISuggestion(
    { items }: { items: AISuggestion[] },
) {
    return (
        <Modal>
            <ModalTrigger>
                <MessageSquareMore className="animate-pulse text-blue-500" />
            </ModalTrigger>
            <ModalBody className="md:max-w-4xl">
                <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center p-6">
                    AI tips{" "}
                    <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                        for resume
                    </span>
                </h4>
                <ModalContent className="overflow-y-auto md:p-4">
                    <HoverEffect items={items} className="py-0" />
                </ModalContent>
            </ModalBody>
        </Modal>
    );
}

export default ResumeAISuggestion;
