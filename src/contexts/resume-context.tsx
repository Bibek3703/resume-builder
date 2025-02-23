"use client";

import { exampleResumeData } from "@/app/data/resume-example";
import { Resume } from "@/types/content";
import { createContext, useContext, useEffect, useState } from "react";

interface ResumeContextType {
    data: Resume | null;
}

const ResumeContext = createContext<ResumeContextType>({
    data: null,
});

export default function ResumeProvider(
    { children }: { children: React.ReactNode },
) {
    const [data, setData] = useState<Resume | null>(null);

    useEffect(() => {
        setData(exampleResumeData);
    }, []);

    return (
        <ResumeContext.Provider
            value={{
                data,
            }}
        >
            {children}
        </ResumeContext.Provider>
    );
}

export const useResume = () => useContext(ResumeContext);
