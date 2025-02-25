"use client";

import React from "react";
import { useResume } from "@/contexts/resume-context";

function ResumePreview() {
    const { form } = useResume();

    const formValues = form.watch();

    return (
        <div className="w-full h-full min-h-max bg-secondary rounded-xl overflow-hidden">
        </div>
    );
}

export default ResumePreview;
