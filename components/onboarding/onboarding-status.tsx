"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  useOnboardingData,
  useOnboardingUI,
} from "@/lib/stores/onboarding-store";
import { Trash2, Play } from "lucide-react";

export function OnboardingStatus() {
  const { data, currentStep, isCompleted, getFinalData } = useOnboardingData();
  const { setOpen, reset } = useOnboardingUI();

  const finalData = getFinalData();

  const handleContinue = () => {
    setOpen(true);
  };

  const handleReset = () => {
    reset();
  };

  const getStepName = (step: number) => {
    const steps = [
      "Study Goal",
      "Field of Study",
      "Destination",
      "Universities",
      "Country",
      "GPA",
      "Intake",
      "Budget",
      "Funding",
      "Study Break",
      "Visa History",
      "Complete",
    ];
    return steps[step] || "Unknown";
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Onboarding Status</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleContinue}
              className="flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              {isCompleted ? "Review" : "Continue"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="flex items-center gap-2 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span>{currentStep + 1} / 12 steps</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / 12) * 100}%` }}
            />
          </div>
          <div className="text-xs text-muted-foreground">
            Current: {getStepName(currentStep)}
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Status:</span>
          <Badge variant={isCompleted ? "default" : "secondary"}>
            {isCompleted ? "Completed" : "In Progress"}
          </Badge>
        </div>

        {/* Selected Data */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm">Selected Options:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Study Goal:</span>
                <span className="font-medium capitalize">
                  {data.studyGoal || "Not selected"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Field:</span>
                <span className="font-medium">
                  {data.fieldOfStudy || "Not selected"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Destination:</span>
                <span className="font-medium uppercase">
                  {data.destination || "Not selected"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Country:</span>
                <span className="font-medium">
                  {data.country || "Not selected"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Budget:</span>
                <span className="font-medium">
                  {data.budget || "Not selected"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Intake:</span>
                <span className="font-medium">
                  {data.intake || "Not selected"}
                </span>
              </div>
              {data.funding && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Funding:</span>
                  <span className="font-medium">{data.funding}</span>
                </div>
              )}
              {data.studyBreak && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Study Break:</span>
                  <span className="font-medium">{data.studyBreak}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Final Data Object */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Final Data Object:</h4>
          <div className="bg-muted/50 rounded-lg p-3 text-xs font-mono overflow-x-auto">
            <pre>{JSON.stringify(finalData, null, 2)}</pre>
          </div>
        </div>

        {/* Debug Info */}
        <details className="text-xs text-muted-foreground">
          <summary className="cursor-pointer hover:text-foreground">
            Debug Info (click to expand)
          </summary>
          <div className="mt-2 space-y-1">
            <div>Current Step: {currentStep}</div>
            <div>Is Completed: {isCompleted.toString()}</div>
            <div>Budget Slider: {JSON.stringify(data.budgetSlider || [])}</div>
            <div>Segment: {finalData.segment}</div>
          </div>
        </details>
      </CardContent>
    </Card>
  );
}
