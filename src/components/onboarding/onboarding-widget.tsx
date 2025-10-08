'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { createOnboardingSteps } from '@/lib/onboarding/steps';
import { useOnboardingData } from '@/lib/stores/onboarding-store';
import { inferSegment } from '@/lib/onboarding/logic';

interface OnboardingWidgetProps {
  onComplete?: () => void;
}

export function OnboardingWidget({ onComplete }: OnboardingWidgetProps) {
  const router = useRouter();
  const {
    data,
    currentStep: step,
    budgetSlider,
    updateData,
    setCurrentStep,
    setBudgetSlider,
    setCompleted,
    syncWithSupabase,
  } = useOnboardingData();

  const steps = useMemo(
    () =>
      createOnboardingSteps({
        data,
        setData: updates => {
          updateData(typeof updates === 'function' ? updates(data) : updates);
        },
        setStep: newStep => {
          setCurrentStep(
            typeof newStep === 'function' ? newStep(step) : newStep
          );
        },
        budgetSlider,
        setBudgetSlider: value => {
          setBudgetSlider(
            typeof value === 'function' ? value(budgetSlider) : value
          );
        },
        currentStep: step,
      }),
    [data, budgetSlider, step, updateData, setCurrentStep, setBudgetSlider]
  );

  const total = steps.length;
  const progress = ((step + 1) / total) * 100;
  const currentStepData = steps[step];
  const canContinue = currentStepData?.canContinue() ?? false;
  const isLastStep = step === total - 1;

  const handleNext = async () => {
    if (!canContinue) return;

    if (!isLastStep) {
      setCurrentStep(step + 1);
      return;
    }

    // Complete onboarding
    const segment = inferSegment(data);
    updateData({ segment });
    setCompleted(true);

    // Sync with Supabase
    try {
      await syncWithSupabase();
    } catch (error) {
      console.error('Failed to sync onboarding:', error);
    }

    // Navigate or callback
    if (onComplete) {
      onComplete();
    } else {
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 0) setCurrentStep(step - 1);
  };

  if (!currentStepData) return null;

  return (
    <div className='min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex flex-col'>
      {/* Header */}
      <div className='flex-shrink-0 px-4 pt-4 sm:pt-6'>
        <div className='max-w-4xl mx-auto'>
          <Button
            variant='ghost'
            onClick={() => router.push('/')}
            className='mb-4 text-muted-foreground hover:text-foreground'
          >
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Home
          </Button>

          <div className='text-center'>
            <div className='inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4'>
              <Sparkles className='h-4 w-4' />
              AI-Powered Onboarding
            </div>

            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-foreground'>
              {currentStepData.title}
            </h1>
            <p className='text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto'>
              {currentStepData.description}
            </p>

            <div className='mt-4 sm:mt-6 space-y-2 max-w-md mx-auto'>
              <Progress value={progress} className='h-2 sm:h-3' />
              <div className='flex justify-between text-xs sm:text-sm text-muted-foreground'>
                <span>
                  Step {step + 1} of {total}
                </span>
                <span>{Math.round(progress)}% complete</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex items-center justify-center px-4 py-6 sm:py-8'>
        <div className='w-full max-w-4xl mx-auto'>
          <div className='animate-in slide-in-from-right-4 duration-300'>
            {currentStepData.content}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className='flex-shrink-0 px-4 pb-4 sm:pb-6'>
        <div className='max-w-4xl mx-auto'>
          <div className='flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4'>
            <Button
              variant='outline'
              onClick={handleBack}
              disabled={step === 0}
              className='h-11 sm:h-12 px-6 sm:px-8 w-full sm:w-auto order-2 sm:order-1'
            >
              <ArrowLeft className='h-4 w-4 mr-2' />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canContinue}
              className='h-11 sm:h-12 px-8 sm:px-10 w-full sm:w-auto order-1 sm:order-2'
            >
              {isLastStep ? (
                <>
                  Start with PGadmit
                  <ArrowRight className='h-4 w-4 ml-2' />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className='h-4 w-4 ml-2' />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
