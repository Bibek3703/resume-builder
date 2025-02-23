import { ResumeForm } from "@/components/resume/ResumeForm";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

export default async function ResumePage(
    { params }: { params: { id: string } },
) {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    const resume = null;

    //   const resume = await db.query.resumes.findFirst({
    //     where: (resumes, { eq, and }) => and(
    //       eq(resumes.id, params.id),
    //       eq(resumes.userId, userId)
    //     ),
    //   });

    if (!resume) notFound();

    return (
        <div className="max-w-6xl mx-auto p-4">
            <ResumeForm initialData={resume} />
        </div>
    );
}
