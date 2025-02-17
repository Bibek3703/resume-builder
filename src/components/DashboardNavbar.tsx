"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export function DashboardNavbar(
    { userData }: { userData?: { fullName?: string; email?: string } | null },
) {
    const { user } = useUser();
    const pathname = usePathname();

    // Fallback to client-side data if server-side props not available
    const displayName = userData?.fullName || user?.fullName;
    const displayEmail = userData?.email ||
        user?.primaryEmailAddress?.emailAddress;

    const Logo = () => (
        <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl font-bold text-blue-600">
                ResumeCraft
            </span>
        </Link>
    );

    const NavItems = () => (
        <>
            <Link
                href="/resumes"
                className={`transition-colors ${
                    pathname.startsWith("/resumes")
                        ? "text-blue-600 font-semibold"
                        : "text-gray-700 hover:text-blue-600"
                }`}
            >
                My Resumes
            </Link>
            <Link
                href="/templates"
                className={`transition-colors ${
                    pathname.startsWith("/templates")
                        ? "text-blue-600 font-semibold"
                        : "text-gray-700 hover:text-blue-600"
                }`}
            >
                Templates
            </Link>
            <Link
                href="/settings"
                className={`transition-colors ${
                    pathname.startsWith("/settings")
                        ? "text-blue-600 font-semibold"
                        : "text-gray-700 hover:text-blue-600"
                }`}
            >
                Settings
            </Link>
            <Link
                href="/account"
                className={`transition-colors ${
                    pathname.startsWith("/account")
                        ? "text-blue-600 font-semibold"
                        : "text-gray-700 hover:text-blue-600"
                }`}
            >
                Account
            </Link>
        </>
    );

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo - Hidden on mobile */}
                    <div className="hidden sm:block">
                        <Logo />
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden sm:flex gap-6 items-center">
                        <NavItems />
                    </div>

                    {/* Mobile Navigation */}
                    <div className="sm:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 p-0"
                                >
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-64">
                                <SheetHeader>
                                    <SheetTitle>
                                        <Logo />
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-4 mt-6">
                                    <NavItems />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* User Account Menu */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:block text-right">
                            {displayName && (
                                <p className="font-medium">{displayName}</p>
                            )}
                            {displayEmail && (
                                <p className="text-sm text-gray-600">
                                    {displayEmail}
                                </p>
                            )}
                        </div>
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

export default DashboardNavbar;
