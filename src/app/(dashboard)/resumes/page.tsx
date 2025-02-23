import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function Resume() {
    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <div className="w-full flex items-center justify-between">
                <h1 className="text-blue-500 text-2xl">Resumes</h1>
                <Button>
                    <Link href="/resumes/new">
                        Create New
                    </Link>
                </Button>
            </div>
        </div>
    );
}

export default Resume;
