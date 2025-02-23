"use client";

import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

const Providers = ({
    children,
}: { children: React.ReactNode }) => {
    const { theme } = useTheme();
    return (
        <ClerkProvider
            appearance={{
                baseTheme: theme === "dark" ? [dark] : [],
            }}
        >
            {children}
        </ClerkProvider>
    );
};

export default Providers;
