"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Target } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useOnboardingData } from "@/hooks/use-onboarding-data";

export function WelcomeSection() {
  const router = useRouter();
  const { user } = useAuth();
  const { onboardingData } = useOnboardingData(user?.id ?? null);

  const handleAIChat = () => {
    router.push("/ai-chat");
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg md:rounded-xl p-4 md:p-6 mb-6 md:mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="mb-4 lg:mb-0">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'Student'}!
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-4">
            Continue your journey to studying abroad. You have 3 upcoming
            deadlines this week.
          </p>

          <div className="flex flex-wrap gap-2">
            {!user?.onboardingComplete && (
              <Badge variant="outline" className="bg-white text-xs">
                <Target className="w-3 h-3 mr-1" />
                Complete Profile Setup
              </Badge>
            )}
            {onboardingData?.country && (
              <Badge variant="outline" className="bg-white text-xs">
                🌍 {onboardingData.country}
              </Badge>
            )}
            {onboardingData?.field_of_study && (
              <Badge variant="outline" className="bg-white text-xs">
                🎓 {onboardingData.field_of_study}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
          <Button
            onClick={handleAIChat}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm h-9 md:h-10"
          >
            Ask AI Assistant
          </Button>
          <Button variant="outline" className="text-sm h-9 md:h-10">
            <Calendar className="w-4 h-4 mr-2" />
            View Calendar
          </Button>
        </div>
      </div>
    </div>
  );
}
