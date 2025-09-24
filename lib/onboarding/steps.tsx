import React from "react";
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
import { Slider } from "@/components/ui/slider";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  GraduationCap,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  User,
} from "lucide-react";
import {
  FIELD_OPTIONS,
  DESTINATION_OPTIONS,
  COUNTRY_OPTIONS,
  FUNDING_OPTIONS,
} from "@/lib/onboarding/constants";
import { gpaPlaceholderForCountry } from "@/lib/onboarding/logic";

// Helper function to get field label
function labelForField(field: string): string {
  const labels: Record<string, string> = {
    "computer-science": "💻 Computer Science",
    business: "💼 Business",
    engineering: "⚙️ Engineering",
    "medicine-health": "🧬 Medicine & Health",
    "arts-design": "🎨 Arts & Design",
    "social-sciences": "🌍 Social Sciences",
    "natural-sciences": "🔬 Natural Sciences",
    "law-legal": "⚖️ Law & Legal Studies",
    other: "📚 Other",
  };
  return labels[field] || field;
}

export interface PreSignupData {
  studyGoal: "bachelor" | "master" | "second-master" | "";
  fieldOfStudy: string;
  destination: "usa" | "uk" | "";
  knowsUniversities: "yes" | "no" | "";
  country: string;
  gpa: string;
  intake: string;
  budget: string;
  funding?: string;
  studyBreak?: string;
  visaRefusal?: string;
}

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
  canContinue: () => boolean;
}

interface CreateStepsProps {
  data: PreSignupData;
  setData: (
    updates: Partial<PreSignupData> | ((prev: PreSignupData) => PreSignupData)
  ) => void;
  setStep: (step: number | ((prev: number) => number)) => void;
  budgetSlider: number[];
  setBudgetSlider: (value: number[] | ((prev: number[]) => number[])) => void;
  currentStep: number;
}

