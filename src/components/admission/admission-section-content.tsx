'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

import AdmissionForm from '@/components/admission/admission-form';
import { UniversityCard, UniversityCardSkeleton } from '@/components/universities';

interface AdmissionSectionContentProps {
    form: any;
    onSubmit: (values: any) => void;
    isPending: boolean;
    errorMessage: string | null;
    loading: boolean;
    universities: string[];
    isOpenAILimited: boolean;
}

export function AdmissionSectionContent({
    form,
    onSubmit,
    isPending,
    errorMessage,
    loading,
    universities,
    isOpenAILimited,
}: AdmissionSectionContentProps) {
    const renderMatchesContent = () => {
        if (errorMessage) {
            return (
                <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-600">
                        {errorMessage}
                    </AlertDescription>
                </Alert>
            );
        }

        if (loading) {
            return (
                <div className="space-y-4">
                    <div className="text-center py-8">
                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
                        <p className="text-muted-foreground">Processing your request...</p>
                    </div>

                    <div className="grid gap-4">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <UniversityCardSkeleton key={index} index={index} />
                        ))}
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

                    {/* Rate Limit Warning */}
                    {isOpenAILimited && (
                        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-center">
                            <span className="text-amber-700 font-medium">
                                Rate limit active. Please wait and try again..
                            </span>
                        </div>
                    )}

                    <AdmissionForm
                        form={form}
                        onSubmit={onSubmit}
                        isPending={isPending}
                        isRateLimited={isOpenAILimited}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
