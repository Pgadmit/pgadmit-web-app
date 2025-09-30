"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { MessageCircle, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useGamification } from "@/lib/gamification-context";
import { PersonalizedInsights } from "./personalized-insights";

interface OnboardingData {
  // Basic Info
  country: string;
  fieldOfStudy: string;
  budget: string;

  // Academic Background
  currentEducation: string;
  gpa: string;
  testScores: string;

  // Goals & Preferences
  preferredCountries: string[];
  careerGoals: string;
  priorities: string[];

  // Personal
  challenges: string[];
  motivation: string;
}

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  aiMessage: string;
  fields: Array<{
    name: keyof OnboardingData;
    label: string;
    type: "select" | "input" | "textarea" | "multiselect";
    options?: string[];
    placeholder?: string;
    required?: boolean;
  }>;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: "basic-info",
    title: "Let's Get Started! 🌟",
    description: "Tell me about your background",
    aiMessage:
      "Hi there! I'm your AI study abroad counselor. I'm here to help you find the perfect university match. Let's start with some basics about you!",
    fields: [
      {
        name: "country",
        label: "Where are you from?",
        type: "select",
        options: ["West Africa", "South Asia", "East Africa", "Other"],
        required: true,
      },
      {
        name: "fieldOfStudy",
        label: "What do you want to study?",
        type: "select",
        options: [
          "Engineering",
          "Computer Science",
          "Business",
          "Medicine",
          "Arts & Humanities",
          "Social Sciences",
          "Other",
        ],
        required: true,
      },
      {
        name: "budget",
        label: "What's your annual budget? (USD)",
        type: "select",
        options: [
          "Under $20,000",
          "$20,000 - $40,000",
          "$40,000 - $60,000",
          "Over $60,000",
        ],
        required: true,
      },
    ],
  },
  {
    id: "academic-background",
    title: "Academic Journey 📚",
    description: "Your educational background",
    aiMessage:
      "Great choices! Now let's talk about your academic background. This helps me understand your current level and find universities that match your profile.",
    fields: [
      {
        name: "currentEducation",
        label: "Current Education Level",
        type: "select",
        options: [
          "High School",
          "Bachelor's Degree",
          "Master's Degree",
          "Other",
        ],
        required: true,
      },
      {
        name: "gpa",
        label: "GPA or Equivalent Score",
        type: "input",
        placeholder: "e.g., 3.8/4.0 or 85%",
      },
      {
        name: "testScores",
        label: "Test Scores (SAT, GRE, IELTS, etc.)",
        type: "textarea",
        placeholder: "e.g., SAT: 1450, IELTS: 7.5",
      },
    ],
  },
  {
    id: "goals-preferences",
    title: "Your Dreams & Goals 🎯",
    description: "What you want to achieve",
    aiMessage:
      "Awesome! Now let's dive into your goals and preferences. Understanding what you want to achieve helps me recommend the best programs and universities for you.",
    fields: [
      {
        name: "preferredCountries",
        label: "Preferred Study Destinations",
        type: "multiselect",
        options: [
          "United States",
          "United Kingdom",
          "Canada",
          "Australia",
          "Germany",
          "Netherlands",
          "Other",
        ],
      },
      {
        name: "careerGoals",
        label: "What are your career goals?",
        type: "textarea",
        placeholder:
          "e.g., I want to become a software engineer at a tech company...",
      },
      {
        name: "priorities",
        label: "What's most important to you?",
        type: "multiselect",
        options: [
          "University Ranking",
          "Affordable Tuition",
          "Scholarship Opportunities",
          "Location/Climate",
          "Research Opportunities",
          "Job Prospects",
          "Cultural Diversity",
        ],
      },
    ],
  },
  {
    id: "challenges-motivation",
    title: "Let's Be Real 💪",
    description: "Challenges and motivation",
    aiMessage:
      "You're doing great! Finally, let's talk about any concerns you might have and what motivates you. This helps me provide personalized support throughout your journey.",
    fields: [
      {
        name: "challenges",
        label: "What concerns you most about studying abroad?",
        type: "multiselect",
        options: [
          "Financial Costs",
          "Visa Process",
          "Being Away from Family",
          "Academic Competition",
          "Cultural Adjustment",
          "Language Barriers",
          "Finding Accommodation",
        ],
      },
      {
        name: "motivation",
        label: "What motivates you to study abroad?",
        type: "textarea",
        placeholder: "Share what drives you to take this big step...",
      },
    ],
  },
];

