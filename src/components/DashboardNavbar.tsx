"use client";

import type React from "react";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Layout, Menu, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { motion } from "framer-motion";
import Image from "next/image";

export function DashboardNavbar({
    userData,
}: {
    userData?: { fullName?: string; email?: string } | null;
}) {
    const { user } = useUser();
    const pathname = usePathname();

    const displayName = userData?.fullName || user?.fullName;
    const displayEmail = userData?.email ||
        user?.primaryEmailAddress?.emailAddress;

    const Logo = () => (
        <Link href="/dashboard" className="flex items-center gap-2">
            <Image
                src="/images/ResumeCraftLogo.png"
                width={50}
                height={50}
                alt="ResumeCraft"
            />
            <motion.span
                className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                ResumeCraft
            </motion.span>
        </Link>
    );

    const NavItems = () => (
        <>
            <NavLink
                href="/resumes"
                icon={<FileText className="w-4 h-4 mr-2" />}
            >
                My Resumes
            </NavLink>
            <NavLink
                href="/templates"
                icon={<Layout className="w-4 h-4 mr-2" />}
            >
                Templates
            </NavLink>
            <NavLink
                href="/settings"
                icon={<Settings className="w-4 h-4 mr-2" />}
            >
                Settings
            </NavLink>
        </>
    );

    const NavLink = (
        { href, children, icon }: {
            href: string;
            children: React.ReactNode;
            icon: React.ReactNode;
        },
    ) => {
        const isActive = pathname.startsWith(href);
        return (
            <Link
                href={href}
                className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
                    isActive
                        ? "bg-blue-600 text-white font-semibold"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
            >
                {icon}
                {children}
            </Link>
        );
    };

    return (
        <nav className="sticky top-0 bg-background border-b border-gray-800 text-white shadow-lg z-50 py-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="w-full flex items-center">
                        <div className="flex-shrink-0">
                            <Logo />
                        </div>
                        <div className="flex-1 hidden md:block ml-10 w-full">
                            <div className="flex justify-center items-baseline space-x-4">
                                <NavItems />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="hidden md:block mr-4">
                            {displayName && (
                                <motion.p
                                    className="text-sm font-medium"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    {displayName}
                                </motion.p>
                            )}
                            {displayEmail && (
                                <motion.p
                                    className="text-xs text-gray-400"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    {displayEmail}
                                </motion.p>
                            )}
                        </div>
                        <UserButton
                            afterSignOutUrl="/sign-in"
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: "w-9 h-9",
                                    userButtonPopoverCard:
                                        "bg-gray-800 border border-gray-700 shadow-lg rounded-lg",
                                    cardBox: "border border-gray-600",
                                },
                            }}
                        />
                    </div>

                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 p-0 text-gray-300 hover:bg-gray-700"
                                >
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="w-64 bg-gray-800 text-white border-l border-gray-700"
                            >
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
                </div>
            </div>
        </nav>
    );
}

export default DashboardNavbar;
