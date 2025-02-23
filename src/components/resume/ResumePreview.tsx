"use client";

import React from "react";
import { Resume } from "@/types/content";
import ResumePDF from "./ResumePDF";

function ResumePreview({
    data,
}: {
    data: Resume;
}) {
    if (!data) return null;

    return (
        <div className="w-full h-full max-h-full bg-secondary rounded-xl overflow-hidden">
            <ResumePDF data={data} />
        </div>
    );
}

export default ResumePreview;
