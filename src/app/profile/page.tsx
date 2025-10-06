"use client"

import { useAuth } from "@/features/auth"
import { useOnboardingData } from "@/hooks/use-onboarding-data"
import { useProfile } from "@/hooks/use-profile"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, GraduationCap, User, } from "lucide-react"
import { ProtectedRoute } from "@/features/auth"
import { ProfileIncompleteBanner } from "@/components/dashboard/profile-incomplete-banner"

export default function ProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const { profile, isLoading: isLoadingProfile, error, reloadProfile } = useProfile(user?.id ?? null)

  const { onboardingData } = useOnboardingData()

  if (!user) return null

  if (isLoadingProfile) {
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
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading profile...</p>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  if (error) {
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
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="text-red-500 text-6xl mb-4">⚠</div>
                <h2 className="text-xl font-semibold mb-2">Failed to load profile</h2>
                <p className="text-muted-foreground mb-4">{error}</p>
                <Button onClick={reloadProfile}>
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

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

          <ProfileIncompleteBanner onboardingData={onboardingData} loading={isLoadingProfile} />

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
                    <p className="text-lg">{profile?.name || user.name || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="text-lg">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Country</label>
                    <p className="text-lg">{onboardingData?.country ?? 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Profile Status</label>
                    <p className="text-lg">
                      {profile?.onboardingComplete ? (
                        <span className="text-green-600">✓ Complete</span>
                      ) : (
                        <span className="text-orange-600">⚠ Incomplete</span>
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {onboardingData && (
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
                      <p className="text-lg capitalize">{onboardingData.field_of_study?.replace("-", " ") ?? "Not provided"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Budget Range</label>
                      <p className="text-lg">{onboardingData.budget && onboardingData.budget.length > 0 ? onboardingData.budget : "Not provided"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">GPA</label>
                      <p className="text-lg">{onboardingData.gpa ?? "Not provided"}</p>
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
