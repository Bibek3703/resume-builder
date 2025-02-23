import { exampleResumeData } from "@/app/data/resume-example";
import ResumeForm from "@/components/resume/ResumeForm";
import ResumePreview from "@/components/resume/ResumePreview";

export default function ResumePage() {
    return (
        <div className="flex p-4 px-8 w-full md:gap-6 lg:gap-8">
            <div className="w-full max-w-lg">
                <ResumeForm />
            </div>
            <div className="flex-1 sticky top-20 w-full max-h-[85vh] z-10">
                <ResumePreview data={exampleResumeData} />
            </div>
        </div>
    );
}
