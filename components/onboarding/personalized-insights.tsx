"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sparkles, ArrowRight, GraduationCap, DollarSign, MapPin, Target, AlertCircle, TrendingUp } from "lucide-react"

interface OnboardingData {
  country: string
  fieldOfStudy: string
  budget: string
  currentEducation: string
  gpa: string
  testScores: string
  preferredCountries: string[]
  careerGoals: string
  priorities: string[]
  challenges: string[]
  motivation: string
}

interface PersonalizedInsightsProps {
  isOpen: boolean
  onClose: () => void
  userData: OnboardingData
}

interface Insight {
  icon: React.ReactNode
  title: string
  description: string
  recommendations: string[]
  priority: "high" | "medium" | "low"
}

export function PersonalizedInsights({ isOpen, onClose, userData }: PersonalizedInsightsProps) {
  const [currentInsight, setCurrentInsight] = useState(0)

  const generateInsights = (data: OnboardingData): Insight[] => {
    const insights: Insight[] = []

    // Budget Analysis
    const budgetInsight: Insight = {
      icon: <DollarSign className="h-5 w-5" />,
      title: "Budget Optimization",
      description: `Based on your ${data.budget} budget, here's what we recommend:`,
      recommendations: [],
      priority: "high",
    }

    if (data.budget === "under-20000") {
      budgetInsight.recommendations = [
        "Focus on countries with lower living costs like Germany or Netherlands",
        "Apply for merit-based scholarships early",
        "Consider community colleges for first 2 years in the US",
        "Look into work-study programs",
      ]
    } else if (data.budget === "20000-40000") {
      budgetInsight.recommendations = [
        "UK universities offer great value in this range",
        "Apply for partial scholarships to reduce costs",
        "Consider smaller cities for lower living expenses",
        "Look into graduate assistantships",
      ]
    } else {
      budgetInsight.recommendations = [
        "You have access to top-tier universities",
        "Consider Ivy League and Russell Group universities",
        "Focus on program quality over cost savings",
        "Explore research opportunities and internships",
      ]
    }

    insights.push(budgetInsight)

    // Academic Strength Analysis
    const academicInsight: Insight = {
      icon: <GraduationCap className="h-5 w-5" />,
      title: "Academic Profile Strength",
      description: "Your academic background analysis:",
      recommendations: [],
      priority: "high",
    }

    if (data.currentEducation === "high-school") {
      academicInsight.recommendations = [
        "Focus on standardized test preparation (SAT/ACT)",
        "Build a strong extracurricular profile",
        "Consider foundation programs if needed",
        "Start building your personal statement early",
      ]
    } else if (data.currentEducation === "bachelors-degree") {
      academicInsight.recommendations = [
        "Prepare for GRE/GMAT based on your field",
        "Gain relevant work experience",
        "Secure strong letters of recommendation",
        "Research thesis or capstone projects",
      ]
    }

    insights.push(academicInsight)

    // Country-Specific Guidance
    if (data.preferredCountries.length > 0) {
      const countryInsight: Insight = {
        icon: <MapPin className="h-5 w-5" />,
        title: "Destination Strategy",
        description: "Tailored advice for your preferred countries:",
        recommendations: [],
        priority: "medium",
      }

      if (data.preferredCountries.includes("united-states")) {
        countryInsight.recommendations.push("Apply to 8-12 universities for better chances")
        countryInsight.recommendations.push("Focus on STEM programs for better visa prospects")
      }
      if (data.preferredCountries.includes("united-kingdom")) {
        countryInsight.recommendations.push("Apply early for September intake")
        countryInsight.recommendations.push("Consider 1-year master's programs for cost efficiency")
      }

      insights.push(countryInsight)
    }

    // Challenge-Based Support
    if (data.challenges.length > 0) {
      const challengeInsight: Insight = {
        icon: <AlertCircle className="h-5 w-5" />,
        title: "Overcoming Your Concerns",
        description: "Personalized support for your main concerns:",
        recommendations: [],
        priority: "high",
      }

      if (data.challenges.includes("financial-costs")) {
        challengeInsight.recommendations.push("Set up scholarship alerts for your field")
        challengeInsight.recommendations.push("Consider part-time work opportunities")
      }
      if (data.challenges.includes("visa-process")) {
        challengeInsight.recommendations.push("Start visa preparation 6 months early")
        challengeInsight.recommendations.push("Use our AI visa coach for mock interviews")
      }
      if (data.challenges.includes("cultural-adjustment")) {
        challengeInsight.recommendations.push("Connect with student communities from your country")
        challengeInsight.recommendations.push("Take cultural orientation courses")
      }

      insights.push(challengeInsight)
    }

    // Career Goals Alignment
    if (data.careerGoals) {
      const careerInsight: Insight = {
        icon: <Target className="h-5 w-5" />,
        title: "Career Path Optimization",
        description: "Universities and programs aligned with your goals:",
        recommendations: [
          "Focus on universities with strong industry connections",
          "Look for programs with internship opportunities",
          "Consider co-op programs for practical experience",
          "Network with alumni in your target field",
        ],
        priority: "medium",
      }

      insights.push(careerInsight)
    }

    return insights
  }

  const insights = generateInsights(userData)
  const progress = ((currentInsight + 1) / insights.length) * 100

  const handleNext = () => {
    if (currentInsight < insights.length - 1) {
      setCurrentInsight((prev) => prev + 1)
    } else {
      onClose()
    }
  }

  const handlePrevious = () => {
    if (currentInsight > 0) {
      setCurrentInsight((prev) => prev - 1)
    }
  }

  if (!isOpen) return null

  const currentInsightData = insights[currentInsight]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium text-primary">AI Insights</span>
          </div>
          <CardTitle className="text-2xl font-bold">Your Personalized Guidance</CardTitle>
          <p className="text-muted-foreground">
            Based on your profile, here are tailored recommendations for your study abroad journey
          </p>

          <div className="mt-4">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Insight {currentInsight + 1} of {insights.length}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Current Insight */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-full ${
                  currentInsightData.priority === "high"
                    ? "bg-red-100 text-red-600"
                    : currentInsightData.priority === "medium"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                }`}
              >
                {currentInsightData.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{currentInsightData.title}</h3>
                <Badge
                  variant={
                    currentInsightData.priority === "high"
                      ? "destructive"
                      : currentInsightData.priority === "medium"
                        ? "default"
                        : "secondary"
                  }
                >
                  {currentInsightData.priority} priority
                </Badge>
              </div>
            </div>

            <p className="text-muted-foreground">{currentInsightData.description}</p>

            <div className="space-y-3">
              {currentInsightData.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="bg-primary/10 rounded-full p-1 flex-shrink-0 mt-0.5">
                    <TrendingUp className="h-3 w-3 text-primary" />
                  </div>
                  <p className="text-sm">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handlePrevious} disabled={currentInsight === 0}>
              Previous
            </Button>

            <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
              {currentInsight === insights.length - 1 ? (
                <>
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  Next Insight
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          {/* Insight Overview */}
          <div className="flex justify-center gap-2 pt-2">
            {insights.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentInsight ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
