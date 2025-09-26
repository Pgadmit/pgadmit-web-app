'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { getCollegeSuggestions, sendToN8nWebhook } from '@/actions/ai-workflow';
import AdmissionForm from '@/components/admission-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AdmissionFormSchema, AdmissionFormSchemaValues } from '@/lib/validations';

export function AdmissionSection() {
  const [isPending, startTransition] = useTransition();
  const [collegeSuggestions, setCollegeSuggestions] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<AdmissionFormSchemaValues>({
    resolver: zodResolver(AdmissionFormSchema),
    defaultValues: {
      preferredRegions: [],
      newsletter: false,
    },
  });

  const onSubmit = (values: AdmissionFormSchemaValues) => {
    setCollegeSuggestions([]);
    setErrorMessage(null);

    startTransition(async () => {
      try {
        // GET AI SUGGESTIONS
        const suggestions = await getCollegeSuggestions(values);

        if (!Array.isArray(suggestions) || suggestions.length === 0) {
          console.warn('No valid suggestions returned');
          setErrorMessage('No valid suggestions could be generated. Please try again.');
          return;
        }

        console.log(suggestions);
        setCollegeSuggestions(suggestions);

        // SEND BOTH FORM DATA + AI SUGGESTIONS TO N8N
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

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted/20 to-background">
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
              <h3 className="text-2xl font-semibold text-primary-blue mb-4">Your Matches</h3>

              <div className="flex-1 flex flex-col justify-between">
                <div className="mb-6">
                  {errorMessage ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-600">{errorMessage}</p>
                    </div>
                  ) : collegeSuggestions.length > 0 ? (
                    <>
                      <ul className="list-disc list-inside space-y-3 mt-8">
                        {collegeSuggestions.map((college, index) => {
                          const blur = index >= collegeSuggestions.length - 3;
                          return (
                            <li
                              key={college}
                              className={`text-lg font-medium ${
                                blur ? 'blur-xs text-gray-400' : 'text-gray-700'
                              }`}
                            >
                              {college}
                            </li>
                          );
                        })}
                      </ul>
                      <div className="flex justify-center mt-12 lg:mt-24">
                        <Button
                          size="lg"
                          className="px-8 py-3 text-lg bg-primary-blue hover:bg-primary-blue/80 w-full sm:w-auto"
                        >
                          Get Detailed Report
                        </Button>
                      </div>
                    </>
                  ) : (
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
                  )}
                </div>

                {/* Bottom section with disclaimer */}
                {collegeSuggestions.length > 0 && !errorMessage && (
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
                )}
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
