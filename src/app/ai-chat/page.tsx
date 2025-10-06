"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { AIDesktopSidebar } from "@/components/ai/ai-desktop-sidebar";
import { AIChatMain } from "@/components/ai/ai-chat-main";
import { ProtectedRoute } from "@/features/auth";

export default function AIChatPage() {
  const router = useRouter();

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <ProtectedRoute>
      <div className="h-screen bg-gray-50 flex">
        {/* Desktop Sidebar */}
        <AIDesktopSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar with Back Button */}
          <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-gray-200 bg-gray-50">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToDashboard}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </Button>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                NGU
              </div>
            </div>
          </div>

          {/* Chat Content */}
          <div className="flex-1 overflow-hidden h-full">
            <AIChatMain />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
