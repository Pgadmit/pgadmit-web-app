"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import { useAuth } from "@/features/auth"

export interface ChatMessage {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  context?: string
}

interface AIContextType {
  messages: ChatMessage[]
  isLoading: boolean
  isChatOpen: boolean
  sendMessage: (content: string, context?: string) => Promise<void>
  openChat: (context?: string) => void
  closeChat: () => void
  clearChat: () => void
}

const AIContext = createContext<AIContextType | undefined>(undefined)

export function AIProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const { user } = useAuth()

  const generateAIResponse = useCallback(
    async (userMessage: string, context?: string): Promise<string> => {
      // Simulate AI processing delay
      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

      // Context-aware responses based on user's stage and message content
      const lowerMessage = userMessage.toLowerCase()

      if (context === "university-matching" || lowerMessage.includes("university") || lowerMessage.includes("school")) {
        return `Based on your profile, I'd recommend looking at universities that match your academic background and budget. Would you like me to help you create a personalized shortlist? I can consider factors like program rankings, location preferences, and scholarship opportunities.`
      }

      if (context === "application-help" || lowerMessage.includes("application") || lowerMessage.includes("essay")) {
        return `I can help you with your application! For essays, focus on your unique story and experiences. Start with a compelling hook, show your growth, and connect your goals to the specific program. Would you like me to review your essay outline or help brainstorm topics?`
      }

      if (context === "visa-support" || lowerMessage.includes("visa") || lowerMessage.includes("interview")) {
        return `Visa applications can be stressful, but I'm here to help! Make sure you have all required documents: I-20/CAS, financial statements, academic transcripts, and passport photos. For interviews, practice common questions and be honest about your intentions. Would you like a visa document checklist?`
      }

      if (lowerMessage.includes("stress") || lowerMessage.includes("anxious") || lowerMessage.includes("worried")) {
        return `It's completely normal to feel overwhelmed about studying abroad - you're taking a big, exciting step! Remember that thousands of students like you have successfully made this journey. Take it one step at a time, and don't hesitate to reach out for support. What specific aspect is worrying you most?`
      }

      if (lowerMessage.includes("deadline") || lowerMessage.includes("timeline")) {
        return `Let me help you stay on track with your deadlines! Based on your current stage, here are your upcoming priorities. I can send you personalized reminders and help you create a timeline that works for your schedule. What deadlines are you most concerned about?`
      }

      // General helpful response
      return `I'm here to help you with every step of your study abroad journey! Whether you need help with university selection, applications, essays, visa processes, or just need someone to talk through your concerns, I've got you covered. What would you like to work on today?`
    },
    [user],
  )

  const sendMessage = useCallback(
    async (content: string, context?: string) => {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        content,
        role: "user",
        timestamp: new Date(),
        context,
      }

      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)

      try {
        const aiResponse = await generateAIResponse(content, context)
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: aiResponse,
          role: "assistant",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, assistantMessage])
      } catch (error) {
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
          role: "assistant",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorMessage])
      } finally {
        setIsLoading(false)
      }
    },
    [generateAIResponse],
  )

  const openChat = useCallback(
    (context?: string) => {
      setIsChatOpen(true)

      // Add welcome message if no messages exist
      if (messages.length === 0) {
        const welcomeMessage: ChatMessage = {
          id: "welcome",
          content: user
            ? `Hi ${user.name.split(" ")[0]}! I'm your AI study abroad counselor. I'm here to help you with university selection, applications, visa processes, and any concerns you might have. How can I assist you today?`
            : "Hello! I'm your AI study abroad counselor. I can help you with university selection, applications, visa processes, and answer any questions about studying abroad. How can I help you today?",
          role: "assistant",
          timestamp: new Date(),
          context,
        }
        setMessages([welcomeMessage])
      }
    },
    [messages.length, user],
  )

  const closeChat = useCallback(() => {
    setIsChatOpen(false)
  }, [])

  const clearChat = useCallback(() => {
    setMessages([])
  }, [])

  return (
    <AIContext.Provider
      value={{
        messages,
        isLoading,
        isChatOpen,
        sendMessage,
        openChat,
        closeChat,
        clearChat,
      }}
    >
      {children}
    </AIContext.Provider>
  )
}

export function useAI() {
  const context = useContext(AIContext)
  if (context === undefined) {
    throw new Error("useAI must be used within an AIProvider")
  }
  return context
}
