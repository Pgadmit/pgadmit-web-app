"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Circle, Clock } from "lucide-react";
import { getUserStages } from "@/lib/dashboard-utils";
import type { User } from "@/lib/auth-context";

interface ProgressTimelineProps {
  user: User;
}

export function ProgressTimeline({ user }: ProgressTimelineProps) {
  const stages = getUserStages(user);
  const completedStages = stages.filter(
    (stage) => stage.status === "completed"
  ).length;
  const progressPercentage = (completedStages / stages.length) * 100;

  return (
    <Card className="bg-card shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">
            Your Journey Progress
          </h2>
          <span className="text-sm text-muted-foreground">
            {completedStages} of {stages.length} stages completed
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-6">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                {stage.status === "completed" ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : stage.status === "in-progress" ? (
                  <Clock className="h-6 w-6 text-primary" />
                ) : (
                  <Circle className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className={`font-semibold ${
                    stage.status === "completed"
                      ? "text-green-600"
                      : stage.status === "in-progress"
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {stage.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {stage.description}
                </p>
              </div>
              {stage.status === "in-progress" && (
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    Current
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
