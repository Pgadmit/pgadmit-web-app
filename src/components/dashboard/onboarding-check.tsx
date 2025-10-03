"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { DashboardLoading } from "./dashboard-loading";
import { DashboardContent } from "./dashboard-content";

interface OnboardingCheckProps {
    children?: React.ReactNode;
}

export function OnboardingCheck({ children }: OnboardingCheckProps) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            setIsRedirecting(true);
            router.push("/auth");
            return;
        }
    }, [loading, user, router]);

    if (loading || isRedirecting) {
        return <DashboardLoading />;
    }

    return children || <DashboardContent />;
}
