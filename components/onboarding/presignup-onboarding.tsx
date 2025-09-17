"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  GraduationCap,
  DollarSign,
  Clock,
  User,
  BookOpen,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import {
  FIELD_OPTIONS,
  labelForField,
  DESTINATION_OPTIONS,
  COUNTRY_OPTIONS,
  FUNDING_OPTIONS,
} from "@/lib/onboarding/constants";
import { gpaPlaceholderForCountry, inferSegment } from "@/lib/onboarding/logic";

type StudyGoal = "bachelor" | "master" | "second-master";

interface PreSignupData {
  studyGoal: StudyGoal | "";
  fieldOfStudy: string;
  destination: "usa" | "uk" | "";
  knowsUniversities: "yes" | "no" | "";
  country: string;
  gpa: string;
  intake: string;
  budget: string;
  funding: string;
  studyBreak: string;
  visaRefusal: string;
  segment: string;
}

interface PreSignupOnboardingProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (
    data: Pick<PreSignupData, "country" | "fieldOfStudy" | "budget"> & {
      all: PreSignupData;
    }
  ) => void;
}

export function PreSignupOnboarding({
  isOpen,
  onClose,
  onComplete,
}: PreSignupOnboardingProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<PreSignupData>({
    studyGoal: "",
    fieldOfStudy: "",
    destination: "",
    knowsUniversities: "",
    country: "india", // pseudo auto-detected default
    gpa: "",
    intake: "",
    budget: "",
    funding: "",
    studyBreak: "",
    visaRefusal: "",
    segment: "",
  });
  const [budgetSlider, setBudgetSlider] = useState([30000]);

  const steps = useMemo(
    () => [
      {
        id: "goal",
        title: "What’s your study goal?",
        description: "Pick the path that matches your plan",
        content: (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-sm sm:max-w-none mx-auto">
              {[
                {
                  v: "bachelor",
                  l: "Bachelor",
                  icon: GraduationCap,
                  desc: "First degree",
                },
                {
                  v: "master",
                  l: "Master",
                  icon: BookOpen,
                  desc: "Advanced degree",
                },
                {
                  v: "second-master",
                  l: "Second Master",
                  icon: CheckCircle,
                  desc: "Additional specialization",
                },
              ].map((opt) => (
                <Button
                  key={opt.v}
                  variant={data.studyGoal === opt.v ? "default" : "outline"}
                  className="flex flex-col items-center justify-center h-16 sm:h-20 p-3 space-y-1 hover:scale-105 transition-all duration-200 cursor-pointer"
                  onClick={() =>
                    setData((prev) => ({
                      ...prev,
                      studyGoal: opt.v as StudyGoal,
                    }))
                  }
                >
                  <opt.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <div className="text-center">
                    <div className="font-medium text-xs sm:text-sm">
                      {opt.l}
                    </div>
                    <div className="text-xs opacity-70">{opt.desc}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        ),
        canContinue: () => data.studyGoal !== "",
      },
      {
        id: "field",
        title: "What would you like to study?",
        description: "Choose your field or skip if unsure",
        content: (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center space-y-3 sm:space-y-4 max-w-sm mx-auto">
              <Label className="text-sm sm:text-base font-semibold block">
                Field of Study
              </Label>
              <Select
                value={data.fieldOfStudy}
                onValueChange={(v) =>
                  setData((p) => ({ ...p, fieldOfStudy: v }))
                }
              >
                <SelectTrigger className="h-10 sm:h-11 text-sm sm:text-base cursor-pointer w-full">
                  <SelectValue placeholder="Choose your field of study" />
                </SelectTrigger>
                <SelectContent>
                  {FIELD_OPTIONS.map((v) => (
                    <SelectItem
                      key={v}
                      value={v}
                      className="text-sm sm:text-base py-2"
                    >
                      {labelForField(v)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-center">
              <Button
                variant="outline"
                className="h-8 sm:h-9 px-4 sm:px-6 text-sm sm:text-base text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                onClick={() => {
                  setData((p) => ({ ...p, fieldOfStudy: "" }));
                  setStep((s) => Math.min(s + 1, steps.length - 1));
                }}
              >
                I don't know yet
              </Button>
            </div>
          </div>
        ),
        canContinue: () => true,
      },
      {
        id: "destination",
        title: "Where do you plan to study?",
        description: "We’ll tailor deadlines and requirements",
        content: (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto">
              {DESTINATION_OPTIONS.map((opt) => (
                <Button
                  key={opt.v}
                  variant={data.destination === opt.v ? "default" : "outline"}
                  className="flex flex-col items-center justify-center h-16 sm:h-20 w-full sm:w-32 p-3 sm:p-4 space-y-1 sm:space-y-2 hover:scale-105 transition-all duration-200 cursor-pointer"
                  onClick={() =>
                    setData((prev) => ({
                      ...prev,
                      destination: opt.v as "usa" | "uk",
                    }))
                  }
                >
                  <div className="text-center">
                    <div className="font-semibold text-sm sm:text-base">
                      {opt.l}
                    </div>
                    <div className="text-xs opacity-70">
                      {opt.v === "usa" ? "United States" : "United Kingdom"}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-blue-800 max-w-sm sm:max-w-md mx-auto">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Top US universities</strong> often require essays &
                  extracurriculars — we'll help.
                </div>
              </div>
            </div>
          </div>
        ),
        canContinue: () => data.destination !== "",
      },
      {
        id: "knows",
        title:
          "Do you already know specific universities you want to apply to?",
        description: "This helps us personalize your shortlist",
        content: (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto">
              {[
                {
                  v: "yes",
                  l: "Yes",
                  icon: CheckCircle,
                  desc: "I have specific universities in mind",
                },
                {
                  v: "no",
                  l: "No",
                  icon: BookOpen,
                  desc: "I need help finding options",
                },
              ].map((opt) => (
                <Button
                  key={opt.v}
                  variant={
                    data.knowsUniversities === opt.v ? "default" : "outline"
                  }
                  className="flex flex-col items-center justify-center h-20 sm:h-24 w-full sm:w-52 p-3 sm:p-4 space-y-1 sm:space-y-2 hover:scale-105 transition-all duration-200 cursor-pointer"
                  onClick={() =>
                    setData((p) => ({
                      ...p,
                      knowsUniversities: opt.v as "yes" | "no",
                    }))
                  }
                >
                  <opt.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <div className="text-center">
                    <div className="font-semibold text-sm sm:text-base">
                      {opt.l}
                    </div>
                    <div className="text-xs opacity-70 leading-tight px-1 sm:px-2">
                      {opt.desc}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        ),
        canContinue: () => data.knowsUniversities !== "",
      },
      {
        id: "country",
        title: "Where are you from?",
        description: "This helps us recommend scholarships for your country",
        content: (
          <div className="space-y-4">
            <div className="space-y-3 max-w-sm mx-auto">
              <Label className="text-sm sm:text-base font-semibold">
                Country of Origin
              </Label>
              <Select
                value={data.country}
                onValueChange={(v) => setData((p) => ({ ...p, country: v }))}
              >
                <SelectTrigger className="h-10 sm:h-11 text-sm sm:text-base cursor-pointer w-full">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRY_OPTIONS.map((c) => (
                    <SelectItem
                      key={c.v}
                      value={c.v}
                      className="text-sm sm:text-base py-2"
                    >
                      {c.l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-xs sm:text-sm text-green-800">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
                <div>
                  This helps us recommend{" "}
                  <strong>scholarships available for your country</strong>.
                </div>
              </div>
            </div>
          </div>
        ),
        canContinue: () => data.country !== "",
      },
      {
        id: "gpa",
        title: "What’s your Grade Point Average (GPA)?",
        description:
          "This helps us show the right universities and scholarships. If you’re not sure, just click ‘Skip for now’.",
        content: (
          <div className="space-y-4">
            <div className="space-y-3 max-w-sm mx-auto">
              <Label className="text-sm sm:text-base font-semibold">
                Grade Point Average (GPA)
              </Label>
              <Input
                value={data.gpa}
                onChange={(e) =>
                  setData((p) => ({ ...p, gpa: e.target.value }))
                }
                placeholder={gpaPlaceholderForCountry(data.country)}
                className="h-10 sm:h-11 text-sm sm:text-base cursor-pointer w-full"
              />
            </div>
            <div className="flex justify-center">
              <Button
                variant="outline"
                className="h-8 sm:h-9 px-4 text-sm sm:text-base text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                onClick={() => {
                  setData((p) => ({ ...p, gpa: "" }));
                  setStep((s) => Math.min(s + 1, steps.length - 1));
                }}
              >
                Skip for now
              </Button>
            </div>
          </div>
        ),
        canContinue: () => true,
      },
      {
        id: "intake",
        title: "When do you want to start your studies?",
        description: "We’ll calculate deadlines and your roadmap",
        content: (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
              <Button
                variant={data.intake === "fall-2025" ? "default" : "outline"}
                className="flex items-center justify-center h-12 w-full sm:w-auto px-4 sm:px-6 space-x-2 hover:scale-105 transition-all duration-200 cursor-pointer"
                onClick={() => setData((p) => ({ ...p, intake: "fall-2025" }))}
              >
                <Clock className="h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium text-sm sm:text-base">
                    Fall 2025
                  </div>
                  <div className="text-xs opacity-70">September/October</div>
                </div>
              </Button>
              <Button
                variant="ghost"
                className="flex items-center justify-center h-12 w-full sm:w-auto px-4 sm:px-6 space-x-2 hover:scale-105 transition-all duration-200 cursor-pointer"
                onClick={() => {
                  setData((p) => ({ ...p, intake: "" }));
                  setStep((s) => Math.min(s + 1, steps.length - 1));
                }}
              >
                <AlertCircle className="h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium text-sm sm:text-base">
                    Not sure yet
                  </div>
                  <div className="text-xs opacity-70">I need more time</div>
                </div>
              </Button>
            </div>
          </div>
        ),
        canContinue: () => true,
      },
      {
        id: "budget",
        title: "What’s your study budget per year?",
        description:
          "Don’t worry if it’s limited — we’ll suggest scholarships and low-cost programs.",
        content: (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center space-y-3 sm:space-y-4 max-w-sm mx-auto">
              <Label className="text-sm sm:text-base font-semibold block">
                Annual Study Budget
              </Label>
              <div className="space-y-3 sm:space-y-4">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    ${budgetSlider[0].toLocaleString()}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    per year
                  </div>
                </div>
                <div className="px-2 sm:px-4">
                  <Slider
                    value={budgetSlider}
                    onValueChange={(value) => {
                      setBudgetSlider(value);
                      setData((p) => ({ ...p, budget: `$${value[0]}` }));
                    }}
                    min={5000}
                    max={60000}
                    step={1000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>$5,000</span>
                    <span>$60,000</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                variant="outline"
                className="h-8 sm:h-9 px-4 sm:px-6 text-sm sm:text-base text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                onClick={() => {
                  setData((p) => ({ ...p, budget: "" }));
                  setStep((s) => Math.min(s + 1, steps.length - 1));
                }}
              >
                I don't know yet
              </Button>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-amber-800 max-w-sm sm:max-w-md mx-auto">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
                <div>
                  Don't worry if your budget feels limited —{" "}
                  <strong>
                    AI will suggest scholarships and low-cost programs
                  </strong>
                  .
                </div>
              </div>
            </div>
          </div>
        ),
        canContinue: () => true,
      },
      // Master-specific steps
      ...(data.studyGoal === "master" || data.studyGoal === "second-master"
        ? [
            {
              id: "funding",
              title: "Who will fund your studies?",
              description:
                "This helps us recommend the right financial support options",
              content: (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
                    {FUNDING_OPTIONS.map((opt) => (
                      <Button
                        key={opt.v}
                        variant={data.funding === opt.v ? "default" : "outline"}
                        className="flex items-center justify-center h-10 w-full sm:w-auto px-4 space-x-2 hover:scale-105 transition-all duration-200 cursor-pointer"
                        onClick={() =>
                          setData((p) => ({ ...p, funding: opt.v }))
                        }
                      >
                        <DollarSign className="h-4 w-4" />
                        <span className="font-medium">{opt.l}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              ),
              canContinue: () => data.funding !== "",
            },
            {
              id: "break",
              title:
                "Have you taken a break from studies after your last degree?",
              description:
                "This helps us understand if you need to update transcripts or provide additional documents.",
              content: (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
                    {[
                      {
                        v: "no",
                        l: "No",
                        icon: CheckCircle,
                        desc: "I went straight to this",
                      },
                      {
                        v: "yes",
                        l: "Yes",
                        icon: Clock,
                        desc: "I took time off",
                      },
                    ].map((opt) => (
                      <Button
                        key={opt.v}
                        variant={
                          data.studyBreak === opt.v ? "default" : "outline"
                        }
                        className="flex flex-col items-center justify-center h-20 w-full sm:w-40 p-4 space-y-1 hover:scale-105 transition-all duration-200 cursor-pointer"
                        onClick={() =>
                          setData((p) => ({ ...p, studyBreak: opt.v }))
                        }
                      >
                        <opt.icon className="h-4 w-4" />
                        <div className="text-center">
                          <div className="font-medium text-sm">{opt.l}</div>
                          <div className="text-xs opacity-70 leading-tight">
                            {opt.desc}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              ),
              canContinue: () => data.studyBreak !== "",
            },
            {
              id: "visa",
              title: "Have you ever been refused a visa?",
              description:
                "No problem. Our experts will help you prepare a stronger application.",
              content: (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
                    {[
                      {
                        v: "no",
                        l: "No, I have never been refused a visa",
                        icon: CheckCircle,
                        desc: "Clean visa history",
                      },
                      {
                        v: "yes",
                        l: "Yes, I have been refused before",
                        icon: AlertCircle,
                        desc: "Previous visa issues",
                      },
                    ].map((opt) => (
                      <Button
                        key={opt.v}
                        variant={
                          data.visaRefusal === opt.v ? "default" : "outline"
                        }
                        className="flex items-start justify-start h-auto w-full sm:w-64 p-4 space-x-3 hover:scale-105 transition-all duration-200 cursor-pointer"
                        onClick={() =>
                          setData((p) => ({ ...p, visaRefusal: opt.v }))
                        }
                      >
                        <opt.icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <div className="text-left">
                          <div className="font-medium text-sm leading-tight">
                            {opt.l}
                          </div>
                          <div className="text-xs opacity-70 mt-1">
                            {opt.desc}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                  {data.visaRefusal === "yes" && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>No problem.</strong> Our experts will help you
                          prepare a stronger application.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ),
              canContinue: () => data.visaRefusal !== "",
            },
          ]
        : []),
      {
        id: "ready",
        title: "🎉 Your Personalized Study Plan is Ready!",
        description:
          "Based on your answers, we’ve created a personalized plan with exclusive benefits tailored for you.",
        content: (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                Congratulations!
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-sm mx-auto">
                Based on your answers, we've created a personalized plan with
                exclusive benefits tailored just for you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto">
              {[
                {
                  icon: GraduationCap,
                  title: "All-in-one platform",
                  desc: "Schools, scholarships & visas in one place",
                },
                {
                  icon: Sparkles,
                  title: "AI study buddy",
                  desc: "Essays, tips & instant answers 24/7",
                },
                {
                  icon: CheckCircle,
                  title: "Personalized matches",
                  desc: "That fit your goals & budget",
                },
                {
                  icon: Clock,
                  title: "Smart reminders",
                  desc: "So you never miss a deadline",
                },
                {
                  icon: User,
                  title: "Mobile-first design",
                  desc: "Swipe, progress bars & badges",
                },
                {
                  icon: BookOpen,
                  title: "Family peace of mind",
                  desc: "Parents can follow your journey",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 sm:p-4 bg-muted/30 rounded-lg"
                >
                  <benefit.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-xs sm:text-sm">
                      {benefit.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {benefit.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ),
        canContinue: () => true,
      },
    ],
    [data]
  );

  const total = steps.length;
  const progress = ((step + 1) / total) * 100;

  const handleNext = () => {
    if (step < total - 1) {
      setStep((s) => s + 1);
    } else {
      const segment = inferSegment(data);
      const finalData = { ...data, segment };
      setData(finalData);
      onComplete({
        country: finalData.country,
        fieldOfStudy: finalData.fieldOfStudy,
        budget: finalData.budget,
        all: finalData,
      });
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const previousOverflow = document.body.style.overflow;
      const previousOverflowX = document.body.style.overflowX;
      document.body.style.overflow = "hidden";
      document.body.style.overflowX = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
        document.body.style.overflowX = previousOverflowX;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

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
            {steps[step].title}
          </CardTitle>
          <p className="text-sm sm:text-lg text-muted-foreground">
            {steps[step].description}
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
              {steps[step].content}
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
                onClick={onClose}
                className="h-9 sm:h-11 px-4 sm:px-6 flex-1 sm:flex-none"
              >
                Close
              </Button>
              <Button
                onClick={handleNext}
                disabled={!steps[step].canContinue()}
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
