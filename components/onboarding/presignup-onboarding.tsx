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
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { FIELD_OPTIONS, labelForField, DESTINATION_OPTIONS, COUNTRY_OPTIONS } from "@/lib/onboarding/constants";
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
    segment: "",
  });

  const steps = useMemo(
    () => [
      {
        id: "goal",
        title: "What’s your study goal?",
        description: "Pick the path that matches your plan",
        content: (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { v: "bachelor", l: "🎓 Bachelor" },
              { v: "master", l: "🎓 Master" },
              { v: "second-master", l: "🎓 Second Master" },
            ].map((opt) => (
              <Button
                key={opt.v}
                variant={data.studyGoal === opt.v ? "default" : "outline"}
                className="justify-start h-auto py-3"
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    studyGoal: opt.v as StudyGoal,
                  }))
                }
              >
                {opt.l}
              </Button>
            ))}
          </div>
        ),
        canContinue: () => data.studyGoal !== "",
      },
      {
        id: "field",
        title: "What would you like to study?",
        description: "Choose your field or skip if unsure",
        content: (
          <div className="space-y-2">
            <Label>Field</Label>
            <Select
              value={data.fieldOfStudy}
              onValueChange={(v) => setData((p) => ({ ...p, fieldOfStudy: v }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your field" />
              </SelectTrigger>
              <SelectContent>
                {FIELD_OPTIONS.map((v) => (
                  <SelectItem key={v} value={v}>
                    {labelForField(v)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              onClick={() => {
                setData((p) => ({ ...p, fieldOfStudy: "" }));
                setStep((s) => Math.min(s + 1, steps.length - 1));
              }}
            >
              I don’t know yet
            </Button>
          </div>
        ),
        canContinue: () => true,
      },
      {
        id: "destination",
        title: "Where do you plan to study?",
        description: "We’ll tailor deadlines and requirements",
        content: (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DESTINATION_OPTIONS.map((opt) => (
              <Button
                key={opt.v}
                variant={data.destination === opt.v ? "default" : "outline"}
                className="justify-start h-auto py-3"
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    destination: opt.v as "usa" | "uk",
                  }))
                }
              >
                {opt.l}
              </Button>
            ))}
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
          <div className="grid grid-cols-2 gap-3">
            {[
              { v: "yes", l: "Yes" },
              { v: "no", l: "No" },
            ].map((opt) => (
              <Button
                key={opt.v}
                variant={
                  data.knowsUniversities === opt.v ? "default" : "outline"
                }
                onClick={() =>
                  setData((p) => ({
                    ...p,
                    knowsUniversities: opt.v as "yes" | "no",
                  }))
                }
              >
                {opt.l}
              </Button>
            ))}
          </div>
        ),
        canContinue: () => data.knowsUniversities !== "",
      },
      {
        id: "country",
        title: "Where are you from?",
        description: "This helps us recommend scholarships for your country",
        content: (
          <div className="space-y-2">
            <Label>Country</Label>
            <Select
              value={data.country}
              onValueChange={(v) => setData((p) => ({ ...p, country: v }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRY_OPTIONS.map((c) => (
                  <SelectItem key={c.v} value={c.v}>{c.l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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
          <div className="space-y-2">
            <Label>GPA</Label>
            <Input
              value={data.gpa}
              onChange={(e) => setData((p) => ({ ...p, gpa: e.target.value }))}
              placeholder={gpaPlaceholderForCountry(data.country)}
            />
            <Button
              variant="ghost"
              onClick={() => {
                setData((p) => ({ ...p, gpa: "" }));
                setStep((s) => Math.min(s + 1, steps.length - 1));
              }}
            >
              Skip for now
            </Button>
          </div>
        ),
        canContinue: () => true,
      },
      {
        id: "intake",
        title: "When do you want to start your studies?",
        description: "We’ll calculate deadlines and your roadmap",
        content: (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant={data.intake === "fall-2025" ? "default" : "outline"}
              onClick={() => setData((p) => ({ ...p, intake: "fall-2025" }))}
            >
              Fall 2025 (September/October)
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setData((p) => ({ ...p, intake: "" }));
                setStep((s) => Math.min(s + 1, steps.length - 1));
              }}
            >
              Not sure yet
            </Button>
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
          <div className="flex items-center gap-2">
            <Input
              value={data.budget}
              onChange={(e) =>
                setData((p) => ({ ...p, budget: e.target.value }))
              }
              placeholder="$30,000 per year"
            />
            <Button
              variant="ghost"
              onClick={() => {
                setData((p) => ({ ...p, budget: "" }));
                setStep((s) => Math.min(s + 1, steps.length - 1));
              }}
            >
              I don’t know yet
            </Button>
          </div>
        ),
        canContinue: () => true,
      },
      {
        id: "ready",
        title: "🎉 Your Personalized Study Plan is Ready!",
        description:
          "Based on your answers, we’ve created a personalized plan with exclusive benefits tailored for you.",
        content: (
          <div className="space-y-2 text-sm text-muted-foreground">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                All-in-one platform – schools, scholarships & visas in one place
              </li>
              <li>AI study buddy – essays, tips & instant answers 24/7</li>
              <li>Personalized matches that fit your goals & budget</li>
              <li>Smart reminders so you never miss a deadline</li>
              <li>Mobile-first, swipe, progress bars & badges</li>
              <li>Parents can follow your journey</li>
            </ul>
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
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium text-primary">Onboarding</span>
          </div>
          <CardTitle className="text-2xl font-bold">
            {steps[step].title}
          </CardTitle>
          <p className="text-muted-foreground">{steps[step].description}</p>

          <div className="mt-4">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Step {step + 1} of {total}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">{steps[step].content}</div>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            <div className="flex gap-2">
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
              <Button
                onClick={handleNext}
                disabled={!steps[step].canContinue()}
                className="bg-primary hover:bg-primary/90"
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
        </CardContent>
      </Card>
    </div>
  );
}

// business logic moved to @/lib/onboarding/*
