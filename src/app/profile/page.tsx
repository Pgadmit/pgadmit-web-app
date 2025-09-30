"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, User, GraduationCap } from "lucide-react"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function ProfilePage() {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) return null

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">My Profile</h1>
          </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-lg">{user.name || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-lg">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Country</label>
                  <p className="text-lg">{user.country || 'Not specified'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Profile Status</label>
                  <p className="text-lg">
                    {user.profileComplete ? (
                      <span className="text-green-600">✓ Complete</span>
                    ) : (
                      <span className="text-orange-600">⚠ Incomplete</span>
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {user.profileData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Academic Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Field of Study</label>
                    <p className="text-lg capitalize">{user.profileData.fieldOfStudy?.replace("-", " ")}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Budget Range</label>
                    <p className="text-lg">{user.profileData.budget}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Current Education</label>
                    <p className="text-lg">{user.profileData.currentEducation}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">GPA</label>
                    <p className="text-lg">{user.profileData.gpa || "Not provided"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
