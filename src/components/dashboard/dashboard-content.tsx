"use client";

import { DashboardSidebar } from "./dashboard-sidebar";
import { WelcomeSection } from "./welcome-section";
import { StatsCards } from "./stats-cards";
import { ApplicationsSection } from "./applications-section";
import { DeadlinesSection } from "./deadlines-section";
import { ScholarshipsSection } from "./scholarships-section";
import { AIRecommendations } from "./ai-recommendations";
import { ProfileIncompleteBanner } from "./profile-incomplete-banner";
import { useOnboardingData } from "@/hooks/use-onboarding-data";

export function DashboardContent() {
  const { onboardingData, loading } = useOnboardingData();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />

      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <ProfileIncompleteBanner onboardingData={onboardingData} loading={loading} />
          <WelcomeSection />
          <StatsCards />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            <div className="space-y-4 md:space-y-6 lg:space-y-8">
              <ApplicationsSection />
              <DeadlinesSection />
            </div>

            <div className="space-y-4 md:space-y-6 lg:space-y-8">
              <ScholarshipsSection />
              <AIRecommendations />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