interface AIOnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<OnboardingData>;
}

export function AIOnboardingFlow({
  isOpen,
  onClose,
  initialData = {},
}: AIOnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<OnboardingData>({
    country: "",
    fieldOfStudy: "",
    budget: "",
    currentEducation: "",
    gpa: "",
    testScores: "",
    preferredCountries: [],
    careerGoals: "",
    priorities: [],
    challenges: [],
    motivation: "",
    ...initialData,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInsights, setShowInsights] = useState(false);

  const { user, updateUser } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { unlockAchievement, addPoints } = useGamification();

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;
  const currentStepData = onboardingSteps[currentStep];

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen || showInsights) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [isOpen, showInsights]);

  const handleFieldChange = (
    fieldName: keyof OnboardingData,
    value: string | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      addPoints(5, `Completed onboarding step: ${currentStepData.title}`);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      // Update user profile with onboarding data
      if (user) {
        await updateUser({
          ...user,
          onboardingComplete: true,
          profileData: formData,
          profileComplete: true,
        });
      }

      // Unlock achievement
      unlockAchievement("profile-complete");
      addPoints(50, "Completed full onboarding!");

      toast({
        title: "Profile Complete! 🎉",
        description:
          "Now let's show you personalized insights based on your responses.",
      });

      setShowInsights(true);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInsightsComplete = () => {
    setShowInsights(false);
    onClose();
    router.push("/dashboard");
  };

  if (!isOpen) return null;

  return (
    <>
      <PersonalizedInsights
        isOpen={showInsights}
        onClose={handleInsightsComplete}
        userData={formData}
      />

      {!showInsights && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MessageCircle className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium text-primary">
                  AI Counselor
                </span>
              </div>
              <CardTitle className="text-2xl font-bold">
                {currentStepData.title}
              </CardTitle>
              <p className="text-muted-foreground">
                {currentStepData.description}
              </p>

              <div className="mt-4">
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Step {currentStep + 1} of {onboardingSteps.length}
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* AI Message */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-2 flex-shrink-0">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {currentStepData.aiMessage}
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {currentStepData.fields.map((field) => (
                  <div key={field.name} className="space-y-2">
                    <Label className="text-sm font-semibold">
                      {field.label}
                      {field.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </Label>

                    {field.type === "select" && (
                      <Select
                        value={formData[field.name] as string}
                        onValueChange={(value) =>
                          handleFieldChange(field.name, value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={`Select ${field.label.toLowerCase()}`}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem
                              key={option}
                              value={option.toLowerCase().replace(/\s+/g, "-")}
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}

                    {field.type === "input" && (
                      <Input
                        value={formData[field.name] as string}
                        onChange={(e) =>
                          handleFieldChange(field.name, e.target.value)
                        }
                        placeholder={field.placeholder}
                      />
                    )}

                    {field.type === "textarea" && (
                      <Textarea
                        value={formData[field.name] as string}
                        onChange={(e) =>
                          handleFieldChange(field.name, e.target.value)
                        }
                        placeholder={field.placeholder}
                        rows={3}
                      />
                    )}

                    {field.type === "multiselect" && (
                      <div className="grid grid-cols-2 gap-2">
                        {field.options?.map((option) => {
                          const isSelected = (
                            formData[field.name] as string[]
                          ).includes(option.toLowerCase().replace(/\s+/g, "-"));
                          return (
                            <Button
                              key={option}
                              type="button"
                              variant={isSelected ? "default" : "outline"}
                              size="sm"
                              className="justify-start text-left h-auto py-2"
                              onClick={() => {
                                const currentValues = formData[
                                  field.name
                                ] as string[];
                                const value = option
                                  .toLowerCase()
                                  .replace(/\s+/g, "-");
                                const newValues = isSelected
                                  ? currentValues.filter((v) => v !== value)
                                  : [...currentValues, value];
                                handleFieldChange(field.name, newValues);
                              }}
                            >
                              {option}
                            </Button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                      Completing...
                    </>
                  ) : currentStep === onboardingSteps.length - 1 ? (
                    <>
                      Complete & Go to Dashboard
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
