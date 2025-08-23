"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Trophy,
  ChevronRight,
  Plus,
  Target,
  DollarSign,
  Plane,
  TrendingUp,
  Award,
  Globe,
  Briefcase,
} from "lucide-react"
import { AIAssistanceCard } from "@/components/ai/ai-assistance-card"
import { AchievementsGrid } from "@/components/gamification/achievements-grid"
import { StreakCounter } from "@/components/gamification/streak-counter"
import { LevelProgress } from "@/components/gamification/level-progress"
import { getUserStages, getCurrentStage } from "@/lib/dashboard-utils"
import type { User as UserType } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useAI } from "@/lib/ai-context"

interface DynamicSectionsProps {
  user: UserType
}

export function DynamicSections({ user }: DynamicSectionsProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { openChat } = useAI()

  const stages = getUserStages(user)
  const currentStage = getCurrentStage(stages)

  const getAIAssistanceForStage = (stageId: string) => {
    const assistanceConfig = {
      profile: {
        title: "AI Profile Builder",
        description: "Complete your profile with AI guidance",
        suggestions: [
          "Optimize my profile for US universities",
          "UK application requirements check",
          "Calculate my admission chances",
        ],
      },
      "school-selection": {
        title: "AI University Matcher",
        description: "Find perfect matches with success predictions",
        suggestions: [
          "Show me universities with 80%+ acceptance odds",
          "Compare US vs UK programs for my field",
          "Find generous scholarships for my profile",
        ],
      },
      application: {
        title: "AI Application Copilot",
        description: "Auto-fill applications and draft essays",
        suggestions: [
          "Auto-fill my Common App application",
          "Draft my personal statement for UK",
          "Generate professor outreach emails",
        ],
      },
      visa: {
        title: "AI Visa Coach",
        description: "Mock interviews and document verification",
        suggestions: ["Practice F-1 visa interview", "Scan my visa documents", "Latest visa policy updates"],
      },
      "pre-departure": {
        title: "AI Departure Assistant",
        description: "Complete pre-departure preparation",
        suggestions: [
          "Create my packing checklist",
          "Find accommodation near campus",
          "Connect with alumni in my city",
        ],
      },
    }

    return assistanceConfig[stageId as keyof typeof assistanceConfig]
  }

  const aiAssistance = getAIAssistanceForStage(currentStage.id)

  const sections = [
    {
      id: "gamification",
      title: "Your Progress",
      icon: Trophy,
      priority: 0,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StreakCounter />
            <LevelProgress />
          </div>
          <AchievementsGrid />
        </div>
      ),
      relevantStages: ["profile", "school-selection", "application", "visa", "pre-departure", "arrival"],
    },
    {
      id: "ai-copilot",
      title: "AI Copilot",
      icon: Target,
      priority: 1,
      content: aiAssistance ? (
        <AIAssistanceCard
          title={aiAssistance.title}
          description={aiAssistance.description}
          context={currentStage.id}
          suggestions={aiAssistance.suggestions}
        />
      ) : null,
      relevantStages: ["profile", "school-selection", "application", "visa", "pre-departure"],
    },
    {
      id: "discovery-exploration",
      title: "Discovery & Exploration",
      icon: Globe,
      priority: currentStage.id === "profile" ? 1 : 3,
      content: <DiscoverySection user={user} router={router} toast={toast} openChat={openChat} />,
      relevantStages: ["profile", "school-selection"],
    },
    {
      id: "applications-admissions",
      title: "Applications & Admissions",
      icon: FileText,
      priority: currentStage.id === "application" ? 1 : 3,
      content: <ApplicationsSection user={user} router={router} toast={toast} openChat={openChat} />,
      relevantStages: ["school-selection", "application"],
    },
    {
      id: "scholarships-funding",
      title: "Scholarships & Funding",
      icon: DollarSign,
      priority: 2,
      content: <ScholarshipsSection user={user} router={router} toast={toast} openChat={openChat} />,
      relevantStages: ["profile", "school-selection", "application"],
    },
    {
      id: "visa-predeparture",
      title: "Visa & Pre-Departure",
      icon: Plane,
      priority: currentStage.id === "visa" || currentStage.id === "pre-departure" ? 1 : 4,
      content: (
        <VisaSection user={user} currentStage={currentStage} router={router} toast={toast} openChat={openChat} />
      ),
      relevantStages: ["application", "visa", "pre-departure"],
    },
    {
      id: "career-launch",
      title: "Career Launch",
      icon: Briefcase,
      priority: 4,
      content: <CareerLaunchSection user={user} router={router} toast={toast} openChat={openChat} />,
      relevantStages: ["pre-departure", "arrival"],
    },
    {
      id: "competitive-edge",
      title: "Competitive Edge",
      icon: TrendingUp,
      priority: 2,
      content: <CompetitiveEdgeSection user={user} router={router} toast={toast} openChat={openChat} />,
      relevantStages: ["school-selection", "application"],
    },
  ]

  // Filter and sort sections based on relevance and priority
  const relevantSections = sections
    .filter((section) => section.content && section.relevantStages.includes(currentStage.id))
    .sort((a, b) => a.priority - b.priority)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {relevantSections.map((section) =>
        section.id === "gamification" ? (
          <div key={section.id} className="lg:col-span-2 xl:col-span-3">
            {section.content}
          </div>
        ) : section.id === "ai-copilot" ? (
          <div key={section.id} className="lg:col-span-2 xl:col-span-1">
            {section.content}
          </div>
        ) : (
          <Card key={section.id} className="bg-card shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <section.icon className="h-5 w-5 text-primary" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>{section.content}</CardContent>
          </Card>
        ),
      )}
    </div>
  )
}

