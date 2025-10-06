"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { UserMenu } from "@/components/user-menu";
import { useRouter } from "next/navigation";
import { useActivePath, navigationItems } from "@/lib/navigation-utils";
import {
  NavigationSkeleton,
  MobileNavigationSkeleton,
} from "@/components/navigation-skeleton";
import { useSidebar } from "@/lib/sidebar-context";
import { Menu, X } from "lucide-react";

export function GlobalHeader() {
  const { user } = useAuth();
  const router = useRouter();
  const { isActivePath, mounted, pathname } = useActivePath();
  const { sidebarOpen, toggleSidebar } = useSidebar();

  // Check if we're on dashboard pages - show burger immediately on first render
  const isDashboardPage = pathname.startsWith("/dashboard");

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleGetStarted = () => {
    router.push("/onboarding");
  };

  return (
    <>
      <header className="bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-3 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Burger menu for dashboard pages - mobile only */}
              {isDashboardPage && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSidebar}
                  className="md:hidden p-2 hover:bg-gray-100 transition-all duration-200"
                >
                  <div className="relative w-5 h-5">
                    <Menu
                      className={`h-5 w-5 absolute transition-all duration-200 ${sidebarOpen
                        ? "opacity-0 rotate-180"
                        : "opacity-100 rotate-0"
                        }`}
                    />
                    <X
                      className={`h-5 w-5 absolute transition-all duration-200 ${sidebarOpen
                        ? "opacity-100 rotate-0"
                        : "opacity-0 -rotate-180"
                        }`}
                    />
                  </div>
                </Button>
              )}

              <div
                className="flex items-center gap-3 cursor-pointer group"
                onClick={handleLogoClick}
              >
                <img
                  src="/logo.png"
                  alt="PGadmit Logo"
                  className="max-w-[120px] sm:max-w-[140px] md:max-w-[160px] h-auto object-contain transition-transform group-hover:scale-105"
                />
              </div>

              {user && (
                <>
                  {mounted ? (
                    <nav className="hidden md:flex items-center gap-2">
                      {navigationItems.map((item) => {
                        const isActive = isActivePath(item.href, item.exact);
                        return (
                          <Button
                            key={item.href}
                            variant="ghost"
                            onClick={() => router.push(item.href)}
                            className={`px-4 py-2 text-sm font-semibold cursor-pointer transition-colors ${isActive
                              ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                              }`}
                          >
                            {item.label.toUpperCase()}
                          </Button>
                        );
                      })}
                    </nav>
                  ) : (
                    <NavigationSkeleton />
                  )}
                </>
              )}
            </div>

            {/* Navigation Actions */}
            <div className=" flex items-center gap-3">
              {user ? (
                <div className="cursor-pointer flex items-center gap-2">
                  {mounted ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push("/dashboard")}
                      className={`md:hidden px-4 py-2 text-sm font-semibold cursor-pointer transition-colors ${isActivePath("/dashboard", false)
                        ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                        : "hover:bg-gray-100"
                        }`}
                    >
                      Dashboard
                    </Button>
                  ) : (
                    <MobileNavigationSkeleton />
                  )}
                  <UserMenu />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push("/login")}
                    className="hidden sm:inline-flex"
                  >
                    Login
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleGetStarted}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
