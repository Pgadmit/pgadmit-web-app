"use client";

import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "./dashboard-header";
import { ProgressTimeline } from "./progress-timeline";
import { NextStepCard } from "./next-step-card";
import { DynamicSections } from "./dynamic-sections";
import { QuickActions } from "./quick-actions";

export function DashboardContent() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setIsRedirecting(true);
      router.push("/");
      return;
    }
  }, [loading, user, router]);

  if (loading || isRedirecting) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} />

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Mobile Quick Actions - Visible without scrolling */}
        <div className="md:hidden mb-6">
          <QuickActions user={user} />
        </div>

        {/* Progress Timeline */}
        <div className="mb-8">
          <ProgressTimeline user={user} />
        </div>

        {/* Next Step Card */}
        <div className="mb-8">
          <NextStepCard user={user} />
        </div>

        {/* Dynamic Sections */}
        <DynamicSections user={user} />
      </main>
    </div>
  );
}
