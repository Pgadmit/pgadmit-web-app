"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useGamification } from "@/lib/gamification-context"
import { Trophy, Lock } from "lucide-react"

export function AchievementsGrid() {
  const { userStats } = useGamification()

  const unlockedAchievements = userStats.achievements?.filter((a) => a.isUnlocked) || []
  const lockedAchievements = userStats.achievements?.filter((a) => !a.isUnlocked) || []

  return (
    <Card className="bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Achievements
          <Badge variant="secondary" className="ml-auto">
            {unlockedAchievements.length}/{userStats.achievements?.length || 0}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Unlocked Achievements */}
          {unlockedAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className="p-3 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-lg"
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-foreground">{achievement.title}</h4>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  {achievement.unlockedAt && (
                    <p className="text-xs text-primary mt-1">
                      Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Locked Achievements with Progress */}
          {lockedAchievements.slice(0, 3).map((achievement) => (
            <div key={achievement.id} className="p-3 bg-muted/30 border border-border rounded-lg opacity-60">
              <div className="flex items-start gap-3">
                <div className="text-2xl grayscale">
                  {achievement.isUnlocked ? achievement.icon : <Lock className="h-6 w-6 text-muted-foreground" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-muted-foreground">{achievement.title}</h4>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  {achievement.progress !== undefined && achievement.maxProgress && (
                    <div className="mt-2">
                      <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-1" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {achievement.progress}/{achievement.maxProgress}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {lockedAchievements.length > 3 && (
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              +{lockedAchievements.length - 3} more achievements to unlock
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
