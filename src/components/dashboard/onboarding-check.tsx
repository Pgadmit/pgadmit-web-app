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
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/auth");
                return;
            }

            const hasBasicProfile = user.onboardingComplete;

            if (!hasBasicProfile) {
                router.push("/onboarding");
                return;
            }

            setIsChecking(false);
        }
    }, [user, loading, router]);

    if (loading || isChecking) {
        return <DashboardLoading />;
    }

    return children || <DashboardContent />;
}
