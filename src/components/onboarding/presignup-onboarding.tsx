"use client";

import { useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useOverflowLock } from "@/hooks/use-overflow-lock";
import { createOnboardingSteps } from "@/lib/onboarding/steps";
import {
  useOnboardingData,
  useOnboardingUI,
} from "@/lib/stores/onboarding-store";
import { inferSegment } from "@/lib/onboarding/logic";

interface PreSignupOnboardingProps {
  onComplete: (finalData: any) => void;
}

export function PreSignupOnboarding({ onComplete }: PreSignupOnboardingProps) {
  const {
    data,
    currentStep: step,
    budgetSlider,
    isCompleted,
    updateData,
    setCurrentStep,
    setBudgetSlider,
    setCompleted,
    getFinalData,
  } = useOnboardingData();

  const { isOpen, setOpen } = useOnboardingUI();

  // Use custom hook for overflow lock
  useOverflowLock(isOpen);

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
    const isLastStep = step === total - 1;

    if (isLastStep && !isCompleted) {
      const segment = inferSegment(data);
      updateData({ segment });
      setCompleted(true);

      setTimeout(() => {
        setOpen(false);
        onComplete(getFinalData());
      }, 100);
    }
  }, [step, total, data, updateData, setCompleted, isCompleted, setOpen, onComplete, getFinalData]);

  const handleNext = () => {
    if (step < total - 1) {
      setCurrentStep(step + 1);
    }
    // Completion is handled automatically by useEffect when reaching last step
  };

  const handleBack = () => {
    if (step > 0) setCurrentStep(step - 1);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!isOpen || !currentStepData) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-x-hidden">
      <Card className="w-full max-w-2xl h-[75vh] sm:h-[70vh] flex flex-col overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
        <CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-6 flex-shrink-0">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-primary">
              AI-Powered Onboarding
            </span>
          </div>
          <CardTitle className="text-xl sm:text-3xl font-bold mb-2">
            {currentStepData.title}
          </CardTitle>
          <p className="text-sm sm:text-lg text-muted-foreground">
            {currentStepData.description}
          </p>

          <div className="mt-4 sm:mt-6 space-y-2">
            <Progress value={progress} className="h-2 sm:h-3" />
            <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
              <span>
                Step {step + 1} of {total}
              </span>
              <span>{Math.round(progress)}% complete</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col px-4 sm:px-6 overflow-hidden">
          <div className="flex-1 overflow-y-auto overflow-x-hidden flex items-center justify-center">
            <div className="animate-in slide-in-from-right-4 duration-300 py-4 w-full">
              {currentStepData.content}
            </div>
          </div>

          <div className="flex-shrink-0 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 pt-4 sm:pt-6 border-t mt-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 0}
              className="h-9 sm:h-11 px-4 sm:px-6 w-full sm:w-auto order-2 sm:order-1"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Back
            </Button>

            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto order-1 sm:order-2">
              <Button
                variant="ghost"
                onClick={handleClose}
                className="h-9 sm:h-11 px-4 sm:px-6 flex-1 sm:flex-none"
              >
                Close
              </Button>
              <Button
                onClick={handleNext}
                disabled={!steps[step]?.canContinue()}
                className="bg-primary hover:bg-primary/90 h-9 sm:h-11 px-4 sm:px-8 text-sm sm:text-base font-semibold flex-1 sm:flex-none"
              >
                {step === total - 1 ? (
                  <>
                    Start with PGadmit
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// business logic moved to @/lib/onboarding/*
