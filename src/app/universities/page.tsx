"use client"

import { useAuth } from "@/features/auth"
import { useRouter } from "next/navigation"
import { UniversitySearch } from "@/components/universities/university-search"
import { UniversityGrid } from "@/components/universities/university-grid"
import { SavedUniversities } from "@/components/universities/saved-universities"
import { DeadlineTracker } from "@/components/universities/deadline-tracker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProtectedRoute } from "@/features/auth"

export default function UniversitiesPage() {
  const { user } = useAuth()
  const router = useRouter()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">University Discovery</h1>
          <p className="text-muted-foreground">Find, bookmark, and track your dream universities</p>
        </div>

        <Tabs defaultValue="search" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="search">Search & Discover</TabsTrigger>
            <TabsTrigger value="saved">Saved Universities</TabsTrigger>
            <TabsTrigger value="deadlines">Application Deadlines</TabsTrigger>
            <TabsTrigger value="matches">AI Matches</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            <UniversitySearch />
            <UniversityGrid />
          </TabsContent>

          <TabsContent value="saved">
            <SavedUniversities />
          </TabsContent>

          <TabsContent value="deadlines">
            <DeadlineTracker />
          </TabsContent>

          <TabsContent value="matches">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-4">AI University Matches</h3>
              <p className="text-muted-foreground mb-6">
                Get personalized university recommendations based on your profile
              </p>
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold">
                Generate AI Matches
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      </div>
    </ProtectedRoute>
  )
}
