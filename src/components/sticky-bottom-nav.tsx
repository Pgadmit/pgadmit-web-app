"use client";

import { Button } from "@/components/ui/button";
import { Search, LogIn } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { UserMenu } from "@/components/user-menu";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export function StickyBottomNav() {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Don't show sticky nav on AI Chat pages
  if (pathname.startsWith("/ai-chat")) {
    return null;
  }

  const handleMatchTool = () => {
    const matchSection = document.querySelector('[data-section="match-tool"]');
    if (matchSection) {
      matchSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 md:hidden z-50">
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer flex-1 bg-transparent"
            onClick={handleMatchTool}
          >
            <Search className="h-4 w-4 mr-1" />
            Match Tool
          </Button>
          {user ? (
            <UserMenu />
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer flex-1 bg-transparent"
              onClick={() => router.push("/auth")}
            >
              <LogIn className="h-4 w-4 mr-1" />
              Login
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
