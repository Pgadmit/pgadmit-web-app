"use client"

import { Button } from "@/components/ui/button"
import { UserMenu } from "@/components/user-menu"
import { Bell, MessageCircle } from "lucide-react"
import { useAI } from "@/lib/ai-context"
import { StreakCounter } from "@/components/gamification/streak-counter"
import { LevelProgress } from "@/components/gamification/level-progress"
import type { User } from "@/lib/auth-context"

interface DashboardHeaderProps {
  user: User
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const { openChat } = useAI()

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

  const handleAIChat = () => {
    openChat("dashboard")
  }

  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-foreground">
              {getGreeting()}, {user.name.split(" ")[0]}!
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Ready to take the next step in your study abroad journey?
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button size="sm" className="bg-accent hover:bg-accent/90" onClick={handleAIChat}>
                <MessageCircle className="h-4 w-4 mr-2" />
                AI Chat
              </Button>
            </div>

            <UserMenu />
          </div>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto pb-2">
          <StreakCounter compact />
          <LevelProgress compact />
        </div>
      </div>
    </header>
  )
}
