'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
// --- MODIFIED: Changed BookOpen to GraduationCap for the new header icon ---
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap, // Icon for logo
  Facebook,
  Twitter,
  Instagram,
} from 'lucide-react';
import { createOnboardingSteps } from '@/lib/onboarding/steps';
import { useOnboardingData } from '@/lib/stores/onboarding-store';
import { inferSegment } from '@/lib/onboarding/logic';

// --- MODIFIED: The SiteHeader component is updated to match the Figma design ---
const SiteHeader = () => (
  <header className='w-full bg-gradient-to-r from-[#6a11cb] via-[#a742f5] to-[#8a2be2] py-4 px-4 sm:px-6 lg:px-8'>
    <div className='max-w-4xl mx-auto'>
      <nav className='flex items-center justify-between w-full bg-white rounded-full shadow-lg px-6 py-2'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2'>
          <GraduationCap className='h-6 w-6 text-[#6a11cb]' />
          <span className='text-xl font-bold text-gray-800'>PGadmit</span>
        </Link>
        {/* Auth Buttons */}
        <div className='flex items-center space-x-4'>
          <Button
            variant='link'
            className='text-red-500 font-semibold hover:text-red-600 px-0'
          >
            Log in
          </Button>
          <Button className='rounded-full bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white font-semibold px-5 py-2 hover:opacity-90 transition-opacity'>
            Sign Up
          </Button>
        </div>
      </nav>
    </div>
  </header>
);

// --- NEW: Footer Component ---
// This is a reusable Footer component based on the image.
// You can move this to its own file (e.g., /components/layout/Footer.tsx)
const SiteFooter = () => (
  <footer className='bg-gray-900 text-white'>
    <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8'>
      {/* Column 1: Logo and Info */}
      <div className='space-y-4'>
        <div className='flex items-center gap-2'>
          <GraduationCap className='h-7 w-7' />
          <span className='text-xl font-bold'>PGadmit</span>
        </div>
        <p className='text-sm text-gray-400'>
          Your AI-powered co-pilot for studying abroad.
        </p>
      </div>
      {/* Column 2: Navigation */}
      <div>
        <h3 className='text-sm font-semibold tracking-wider uppercase'>
          Navigation
        </h3>
        <ul className='mt-4 space-y-2 text-gray-400'>
          <li>
            <Link href='/about' className='hover:text-white'>
              About
            </Link>
          </li>
          <li>
            <Link href='/blog' className='hover:text-white'>
              Blog
            </Link>
          </li>
          <li>
            <Link href='/terms' className='hover:text-white'>
              Terms
            </Link>
          </li>
          <li>
            <Link href='/contact' className='hover:text-white'>
              Contact
            </Link>
          </li>
        </ul>
      </div>
      {/* Column 3: Follow Us */}
      <div>
        <h3 className='text-sm font-semibold tracking-wider uppercase'>
          Follow Us
        </h3>
        <p className='mt-4 text-sm text-gray-400'>
          Follow PGadmit for global student tips and stories.
        </p>
        <div className='flex mt-4 space-x-4'>
          <Link href='#' className='text-gray-400 hover:text-white'>
            <Facebook className='h-6 w-6' />
          </Link>
          <Link href='#' className='text-gray-400 hover:text-white'>
            <Twitter className='h-6 w-6' />
          </Link>
          <Link href='#' className='text-gray-400 hover:text-white'>
            <Instagram className='h-6 w-6' />
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

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
    if (isLastStep) {
      const segment = inferSegment(data);
      updateData({ segment });
      setCompleted(true);
      try {
        await syncWithSupabase();
      } catch (error) {
        console.error('Failed to sync onboarding:', error);
      }
      if (onComplete) onComplete();
      else router.push('/dashboard');
    } else {
      setCurrentStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setCurrentStep(step - 1);
  };

  if (!currentStepData) return null;

  return (
    <div className='flex flex-col min-h-screen bg-gray-50'>
      <SiteHeader />

      <main className='flex-1 w-full'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center'>
          {/* Main Page Title */}
          <h1 className='text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight'>
            Get Your Personalized University Matches 🎯
          </h1>
          <p className='mt-4 max-w-2xl mx-auto text-lg text-gray-600'>
            Fill out our smart form and get AI-powered university suggestions
            tailored to your profile, budget, and preferences.
          </p>

          {/* Onboarding Card */}
          <div className='mt-12 max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-lg text-left'>
            <div className='p-6 sm:p-10'>
              {/* Card Header */}
              <div className='space-y-4'>
                <h2 className='text-2xl sm:text-3xl font-bold text-gray-900'>
                  {currentStepData.title}
                </h2>
                <p className='text-base sm:text-lg text-gray-600'>
                  {currentStepData.description}
                </p>
                <div className='space-y-2'>
                  <Progress value={progress} className='h-2' />
                  <div className='flex justify-between text-xs sm:text-sm text-gray-500'>
                    <span>
                      Step {step + 1} of {total}
                    </span>
                    <span>{Math.round(progress)}% complete</span>
                  </div>
                </div>
              </div>

              {/* Main Content (The Form Step) */}
              <div className='mt-8'>
                <div className='animate-in slide-in-from-right-4 duration-300'>
                  {currentStepData.content}
                </div>
              </div>
            </div>

            {/* Card Footer with Navigation */}
            <div className='bg-gray-50 px-6 py-4 sm:px-10 rounded-b-xl border-t border-gray-200'>
              <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
                <Button
                  variant='ghost'
                  onClick={handleBack}
                  disabled={step === 0}
                  className='w-full sm:w-auto'
                >
                  <ArrowLeft className='h-4 w-4 mr-2' />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canContinue}
                  className='w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700'
                >
                  {isLastStep ? 'Get My Matches' : 'Continue'}
                  <ArrowRight className='h-4 w-4 ml-2' />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}