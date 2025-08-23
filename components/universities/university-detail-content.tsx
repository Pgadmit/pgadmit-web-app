"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  MapPin,
  Users,
  Calendar,
  DollarSign,
  Award,
  Home,
  BookOpen,
  ArrowLeft,
  ExternalLink,
  Clock,
  TrendingUp,
  Globe,
  Bookmark,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface University {
  id: string
  name: string
  location: string
  founded: number
  type: string
  ranking: {
    global: number
    national: number
    subject: Record<string, number>
  }
  stats: {
    students: number
    internationalStudents: string
    facultyRatio: string
    acceptanceRate: string
    graduationRate: string
  }
  tuition: {
    undergraduate: number
    graduate: number
    currency: string
  }
  deadlines: {
    earlyAction: string
    regularDecision: string
    financialAid: string
  }
  programs: Array<{
    name: string
    level: string
    duration: string
  }>
  requirements: {
    undergraduate: Record<string, string>
    graduate: Record<string, string>
  }
  scholarships: Array<{
    name: string
    amount: string
    eligibility: string
  }>
  campusLife: {
    housing: string
    diningPlans: string
    clubs: string
    sports: string
  }
  images: string[]
  description: string
  isBookmarked: boolean
}

interface UniversityDetailContentProps {
  university: University
}

export function UniversityDetailContent({ university }: UniversityDetailContentProps) {
  const [isBookmarked, setIsBookmarked] = useState(university.isBookmarked)
  const [applicationStarted, setApplicationStarted] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: `${university.name} ${isBookmarked ? "removed from" : "added to"} your saved universities`,
    })
  }

  const startApplication = () => {
    setApplicationStarted(true)
    toast({
      title: "Application Started",
      description: `Started application process for ${university.name}`,
    })
    // In real app, this would navigate to application form
  }

  const getDaysUntilDeadline = (deadline: string) => {
    const deadlineDate = new Date(deadline)
    const today = new Date()
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const regularDeadlineDays = getDaysUntilDeadline(university.deadlines.regularDecision)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={() => router.push("/universities")} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Search
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* University Info */}
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{university.name}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4" />
                    <span>{university.location}</span>
                    <span>•</span>
                    <span>Founded {university.founded}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">#{university.ranking.global} Global</Badge>
                    <Badge variant="outline">#{university.ranking.national} National</Badge>
                    <Badge variant="outline">{university.type}</Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleBookmark}
                  className={isBookmarked ? "text-red-500" : "text-muted-foreground"}
                >
                  {isBookmarked ? <Heart className="h-5 w-5 fill-current" /> : <Bookmark className="h-5 w-5" />}
                </Button>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">{university.description}</p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{university.stats.students.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Students</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Globe className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{university.stats.internationalStudents}</div>
                  <div className="text-xs text-muted-foreground">International</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <BookOpen className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{university.stats.facultyRatio}</div>
                  <div className="text-xs text-muted-foreground">Faculty Ratio</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <TrendingUp className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{university.stats.acceptanceRate}</div>
                  <div className="text-xs text-muted-foreground">Acceptance Rate</div>
                </div>
              </div>
            </div>

            {/* Action Panel */}
            <div className="space-y-4">
              <Card className="bg-card shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Application Deadline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium text-red-500">{university.deadlines.regularDecision}</span>
                  </div>
                  <div className="text-sm">
                    <span className={`font-medium ${regularDeadlineDays <= 30 ? "text-red-500" : "text-orange-500"}`}>
                      {regularDeadlineDays} days remaining
                    </span>
                  </div>
                  <Progress value={Math.max(0, 100 - (regularDeadlineDays / 365) * 100)} className="h-2" />
                </CardContent>
              </Card>

              <Card className="bg-card shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Tuition & Fees</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Undergraduate</span>
                    <span className="font-semibold">${university.tuition.undergraduate.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Graduate</span>
                    <span className="font-semibold">${university.tuition.graduate.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Per year</div>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Button className="w-full" onClick={startApplication} disabled={applicationStarted}>
                  {applicationStarted ? "Application Started" : "Start Application"}
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Campus Visit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information Tabs */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Tabs defaultValue="programs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="admissions">Admissions</TabsTrigger>
            <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
            <TabsTrigger value="campus">Campus Life</TabsTrigger>
            <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="programs">
            <Card>
              <CardHeader>
                <CardTitle>Academic Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {university.programs.map((program, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">{program.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{program.level}</span>
                        <span>•</span>
                        <span>{program.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admissions">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Undergraduate Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(university.requirements.undergraduate).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                      <span className="font-semibold">{value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Graduate Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(university.requirements.graduate).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                      <span className="font-semibold">{value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scholarships">
            <Card>
              <CardHeader>
                <CardTitle>Available Scholarships</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {university.scholarships.map((scholarship, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{scholarship.name}</h4>
                        <Badge variant="secondary">{scholarship.eligibility}</Badge>
                      </div>
                      <div className="text-lg font-bold text-green-600">{scholarship.amount}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campus">
            <Card>
              <CardHeader>
                <CardTitle>Campus Life</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Home className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-semibold">Housing</div>
                        <div className="text-sm text-muted-foreground">{university.campusLife.housing}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-semibold">Dining</div>
                        <div className="text-sm text-muted-foreground">{university.campusLife.diningPlans}</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-semibold">Student Organizations</div>
                        <div className="text-sm text-muted-foreground">{university.campusLife.clubs}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-semibold">Athletics</div>
                        <div className="text-sm text-muted-foreground">{university.campusLife.sports}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deadlines">
            <Card>
              <CardHeader>
                <CardTitle>Important Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-orange-500" />
                      <div>
                        <div className="font-semibold">Early Action</div>
                        <div className="text-sm text-muted-foreground">Non-binding early admission</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{university.deadlines.earlyAction}</div>
                      <div className="text-sm text-muted-foreground">
                        {getDaysUntilDeadline(university.deadlines.earlyAction)} days left
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-red-500" />
                      <div>
                        <div className="font-semibold">Regular Decision</div>
                        <div className="text-sm text-muted-foreground">Standard admission deadline</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-red-500">{university.deadlines.regularDecision}</div>
                      <div className="text-sm text-red-500 font-medium">{regularDeadlineDays} days left</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="font-semibold">Financial Aid</div>
                        <div className="text-sm text-muted-foreground">FAFSA and aid applications</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{university.deadlines.financialAid}</div>
                      <div className="text-sm text-muted-foreground">
                        {getDaysUntilDeadline(university.deadlines.financialAid)} days left
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Student Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">AO</span>
                      </div>
                      <div>
                        <div className="font-semibold">Adaora O.</div>
                        <div className="text-sm text-muted-foreground">Computer Science, Class of 2024</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "Amazing research opportunities and incredible professors. The campus is beautiful and the student
                      community is very supportive. Highly recommend for international students!"
                    </p>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">RP</span>
                      </div>
                      <div>
                        <div className="font-semibold">Raj P.</div>
                        <div className="text-sm text-muted-foreground">Engineering, Class of 2023</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "The academic rigor is intense but rewarding. Great networking opportunities and career services.
                      The financial aid made it possible for me to attend."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
