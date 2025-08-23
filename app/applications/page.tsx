"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, Clock, CheckCircle, AlertCircle } from "lucide-react"

export default function ApplicationsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) return null

  const applications = [
    {
      id: 1,
      university: "Harvard University",
      program: "Computer Science",
      status: "in-progress",
      deadline: "2024-01-15",
      progress: 75,
    },
    {
      id: 2,
      university: "Stanford University",
      program: "Engineering",
      status: "draft",
      deadline: "2024-02-01",
      progress: 30,
    },
    {
      id: 3,
      university: "MIT",
      program: "Computer Science",
      status: "submitted",
      deadline: "2024-01-01",
      progress: 100,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "draft":
        return <AlertCircle className="h-4 w-4 text-gray-500" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">My Applications</h1>
          </div>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            New Application
          </Button>
        </div>

        <div className="grid gap-6">
          {applications.map((app) => (
            <Card key={app.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {getStatusIcon(app.status)}
                    {app.university}
                  </CardTitle>
                  <Badge className={getStatusColor(app.status)}>{app.status.replace("-", " ")}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Program</label>
                    <p>{app.program}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Deadline</label>
                    <p>{new Date(app.deadline).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Progress</label>
                    <p>{app.progress}% Complete</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {app.status !== "submitted" && <Button size="sm">Continue Application</Button>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
