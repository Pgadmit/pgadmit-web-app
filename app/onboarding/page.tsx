"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AIOnboardingFlow } from "@/components/onboarding/ai-onboarding-flow";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { createOnboardingSteps, OnboardingStep } from "@/lib/onboarding/steps";
import {
  useOnboardingData,
  useOnboardingUI,
} from "@/lib/stores/onboarding-store";
import { inferSegment } from "@/lib/onboarding/logic";

export default function OnboardingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { isOpen: preSignupOpen, setOpen: setPreSignupOpen } =
    useOnboardingUI();
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  const {
    data,
    currentStep: step,
    budgetSlider,
    updateData,
    setCurrentStep,
    setBudgetSlider,
    setCompleted,
    getFinalData,
  } = useOnboardingData();

  const steps = useMemo(
    () =>
      createOnboardingSteps({
        data,
        setData: (updates) => {
          if (typeof updates === "function") {
            updateData(updates(data));
          } else {
            updateData(updates);
          }
        },
        setStep: (newStep) => {
          if (typeof newStep === "function") {
            setCurrentStep(newStep(step));
          } else {
            setCurrentStep(newStep);
          }
        },
        budgetSlider,
        setBudgetSlider: (value) => {
          if (typeof value === "function") {
            setBudgetSlider(value(budgetSlider));
          } else {
            setBudgetSlider(value);
          }
        },
        currentStep: step,
      }),
    [data, budgetSlider, updateData, setCurrentStep, setBudgetSlider, step]
  );

  const total = steps.length;
  const progress = ((step + 1) / total) * 100;
  const currentStepData = steps[step];

  useEffect(() => {
    if (user) {
      if (!user.onboardingComplete) {
        setOnboardingOpen(true);
      } else {
        // User is already onboarded, redirect to dashboard
        router.push("/dashboard");
      }
    } else {
      // User not logged in → start pre-signup onboarding first
      setPreSignupOpen(true);
    }
  }, [user, router, setPreSignupOpen]);

  // Initialize onboarding store when component mounts
  useEffect(() => {
    setPreSignupOpen(true);
  }, [setPreSignupOpen]);

  const handleOnboardingComplete = () => {
    setOnboardingOpen(false);
    router.push("/dashboard");
  };

  const handlePreSignupComplete = (finalData: any) => {
    // Redirect to auth page with initial data
    const params = new URLSearchParams({
      country: finalData.country || "",
      fieldOfStudy: finalData.fieldOfStudy || "",
      budget: finalData.budget || "",
    });
    router.push(`/auth?${params.toString()}`);
  };

  const handleNext = () => {
    if (step < total - 1) {
      setCurrentStep(step + 1);
    } else {
      // Onboarding completed
      const segment = inferSegment(data);
      const finalData = { ...data, segment };
      updateData({ segment });
      setCompleted(true);
      setPreSignupOpen(false);
      handlePreSignupComplete(getFinalData());
    }
  };

  const handleBack = () => {
    if (step > 0) setCurrentStep(step - 1);
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  // Show AI onboarding for logged-in users
  if (user && onboardingOpen) {
    return (
      <AIOnboardingFlow
        isOpen={onboardingOpen}
        onClose={handleOnboardingComplete}
      />
    );
  }

  // Show pre-signup onboarding for non-logged-in users
  if (!user && preSignupOpen && currentStepData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex flex-col">
        {/* Header - Fixed at top */}
        <div className="flex-shrink-0 px-4 pt-4 sm:pt-6">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              onClick={handleBackToHome}
              className="mb-4 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Sparkles className="h-4 w-4" />
                AI-Powered Onboarding
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-foreground">
                {currentStepData.title}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                {currentStepData.description}
              </p>

              <div className="mt-4 sm:mt-6 space-y-2 max-w-md mx-auto">
                <Progress value={progress} className="h-2 sm:h-3" />
                <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                  <span>
                    Step {step + 1} of {total}
                  </span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Flexible center */}
        <div className="flex-1 flex items-center justify-center px-4 py-6 sm:py-8">
          <div className="w-full max-w-4xl mx-auto">
            <div className="animate-in slide-in-from-right-4 duration-300">
              {currentStepData.content}
            </div>
          </div>
        </div>

        {/* Navigation - Fixed at bottom */}
        <div className="flex-shrink-0 px-4 pb-4 sm:pb-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 0}
                className="h-11 sm:h-12 px-6 sm:px-8 w-full sm:w-auto order-2 sm:order-1 border-2 border-border hover:border-primary/50 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>

              <Button
                onClick={handleNext}
                disabled={!currentStepData?.canContinue()}
                className="bg-primary hover:bg-primary/90 h-11 sm:h-12 px-8 sm:px-10 text-sm sm:text-base font-semibold w-full sm:w-auto order-1 sm:order-2 shadow-lg"
              >
                {step === total - 1 ? (
                  <>
                    Start with PGadmit
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
