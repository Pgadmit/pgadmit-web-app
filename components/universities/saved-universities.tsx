"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Calendar, ExternalLink, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

const SAVED_UNIVERSITIES = [
  {
    id: "stanford",
    name: "Stanford University",
    location: "Stanford, CA, USA",
    tuition: "$56,000",
    applicationDeadline: "January 2, 2025",
    daysUntilDeadline: 45,
    matchPercentage: 92,
    status: "Application Started",
  },
  {
    id: "mit",
    name: "MIT",
    location: "Cambridge, MA, USA",
    tuition: "$53,000",
    applicationDeadline: "January 1, 2025",
    daysUntilDeadline: 44,
    matchPercentage: 88,
    status: "Not Started",
  },
]

export function SavedUniversities() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Saved Universities</h2>
        <Badge variant="outline">{SAVED_UNIVERSITIES.length} saved</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SAVED_UNIVERSITIES.map((university) => (
          <Card key={university.id} className="bg-card shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-bold mb-1">{university.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{university.location}</p>
                </div>
                <div className="flex gap-1">
                  <Heart className="h-4 w-4 text-red-500 fill-current" />
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {university.matchPercentage}% match
                </Badge>
                <Badge variant={university.status === "Application Started" ? "default" : "secondary"}>
                  {university.status}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tuition:</span>
                  <span className="font-semibold">{university.tuition}</span>
                </div>

                <div className="flex items-center gap-1 text-sm">
                  <Calendar className="h-3 w-3 text-red-500" />
                  <span className="text-red-500 font-medium">Deadline: {university.applicationDeadline}</span>
                </div>

                <div className="text-sm">
                  <span
                    className={`font-medium ${university.daysUntilDeadline <= 30 ? "text-red-500" : "text-orange-500"}`}
                  >
                    {university.daysUntilDeadline} days remaining
                  </span>
                </div>
              </div>

              <Button className="w-full" onClick={() => router.push(`/universities/${university.id}`)}>
                View Details
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
