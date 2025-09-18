"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, AlertCircle } from "lucide-react";
import {
  getUserStages,
  getCurrentStage,
  getNextSteps,
} from "@/lib/dashboard-utils";
import { useGamification } from "@/lib/gamification-context";
import type { User } from "@/lib/auth-context";

interface NextStepCardProps {
  user: User;
}

export function NextStepCard({ user }: NextStepCardProps) {
  const stages = getUserStages(user);
  const currentStage = getCurrentStage(stages);
  const nextSteps = getNextSteps(currentStage, user);
  const urgentSteps = nextSteps.filter((step) => step.urgent);
  const { completeTask, addPoints } = useGamification();

  const handleTaskComplete = (taskName: string) => {
    completeTask(taskName);
    addPoints(10, `Completed: ${taskName}`);
  };

  return (
    <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Calendar className="h-5 w-5 text-primary" />
          Next Steps: {currentStage.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {urgentSteps.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-orange-600">
                <AlertCircle className="h-4 w-4" />
                Urgent Tasks
              </div>
              {urgentSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-background rounded-lg border"
                >
                  <span className="text-sm font-medium text-foreground">
                    {step.task}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleTaskComplete(step.task)}
                  >
                    Start (+10 XP)
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {nextSteps.filter((step) => !step.urgent).length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">
                Other Tasks
              </div>
              {nextSteps
                .filter((step) => !step.urgent)
                .map((step, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-background/50 rounded-lg"
                  >
                    <span className="text-sm text-foreground">{step.task}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleTaskComplete(step.task)}
                    >
                      View (+5 XP)
                    </Button>
                  </div>
                ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