function DiscoverySection({
  user,
  router,
  toast,
  openChat,
}: { user: UserType; router: any; toast: any; openChat: any }) {
  const recommendations = [
    { title: "Computer Science Programs", match: "95%", schools: 12 },
    { title: "Engineering Programs", match: "87%", schools: 8 },
    { title: "Business Programs", match: "78%", schools: 15 },
  ]

  const handleExplore = (program: string) => {
    router.push(`/universities?program=${encodeURIComponent(program.toLowerCase())}`)
    toast({
      title: "Exploring Programs",
      description: `Finding ${program} matches for you...`,
    })
  }

  const handleGetMatches = () => {
    router.push("/universities")
    toast({
      title: "University Discovery",
      description: "Opening university search and discovery...",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">AI Recommendations</span>
        <Badge variant="outline">Updated Today</Badge>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, index) => (
          <div key={index} className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm">{rec.title}</span>
              <Badge variant="secondary">{rec.match} match</Badge>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{rec.schools} programs found</span>
              <Button size="sm" variant="ghost" className="h-6 px-2" onClick={() => handleExplore(rec.title)}>
                Explore
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button className="w-full" onClick={handleGetMatches}>
        <Target className="h-4 w-4 mr-2" />
        Search Universities
      </Button>
    </div>
  )
}

function ApplicationsSection({
  user,
  router,
  toast,
  openChat,
}: { user: UserType; router: any; toast: any; openChat: any }) {
  const applications = [
    { school: "Stanford University", status: "draft", deadline: "Dec 1, 2024", progress: 60, aiHelp: true },
    { school: "MIT", status: "in-review", deadline: "Jan 15, 2025", progress: 100, aiHelp: false },
    { school: "UC Berkeley", status: "not-started", deadline: "Nov 30, 2024", progress: 0, aiHelp: true },
  ]

  const handleAddApp = () => {
    router.push("/applications")
    toast({
      title: "Add Application",
      description: "Opening application manager...",
    })
  }

  const handleAIAutoFill = () => {
    openChat("application-help", "Help me auto-fill my university applications")
    toast({
      title: "AI Auto-Fill Ready",
      description: "AI will help you complete your applications faster!",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Application Tracker</span>
        <Badge variant="outline">{applications.length} Active</Badge>
      </div>

      <div className="space-y-3">
        {applications.map((app, index) => (
          <div key={index} className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm">{app.school}</span>
              <div className="flex items-center gap-2">
                {app.aiHelp && (
                  <Badge variant="secondary" className="text-xs">
                    AI Ready
                  </Badge>
                )}
                <Badge
                  variant={app.status === "draft" ? "secondary" : app.status === "in-review" ? "default" : "outline"}
                  className="text-xs"
                >
                  {app.status}
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span>{app.progress}%</span>
              </div>
              <Progress value={app.progress} className="h-1" />
              <span className="text-xs text-muted-foreground">Due: {app.deadline}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" className="bg-transparent" onClick={handleAddApp}>
          <Plus className="h-4 w-4 mr-2" />
          Add App
        </Button>
        <Button onClick={handleAIAutoFill}>AI Auto-Fill</Button>
      </div>
    </div>
  )
}

function ScholarshipsSection({
  user,
  router,
  toast,
  openChat,
}: { user: UserType; router: any; toast: any; openChat: any }) {
  const scholarships = [
    { name: "Merit Scholarship", amount: "$15,000", match: "High", deadline: "Dec 15" },
    { name: "International Student Grant", amount: "$8,000", match: "Medium", deadline: "Jan 30" },
    { name: "STEM Excellence Award", amount: "$20,000", match: "High", deadline: "Feb 1" },
  ]

  const handleFindScholarships = () => {
    openChat("scholarship-search", "Find scholarships that match my profile and help me apply")
    toast({
      title: "AI Scholarship Search",
      description: "Finding personalized scholarship opportunities for you...",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">AI-Matched Scholarships</span>
        <Badge variant="outline">3 New</Badge>
      </div>

      <div className="space-y-3">
        {scholarships.map((scholarship, index) => (
          <div key={index} className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-sm">{scholarship.name}</span>
              <Badge variant={scholarship.match === "High" ? "default" : "secondary"} className="text-xs">
                {scholarship.match}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-semibold text-green-600">{scholarship.amount}</span>
              <span>Due: {scholarship.deadline}</span>
            </div>
          </div>
        ))}
      </div>

      <Button className="w-full" onClick={handleFindScholarships}>
        <Award className="h-4 w-4 mr-2" />
        Find More Scholarships
      </Button>
    </div>
  )
}

function VisaSection({
  user,
  currentStage,
  router,
  toast,
  openChat,
}: { user: UserType; currentStage: any; router: any; toast: any; openChat: any }) {
  const visaItems = {
    application: [
      { title: "Document Checklist", type: "checklist", status: "pending" },
      { title: "Financial Proof Guide", type: "guide", status: "completed" },
    ],
    visa: [
      { title: "Mock Interview Practice", type: "interactive", status: "pending" },
      { title: "Document Scanner", type: "tool", status: "available" },
      { title: "Visa Policy Updates", type: "alert", status: "new" },
    ],
    "pre-departure": [
      { title: "Travel Preparation", type: "checklist", status: "pending" },
      { title: "Airport Guide", type: "guide", status: "available" },
    ],
  }

  const items = visaItems[currentStage.id as keyof typeof visaItems] || []

  const handleVisaItem = (item: any) => {
    if (item.type === "interactive") {
      openChat("visa-interview", "Start a mock F-1 visa interview practice session")
      toast({
        title: "Mock Interview Starting",
        description: "AI will conduct a practice visa interview with you!",
      })
    } else if (item.type === "tool") {
      toast({
        title: "Document Scanner",
        description: "AI will help verify your visa documents for completeness.",
      })
      openChat("document-scan", "Help me scan and verify my visa documents")
    } else {
      toast({
        title: item.title,
        description: "Opening visa assistance tool...",
      })
    }
  }

  const handleStartVisaPrep = () => {
    openChat("visa-prep", "Guide me through the complete visa preparation process")
    toast({
      title: "Visa Preparation Started",
      description: "AI will guide you through every step of the visa process!",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Visa Assistance</span>
        <Badge variant="outline">AI Powered</Badge>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{item.title}</span>
              {item.status === "new" && (
                <Badge variant="destructive" className="text-xs">
                  New
                </Badge>
              )}
            </div>
            <Button size="sm" variant="ghost" onClick={() => handleVisaItem(item)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button className="w-full" onClick={handleStartVisaPrep}>
        <Plane className="h-4 w-4 mr-2" />
        Start Visa Prep
      </Button>
    </div>
  )
}

function CareerLaunchSection({
  user,
  router,
  toast,
  openChat,
}: { user: UserType; router: any; toast: any; openChat: any }) {
  const careerItems = [
    { title: "Job Sponsorship Tracker", companies: 45, type: "tracker" },
    { title: "Alumni Network", connections: 12, type: "network" },
    { title: "Interview Prep", sessions: 3, type: "prep" },
  ]

  const handleCareerItem = (item: any) => {
    if (item.type === "tracker") {
      openChat("job-sponsorship", "Show me companies that sponsor international students in my field")
    } else if (item.type === "network") {
      openChat("alumni-network", "Connect me with alumni from my target universities")
    } else if (item.type === "prep") {
      openChat("interview-prep", "Help me prepare for job interviews in the US/UK")
    }

    toast({
      title: item.title,
      description: "AI is preparing career assistance for you...",
    })
  }

  const handleExploreCareer = () => {
    openChat("career-guidance", "Help me plan my career path after graduation")
    toast({
      title: "Career Planning",
      description: "AI will help you plan your post-graduation career strategy!",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Career Support</span>
        <Badge variant="outline">Beta</Badge>
      </div>

      <div className="space-y-2">
        {careerItems.map((item, index) => (
          <div
            key={index}
            className="p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted/70 transition-colors"
            onClick={() => handleCareerItem(item)}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-sm">{item.title}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="text-xs text-muted-foreground">
              {item.type === "tracker" && `${item.companies} sponsor companies`}
              {item.type === "network" && `${item.connections} connections available`}
              {item.type === "prep" && `${item.sessions} sessions completed`}
            </span>
          </div>
        ))}
      </div>

      <Button className="w-full" onClick={handleExploreCareer}>
        <Briefcase className="h-4 w-4 mr-2" />
        Explore Career Tools
      </Button>
    </div>
  )
}

function CompetitiveEdgeSection({
  user,
  router,
  toast,
  openChat,
}: { user: UserType; router: any; toast: any; openChat: any }) {
  const edgeTools = [
    { title: "Acceptance Odds Calculator", description: "AI predicts your chances", status: "ready" },
    { title: "Profile Strength Analyzer", description: "Compare with successful applicants", status: "ready" },
    { title: "Rejection Risk Assessment", description: "Identify weak points", status: "premium" },
  ]

  const handleAnalyzeProfile = () => {
    openChat("profile-analysis", "Analyze my profile strength and calculate my acceptance odds for target universities")
    toast({
      title: "Profile Analysis Starting",
      description: "AI is analyzing your competitive position...",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Competitive Analysis</span>
        <Badge variant="outline">AI Powered</Badge>
      </div>

      <div className="space-y-2">
        {edgeTools.map((tool, index) => (
          <div key={index} className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-sm">{tool.title}</span>
              {tool.status === "premium" && (
                <Badge variant="secondary" className="text-xs">
                  Pro
                </Badge>
              )}
            </div>
            <span className="text-xs text-muted-foreground">{tool.description}</span>
          </div>
        ))}
      </div>

      <Button className="w-full" onClick={handleAnalyzeProfile}>
        <TrendingUp className="h-4 w-4 mr-2" />
        Analyze My Profile
      </Button>
    </div>
  )
}
