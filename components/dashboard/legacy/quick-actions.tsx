"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, FileText, MessageCircle } from "lucide-react";
import { useAI } from "@/lib/ai-context";
import type { User } from "@/lib/auth-context";

interface QuickActionsProps {
  user: User;
}

export function QuickActions({ user }: QuickActionsProps) {
  const { openChat } = useAI();

  const handleAIHelp = () => {
    openChat("quick-help");
  };

  return (
    <Card className="bg-card shadow-sm">
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground mb-3">Quick Actions</h3>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-col h-auto py-3 bg-transparent"
          >
            <Search className="h-4 w-4 mb-1" />
            <span className="text-xs">Find Schools</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-col h-auto py-3 bg-transparent"
          >
            <FileText className="h-4 w-4 mb-1" />
            <span className="text-xs">Documents</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-col h-auto py-3 bg-accent/10 border-accent text-accent"
            onClick={handleAIHelp}
          >
            <MessageCircle className="h-4 w-4 mb-1" />
            <span className="text-xs">AI Help</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
