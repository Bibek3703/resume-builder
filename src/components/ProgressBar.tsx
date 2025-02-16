"use client";

import NextTopLoader from "nextjs-toploader";

export function ProgressBar() {
    return (
        <NextTopLoader
            color="#2563eb"
            height={2}
            // showOnShallow={true}
        />
    );
}
