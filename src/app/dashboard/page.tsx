import { OnboardingCheck } from "@/components/dashboard/onboarding-check";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export default function DashboardPage() {
  return (
    <OnboardingCheck>
      <DashboardContent />
    </OnboardingCheck>
  );
}
