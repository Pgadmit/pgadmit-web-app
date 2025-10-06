"use client";

import { useEffect, useState } from "react";
import { useCurrentUser } from "@/entities/user";
import { useSessionLoading } from "@/entities/session";
import { useRouter } from "next/navigation";
import { DashboardLoading } from "./dashboard-loading";
import { DashboardContent } from "./dashboard-content";

interface OnboardingCheckProps {
    children?: React.ReactNode;
}

export function OnboardingCheck({ children }: OnboardingCheckProps) {
    const user = useCurrentUser();
    const loading = useSessionLoading();
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!loading && !user) {
                setIsRedirecting(true);
                router.push("/auth");
                return;
            }
        }, 200);

        return () => clearTimeout(timeoutId);
    }, [loading, user, router]);

    if (loading || isRedirecting) {
        return <DashboardLoading />;
    }

    return children || <DashboardContent />;
}
