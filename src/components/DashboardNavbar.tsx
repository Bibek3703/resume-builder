"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardNavbar() {
    const pathname = usePathname();
    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <span className="text-xl font-bold text-blue-600">
                            ResumeCraft
                        </span>
                    </Link>

                    {/* Navigation Items */}
                    <div className="hidden sm:flex gap-6 items-center">
                        <Link
                            href="/dashboard/resumes"
                            className={`transition-colors ${
                                pathname.startsWith("/dashboard/resumes")
                                    ? "text-blue-600 font-semibold"
                                    : "text-gray-700 hover:text-blue-600"
                            }`}
                        >
                            My Resumes
                        </Link>
                        <Link
                            href="/dashboard/templates"
                            className={`transition-colors ${
                                pathname.startsWith("/dashboard/templates")
                                    ? "text-blue-600 font-semibold"
                                    : "text-gray-700 hover:text-blue-600"
                            }`}
                        >
                            Templates
                        </Link>
                    </div>

                    {/* User Account Menu */}
                    <div className="flex items-center gap-4">
                        <UserButton
                            afterSignOutUrl="/sign-in"
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: "w-9 h-9",
                                    userButtonPopoverCard:
                                        "shadow-lg rounded-lg",
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}
