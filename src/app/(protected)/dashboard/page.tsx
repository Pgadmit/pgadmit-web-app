"use client";

import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { MobileDashboardLayout } from "@/features/dashboard/ui";
import { ProtectedRoute } from "@/features/auth";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect } from "react";

export default function DashboardPage() {
    const isMobile = useIsMobile();
    console.log(isMobile);
    return (
        <ProtectedRoute>
            {isMobile ? <MobileDashboardLayout /> : <DashboardContent />}
        </ProtectedRoute>
    );
}
