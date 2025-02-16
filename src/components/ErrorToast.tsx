"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function ErrorToast() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    // useEffect(() => {
    //     const handleError = (err: any) => {
    //         setError(err?.message || "Navigation failed");
    //         setTimeout(() => setError(null), 5000);
    //     };

    //     router.events.on("routeChangeError", handleError);
    //     return () => router.events.off("routeChangeError", handleError);
    // }, [router.events]);

    if (!error) return null;

    return toast.error(error);
}