export function createOnboardingSteps({
  data,
  setData,
  setStep,
  budgetSlider,
  setBudgetSlider,
  currentStep,
}: CreateStepsProps): OnboardingStep[] {
  return [
    {
      id: "goal",
      title: "What's your study goal?",
      description: "Pick the path that matches your plan",
      content: (
        <div className="space-y-8 sm:space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto">
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
                className={`flex flex-col items-center justify-center h-20 sm:h-24 lg:h-28 p-4 sm:p-5 space-y-2 hover:scale-105 transition-all duration-200 cursor-pointer ${
                  data.studyGoal === opt.v 
                    ? "bg-primary text-primary-foreground shadow-lg border-primary" 
                    : "border-2 border-border hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
                }`}
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    studyGoal: opt.v as "bachelor" | "master" | "second-master",
                  }))
                }
              >
                <opt.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                <div className="text-center">
                  <div className="font-semibold text-sm sm:text-base">{opt.l}</div>
                  <div className="text-xs sm:text-sm opacity-70">{opt.desc}</div>
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
        <div className="space-y-8 sm:space-y-10">
          <div className="text-center space-y-6 sm:space-y-8 max-w-lg mx-auto">
            <Label className="text-sm sm:text-base font-semibold block text-foreground mb-2">
              Field of Study
            </Label>
            <Select
              value={data.fieldOfStudy}
              onValueChange={(v) => setData((p) => ({ ...p, fieldOfStudy: v }))}
            >
              <SelectTrigger className="h-12 sm:h-14 lg:h-16 text-sm sm:text-base lg:text-lg cursor-pointer w-full border-2 border-border hover:border-primary/50 focus:border-primary transition-colors bg-background">
                <SelectValue placeholder="Choose your field of study" />
              </SelectTrigger>
              <SelectContent>
                {FIELD_OPTIONS.map((v: string) => (
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
              className="h-10 sm:h-11 lg:h-12 px-6 sm:px-8 lg:px-10 text-sm sm:text-base text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer border-2 border-border hover:border-primary/50 transition-colors"
              onClick={() => {
                setData((p) => ({ ...p, fieldOfStudy: "" }));
                setStep(currentStep + 1);
              }}
            >
              I don't know yet
            </Button>
          </div>
        </div>
      ),
      canContinue: () => data.fieldOfStudy !== "",
    },
    {
      id: "destination",
      title: "Where do you plan to study?",
      description: "We'll tailor deadlines and requirements",
      content: (
        <div className="space-y-8 sm:space-y-10">
          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 max-w-2xl mx-auto">
            {DESTINATION_OPTIONS.map((opt) => (
              <Button
                key={opt.v}
                variant={data.destination === opt.v ? "default" : "outline"}
                className={`flex flex-col items-center justify-center h-20 sm:h-24 lg:h-28 w-full sm:w-40 lg:w-48 p-4 sm:p-5 space-y-2 hover:scale-105 transition-all duration-200 cursor-pointer ${
                  data.destination === opt.v 
                    ? "bg-primary text-primary-foreground shadow-lg border-primary" 
                    : "border-2 border-border hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
                }`}
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
          <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-4 sm:p-5 text-xs sm:text-sm text-foreground max-w-sm sm:max-w-md mx-auto shadow-sm">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0 text-primary" />
              <div>
                <strong className="font-semibold">Top US universities</strong> often require essays &
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
      title: "Do you already know specific universities you want to apply to?",
      description: "This helps us personalize your shortlist",
      content: (
        <div className="space-y-8 sm:space-y-10">
          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 max-w-3xl mx-auto">
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
                className="flex flex-col items-center justify-center h-24 sm:h-28 lg:h-32 w-full sm:w-56 lg:w-64 p-4 sm:p-5 lg:p-6 space-y-2 hover:scale-105 transition-all duration-200 cursor-pointer hover:text-foreground"
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
        <div className="space-y-8 sm:space-y-10">
          <div className="space-y-6 sm:space-y-8 max-w-lg mx-auto">
            <Label className="text-sm sm:text-base font-semibold text-foreground mb-2">
              Country of Origin
            </Label>
            <Select
              value={data.country}
              onValueChange={(v) => setData((p) => ({ ...p, country: v }))}
            >
              <SelectTrigger className="h-12 sm:h-14 lg:h-16 text-sm sm:text-base lg:text-lg cursor-pointer w-full border-2 border-border hover:border-primary/50 focus:border-primary transition-colors bg-background">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRY_OPTIONS.map((c: { v: string; l: string }) => (
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
          <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-4 sm:p-5 text-xs sm:text-sm text-foreground max-w-sm sm:max-w-md mx-auto shadow-sm">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0 text-primary" />
              <div>
                This helps us recommend{" "}
                <strong className="font-semibold">scholarships available for your country</strong>.
              </div>
            </div>
          </div>
        </div>
      ),
      canContinue: () => data.country !== "",
    },
    {
      id: "gpa",
      title: "What's your Grade Point Average (GPA)?",
      description:
        "This helps us show the right universities and scholarships. If you're not sure, just click 'Skip for now'.",
      content: (
        <div className="space-y-8 sm:space-y-10">
          <div className="space-y-6 sm:space-y-8 max-w-lg mx-auto">
            <Label className="text-sm sm:text-base font-semibold text-foreground mb-2">
              Grade Point Average (GPA)
            </Label>
            <Input
              value={data.gpa}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData((p) => ({ ...p, gpa: e.target.value }))
              }
              placeholder={gpaPlaceholderForCountry(data.country)}
              className="h-12 sm:h-14 lg:h-16 text-sm sm:text-base lg:text-lg cursor-pointer w-full border-2 border-border hover:border-primary/50 focus:border-primary transition-colors bg-background"
            />
          </div>
          <div className="flex justify-center">
            <Button
              variant="outline"
              className="h-10 sm:h-11 lg:h-12 px-6 sm:px-8 lg:px-10 text-sm sm:text-base text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer border-2 border-border hover:border-primary/50 transition-colors"
              onClick={() => {
                setData((p) => ({ ...p, gpa: "" }));
                setStep(currentStep + 1);
              }}
            >
              Skip for now
            </Button>
          </div>
        </div>
      ),
      canContinue: () => true, // GPA is optional
    },
    {
      id: "intake",
      title: "When do you want to start your studies?",
      description: "We'll calculate deadlines and your roadmap",
      content: (
        <div className="space-y-8 sm:space-y-10">
          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 max-w-2xl mx-auto">
            <Button
              variant={data.intake === "fall-2025" ? "default" : "outline"}
              className={`flex items-center justify-center h-14 sm:h-16 lg:h-18 w-full sm:w-auto px-6 sm:px-8 lg:px-10 space-x-3 hover:scale-105 transition-all duration-200 cursor-pointer ${
                data.intake === "fall-2025" 
                  ? "bg-primary text-primary-foreground shadow-lg border-primary" 
                  : "border-2 border-border hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
              }`}
              onClick={() => setData((p) => ({ ...p, intake: "fall-2025" }))}
            >
              <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
              <div className="text-left">
                <div className="font-semibold text-sm sm:text-base lg:text-lg">
                  Fall 2025
                </div>
                <div className="text-xs sm:text-sm opacity-70">September/October</div>
              </div>
            </Button>
            <Button
              variant="ghost"
              className="flex items-center justify-center h-14 sm:h-16 lg:h-18 w-full sm:w-auto px-6 sm:px-8 lg:px-10 space-x-3 hover:scale-105 transition-all duration-200 cursor-pointer border-2 border-border hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
              onClick={() => {
                setData((p) => ({ ...p, intake: "" }));
                setStep(currentStep + 1);
              }}
            >
              <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6" />
              <div className="text-left">
                <div className="font-semibold text-sm sm:text-base lg:text-lg">
                  Not sure yet
                </div>
                <div className="text-xs sm:text-sm opacity-70">I need more time</div>
              </div>
            </Button>
          </div>
        </div>
      ),
      canContinue: () => data.intake !== "",
    },
    {
      id: "budget",
      title: "What's your study budget per year?",
      description:
        "Don't worry if it's limited — we'll suggest scholarships and low-cost programs.",
      content: (
        <div className="space-y-8 sm:space-y-10">
          <div className="text-center space-y-6 sm:space-y-8 max-w-lg mx-auto">
            <Label className="text-sm sm:text-base font-semibold block text-foreground mb-2">
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
                  onValueChange={(value: number[]) => {
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
              className="h-10 sm:h-11 lg:h-12 px-6 sm:px-8 lg:px-10 text-sm sm:text-base text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer border-2 border-border hover:border-primary/50 transition-colors"
              onClick={() => {
                setData((p) => ({ ...p, budget: "" }));
                setStep(currentStep + 1);
              }}
            >
              I don't know yet
            </Button>
          </div>
          <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-4 sm:p-5 text-xs sm:text-sm text-foreground max-w-sm sm:max-w-md mx-auto shadow-sm">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0 text-primary" />
              <div>
                Don't worry if your budget feels limited —{" "}
                <strong className="font-semibold">
                  AI will suggest scholarships and low-cost programs
                </strong>
                .
              </div>
            </div>
          </div>
        </div>
      ),
      canContinue: () => data.budget !== "",
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
              <div className="space-y-8 sm:space-y-10">
                <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 max-w-3xl mx-auto">
                  {FUNDING_OPTIONS.map((opt) => (
                    <Button
                      key={opt.v}
                      variant={data.funding === opt.v ? "default" : "outline"}
                      className={`flex items-center justify-center h-12 sm:h-14 lg:h-16 w-full sm:w-auto px-6 sm:px-8 lg:px-10 space-x-3 hover:scale-105 transition-all duration-200 cursor-pointer ${
                        data.funding === opt.v 
                          ? "bg-primary text-primary-foreground shadow-lg border-primary" 
                          : "border-2 border-border hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
                      }`}
                      onClick={() => setData((p) => ({ ...p, funding: opt.v }))}
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
              <div className="space-y-8 sm:space-y-10">
                <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 max-w-3xl mx-auto">
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
                      className={`flex flex-col items-center justify-center h-24 sm:h-28 lg:h-32 w-full sm:w-48 lg:w-56 p-5 lg:p-6 space-y-2 hover:scale-105 transition-all duration-200 cursor-pointer ${
                        data.studyBreak === opt.v 
                          ? "bg-primary text-primary-foreground shadow-lg border-primary" 
                          : "border-2 border-border hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
                      }`}
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
              <div className="space-y-8 sm:space-y-10">
                <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 max-w-4xl mx-auto">
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
                      className={`flex items-start justify-start h-auto w-full sm:w-80 lg:w-96 p-5 lg:p-6 space-x-4 hover:scale-105 transition-all duration-200 cursor-pointer ${
                        data.visaRefusal === opt.v 
                          ? "bg-primary text-primary-foreground shadow-lg border-primary" 
                          : "border-2 border-border hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
                      }`}
                      onClick={() =>
                        setData((p) => ({ ...p, visaRefusal: opt.v }))
                      }
                    >
                      <opt.icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div className="text-left flex-1 min-w-0">
                        <div className="font-medium text-sm leading-tight break-words">
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
                  <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-4 text-sm text-foreground shadow-sm">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                      <div>
                        <strong className="font-semibold">No problem.</strong> Our experts will help you
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
        "Based on your answers, we've created a personalized plan with exclusive benefits tailored for you.",
      content: (
        <div className="space-y-6 sm:space-y-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
              Congratulations!
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Based on your answers, we've created a personalized plan with
              exclusive benefits tailored just for you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
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
                className="flex items-start space-x-4 p-4 sm:p-5 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <benefit.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-sm sm:text-base">
                    {benefit.title}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {benefit.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      canContinue: () => true, // Final step is always available
    },
  ];
}
