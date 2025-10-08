"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useSidebar } from "@/lib/sidebar-context";
import { Button } from "@/shared/ui";
import {
  MessageCircle,
  ChevronRight,
  Target,
  Search,
  FileText,
  Award,
  Plane,
} from "lucide-react";

export function DashboardSidebar() {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const journeySteps = [
    {
      title: "Discovery & Exploration",
      icon: Search,
      active: false,
    },
    {
      title: "Research & Shortlisting",
      icon: Target,
      active: true,
    },
    {
      title: "Applications & Admissions",
      icon: FileText,
      active: false,
    },
    {
      title: "Scholarships & Financial Aid",
      icon: Award,
      active: false,
    },
    {
      title: "Visa & Pre-Departure",
      icon: Plane,
      active: false,
    },
  ];

  const SidebarContent = () => (
    <div className="p-4 md:p-6">
      {/* Your Journey Section */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
          Your Journey
        </h2>
        <p className="text-xs md:text-sm text-gray-600 mb-4 md:mb-6">
          Navigate your study abroad path
        </p>

        <div className="space-y-1 md:space-y-2">
          {journeySteps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center space-x-2 md:space-x-3 p-2 md:p-3 rounded-lg cursor-pointer transition-colors ${step.active
                ? "bg-blue-50 border border-blue-200"
                : "hover:bg-gray-50"
                }`}
              onClick={() => setSidebarOpen(false)}
            >
              <div
                className={`p-1.5 md:p-2 rounded-lg ${step.active ? "bg-blue-100" : "bg-gray-100"
                  }`}
              >
                <step.icon
                  className={`w-3.5 h-3.5 md:w-4 md:h-4 ${step.active ? "text-blue-600" : "text-gray-600"
                    }`}
                />
              </div>
              <span
                className={`text-xs md:text-sm font-medium flex-1 ${step.active ? "text-blue-900" : "text-gray-700"
                  }`}
              >
                {step.title}
              </span>
              {step.active && (
                <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* AI Counselor Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg md:rounded-xl p-3 md:p-4">
        <div className="flex items-center space-x-2 md:space-x-3 mb-3">
          <div className="p-1.5 md:p-2 bg-blue-100 rounded-lg">
            <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm md:text-base font-semibold text-gray-900">
              AI Counselor
            </h3>
            <p className="text-xs text-gray-600">
              Your personal study abroad guide
            </p>
          </div>
        </div>
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm h-8 md:h-10"
          onClick={() => setSidebarOpen(false)}
        >
          Ask AI Assistant
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-80 p-0">
          <SheetTitle className="sr-only">Dashboard Navigation</SheetTitle>
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Navigation</h2>
          </div>
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-80 bg-white border-r border-gray-200 min-h-screen">
        <SidebarContent />
      </aside>
    </>
  );
}
