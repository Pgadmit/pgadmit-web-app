"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, AlertTriangle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const DEADLINES = [
  {
    university: "University of Cambridge",
    program: "Engineering",
    deadline: "October 15, 2024",
    daysRemaining: 12,
    status: "urgent",
    applicationProgress: 75,
  },
  {
    university: "Stanford University",
    program: "Computer Science",
    deadline: "January 2, 2025",
    daysRemaining: 45,
    status: "upcoming",
    applicationProgress: 30,
  },
  {
    university: "MIT",
    program: "Mechanical Engineering",
    deadline: "January 1, 2025",
    daysRemaining: 44,
    status: "upcoming",
    applicationProgress: 0,
  },
  {
    university: "Harvard University",
    program: "Business Administration",
    deadline: "January 1, 2025",
    daysRemaining: 44,
    status: "upcoming",
    applicationProgress: 60,
  },
]

export function DeadlineTracker() {
  const urgentDeadlines = DEADLINES.filter((d) => d.daysRemaining <= 30)
  const upcomingDeadlines = DEADLINES.filter((d) => d.daysRemaining > 30)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Application Deadlines</h2>
        <Badge variant="destructive">{urgentDeadlines.length} urgent</Badge>
      </div>

      {/* Urgent Deadlines */}
      {urgentDeadlines.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h3 className="text-lg font-semibold text-red-500">Urgent Deadlines</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {urgentDeadlines.map((deadline, index) => (
              <Card key={index} className="border-red-200 bg-red-50/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{deadline.university}</CardTitle>
                  <p className="text-sm text-muted-foreground">{deadline.program}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium text-red-500">
                      {deadline.deadline} ({deadline.daysRemaining} days left)
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Application Progress</span>
                      <span>{deadline.applicationProgress}%</span>
                    </div>
                    <Progress value={deadline.applicationProgress} className="h-2" />
                  </div>

                  <Button className="w-full" variant="destructive">
                    Continue Application
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Deadlines */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-orange-500" />
          <h3 className="text-lg font-semibold">Upcoming Deadlines</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingDeadlines.map((deadline, index) => (
            <Card key={index} className="bg-card shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{deadline.university}</CardTitle>
                <p className="text-sm text-muted-foreground">{deadline.program}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">
                    {deadline.deadline} ({deadline.daysRemaining} days left)
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Application Progress</span>
                    <span>{deadline.applicationProgress}%</span>
                  </div>
                  <Progress value={deadline.applicationProgress} className="h-2" />
                </div>

                <Button className="w-full" variant={deadline.applicationProgress > 0 ? "default" : "outline"}>
                  {deadline.applicationProgress > 0 ? "Continue Application" : "Start Application"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
