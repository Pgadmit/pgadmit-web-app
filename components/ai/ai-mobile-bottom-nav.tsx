"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, Search, MessageCircle, ClipboardList, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { icon: Home, label: "Home", href: "/dashboard", active: false },
  { icon: Search, label: "Search", href: "/universities", active: false },
  { icon: MessageCircle, label: "AI Chat", href: "/ai-chat", active: true },
  {
    icon: ClipboardList,
    label: "Tracker",
    href: "/applications",
    active: false,
  },
  { icon: User, label: "Profile", href: "/profile", active: false },
];

export function AIMobileBottomNav() {
  const router = useRouter();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
      <div className="flex items-center justify-around">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.href}
              variant="ghost"
              onClick={() => handleNavigation(item.href)}
              className={cn(
                "flex flex-col items-center justify-center p-2 h-16 w-16 transition-colors",
                item.active
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
