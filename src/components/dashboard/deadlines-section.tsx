"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock, AlertCircle } from "lucide-react";

export function DeadlinesSection() {
  const deadlines = [
    {
      title: "Stanford Application",
      date: "Dec 15, 2024",
      daysLeft: "3 days",
      priority: "high",
      icon: AlertCircle,
    },
    {
      title: "TOEFL Registration",
      date: "Dec 20, 2024",
      daysLeft: "8 days",
      priority: "medium",
      icon: Calendar,
    },
    {
      title: "Scholarship Essay",
      date: "Jan 5, 2025",
      daysLeft: "24 days",
      priority: "low",
      icon: Clock,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="mb-6 md:mb-8">
      <CardHeader className="flex flex-row items-center justify-between p-4 md:p-6">
        <CardTitle className="text-base md:text-lg font-semibold">
          Upcoming Deadlines
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-700 text-xs md:text-sm"
        >
          View All
          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0">
        <p className="text-xs md:text-sm text-gray-600 mb-4">
          Don't miss important dates
        </p>
        <div className="space-y-3 md:space-y-4">
          {deadlines.map((deadline, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 md:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-2 md:space-x-3 flex-1 min-w-0">
                <div className="p-1.5 md:p-2 bg-gray-100 rounded-lg flex-shrink-0">
                  <deadline.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm md:text-base truncate">
                    {deadline.title}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-600">
                    {deadline.date}
                  </p>
                </div>
              </div>
              <Badge
                className={`${getPriorityColor(
                  deadline.priority
                )} text-xs flex-shrink-0`}
              >
                {deadline.daysLeft}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
