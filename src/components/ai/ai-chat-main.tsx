"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Paperclip,
  Mic,
  Volume2,
  ChevronDown,
  Clock,
  MoreVertical,
  Send,
  Loader2,
} from "lucide-react";
import { useAI } from "@/lib/ai-context";
import { cn } from "@/lib/utils";
import { AIChatHistory } from "@/components/ai/ai-chat-history";

const suggestedQuestions = [
  "How do I start if I haven't picked a university?",
  "How can I make my profile stronger?",
  "Which deadlines matter most?",
  "How should I prepare for interviews?",
];

export function AIChatMain() {
  const { messages, isLoading, sendMessage } = useAI();
  const [inputValue, setInputValue] = useState("");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const message = inputValue.trim();
    setInputValue("");
    await sendMessage(message);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-gray-200 flex-shrink-0">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
          AI Chat
        </h1>
        <div className="flex items-center space-x-2 md:space-x-4">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
            onClick={() => setIsHistoryOpen(true)}
          >
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">History</span>
          </Button>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={cn(
          "flex-1 flex flex-col px-4 md:px-6 py-10 md:py-12 min-h-0",
          messages.length === 0
            ? "items-center justify-center"
            : "items-start justify-start"
        )}
      >
        {/* AI Counselor Introduction - only show when no messages */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto px-4 py-8">
            <div className="text-center mb-4 md:mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-gray-300 rounded-full"></div>
              </div>
              <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
                AI Admissions Counselor
              </h2>
              <p className="text-xs md:text-sm text-gray-600">
                I'm here to guide you through your admissions journey.
              </p>
            </div>

            {/* Suggested Questions - only show when no messages */}
            <div className="w-full space-y-1.5 md:space-y-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start h-auto p-2 md:p-3 text-xs md:text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => handleSuggestedQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Messages Container */}
        {messages.length > 0 && (
          <div className="w-full flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto space-y-4 pb-32 md:pb-24 max-w-4xl mx-auto px-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-4 py-2 text-sm",
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 rounded-lg px-4 py-2 text-sm flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 px-4 md:px-6 pt-4 md:pt-6 pb-24 md:pb-8 border-t border-gray-200 bg-gray-50 z-50">
        <Card className="p-3 md:p-4">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center space-x-2 md:space-x-3"
          >
            <Button
              variant="ghost"
              size="sm"
              type="button"
              className="hidden sm:flex"
            >
              <Paperclip className="h-4 w-4" />
            </Button>

            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask your question..."
                className="pr-16 md:pr-20 text-sm md:text-base"
                disabled={isLoading}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  className="h-6 px-2 hidden md:flex"
                >
                  <ChevronDown className="h-3 w-3" />
                  <span className="text-xs ml-1">Change goal</span>
                </Button>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              type="button"
              className="hidden sm:flex"
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              className="hidden sm:flex"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isLoading || !inputValue.trim()}
              className="bg-blue-600 hover:bg-blue-700 min-w-[44px] h-10"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </Card>
      </div>

      {/* History Sidebar */}
      <AIChatHistory
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
    </div>
  );
}
