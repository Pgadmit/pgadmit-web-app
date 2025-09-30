"use client";

import { Button } from "@/components/ui/button";
import { X, Clock, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIChatHistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIChatHistory({ isOpen, onClose }: AIChatHistoryProps) {
  // Mock history data - replace with real data
  const historyItems = [
    {
      id: 1,
      title: "University selection help",
      time: "2 hours ago",
      preview: "What universities should I apply to?",
    },
    {
      id: 2,
      title: "Application deadlines",
      time: "Yesterday",
      preview: "When are the deadlines for MIT?",
    },
    {
      id: 3,
      title: "Profile improvement",
      time: "2 days ago",
      preview: "How can I strengthen my profile?",
    },
    {
      id: 4,
      title: "Interview preparation",
      time: "3 days ago",
      preview: "Tips for university interviews",
    },
  ];

  return (
    <>
      {/* Overlay - transparent but blocks clicks */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] transition-all duration-300"
          onClick={onClose}
        />
      )}

      {/* History Sidebar */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-80 bg-white border-l border-gray-200 z-[70] transform transition-transform duration-300 ease-in-out shadow-2xl",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Chat History
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* History Items */}
        <div className="p-4 space-y-3">
          {historyItems.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors bg-white"
            >
              <div className="flex items-start space-x-3">
                <MessageSquare className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {item.preview}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">{item.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <Button variant="outline" size="sm" className="w-full">
            Clear History
          </Button>
        </div>
      </div>
    </>
  );
}
