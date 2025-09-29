'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { getCollegeSuggestions, sendToN8nWebhook } from '@/actions/ai-workflow';
import AdmissionForm from '@/components/admission-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AdmissionFormSchema, AdmissionFormSchemaValues } from '@/lib/validations';
import { useSuggestUniversities } from '@/lib/stores/suggest-universities-store';
import { UniversityCard, UniversityCardSkeleton } from '@/components/universities';

export function AdmissionSection() {
  const { setUniversities, setLoading, setError, universities, loading } = useSuggestUniversities();

  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<AdmissionFormSchemaValues>({
    resolver: zodResolver(AdmissionFormSchema),
    defaultValues: {
      preferredRegions: [],
      newsletter: false,
    },
  });

  const onSubmit = (values: AdmissionFormSchemaValues) => {
    setErrorMessage(null);
    setUniversities([]);
    setLoading(true);
    setError(null);

    startTransition(async () => {
      try {
        const suggestions = await getCollegeSuggestions(values);

        if (!Array.isArray(suggestions) || suggestions.length === 0) {
          console.warn('No valid suggestions returned');
          setErrorMessage('No valid suggestions could be generated. Please try again.');
          return;
        }

        setUniversities(suggestions);
        setLoading(false);
        setError(null);

        await sendToN8nWebhook({
          formData: values,
          suggestions,
        });
      } catch (error: any) {
        if (error?.response?.data?.error?.code === 'insufficient_quota') {
          setErrorMessage('Monthly usage limit reached. Please try again next month.');
        } else {
          console.error('Error fetching college suggestions:', error);
          setErrorMessage('Something went wrong while fetching suggestions.');
        }
      }
    });
  };

  const renderMatchesContent = () => {
    if (errorMessage) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{errorMessage}</p>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="space-y-4">
          <div className="grid gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <UniversityCardSkeleton key={index} index={index} />
            ))}
          </div>
          <div className="text-center py-4">
            <p className="text-muted-foreground text-sm">Finding your perfect matches...</p>
          </div>
        </div>
      );
    }

    if (universities.length > 0) {
      return (
        <div className="min-h-[32rem] sm:min-h-[36rem] flex flex-col">
          <div className="flex-1 grid gap-3 sm:gap-4 p-3 sm:p-4">
            {universities.map((university, index) => {
              const isBlurred = index >= 2;
              return (
                <div
                  key={university}
                  className={isBlurred ? 'select-none pointer-events-none' : ''}
                >
                  <UniversityCard
                    name={university}
                    index={index}
                    isBlurred={isBlurred}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-center mt-4 sm:mt-6 px-3 sm:px-4">
            <Button
              size="lg"
              className="px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg bg-primary-blue hover:bg-primary-blue/80 w-full sm:w-auto"
            >
              Get Detailed Report
            </Button>
          </div>
        </div>
      );
    }
    else if (universities.length === 0) {
      return (

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <p className="text-muted-foreground text-lg">
            Your personalized university matches will appear here after form submission
          </p>
        </div>
      );

    }
    return (
      <div className="space-y-4">
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <UniversityCardSkeleton key={index} index={index} />
          ))}
        </div>
        <div className="text-center py-4">
          <p className="text-muted-foreground text-sm">Finding your perfect matches...</p>
        </div>
      </div>
    );

  };

  const renderDisclaimer = () => {
    const shouldShowDisclaimer = universities.length > 0 && !errorMessage && !loading;

    if (!shouldShowDisclaimer) {
      return null;
    }

    return (
      <div className="space-y-4">
        <div className="bg-blue-50/20 border border-blue-200 rounded-lg p-4">
          <p className="text-xs text-muted-foreground">
            These university suggestions are generated with the assistance of advanced AI,
            analyzing your submitted profile - including country, grading scale, test
            scores, preferred regions, and intended major. The AI evaluates your
            academic background and preferences to recommend universities that could be
            the best fit for your goals.
          </p>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-foreground leading-tight">
            Get Your Personalized University Matches 🎯
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Fill out our smart form and get AI-powered university suggestions tailored to your profile, budget, and preferences.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Column - College Suggestions */}
          <div className="w-full lg:w-1/2">
            <div className="p-6 h-full flex flex-col">
              <h3 className="text-2xl font-semibold text-primary-blue mb-6">Your Matches</h3>

              <div className="flex-1 flex flex-col justify-between">
                <div className="mb-6">
                  {renderMatchesContent()}
                </div>

                {renderDisclaimer()}
              </div>
            </div>
          </div>

          {/* Right Column - Admission Form */}
          <Card className="w-full lg:w-1/2 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold text-primary-blue mb-4">Your Information</h3>
              <AdmissionForm form={form} onSubmit={onSubmit} isPending={isPending} />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}