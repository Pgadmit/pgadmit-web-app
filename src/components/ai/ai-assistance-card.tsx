"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAI } from "@/lib/ai-context"
import { Sparkles, MessageCircle } from "lucide-react"

interface AIAssistanceCardProps {
  title: string
  description: string
  context: string
  suggestions: string[]
  className?: string
}

export function AIAssistanceCard({ title, description, context, suggestions, className }: AIAssistanceCardProps) {
  const { openChat, sendMessage } = useAI()

  const handleQuickQuestion = async (suggestion: string) => {
    openChat(context)
    // Small delay to ensure chat is open before sending message
    setTimeout(() => {
      sendMessage(suggestion, context)
    }, 100)
  }

  const handleOpenChat = () => {
    openChat(context)
  }

  return (
    <Card className={`bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-accent" />
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="w-full justify-start text-left h-auto py-2 px-3 bg-background/50 hover:bg-background"
              onClick={() => handleQuickQuestion(suggestion)}
            >
              <span className="text-xs">{suggestion}</span>
            </Button>
          ))}
        </div>

        <Button onClick={handleOpenChat} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <MessageCircle className="h-4 w-4 mr-2" />
          Chat with AI Counselor
        </Button>
      </CardContent>
    </Card>
  )
}
