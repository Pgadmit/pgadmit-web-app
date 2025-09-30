import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function useActivePath() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  const isActivePath = (path: string, exact: boolean = false) => {
    // During SSR or before mount, return false to avoid hydration mismatch
    if (!mounted || !pathname) {
      return false;
    }

    if (exact) {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return {
    isActivePath,
    pathname: pathname ?? "",
    mounted,
    // Helper functions for specific navigation items
    isDashboardActive: () => isActivePath("/dashboard"),
    isApplicationsActive: () => isActivePath("/applications"),
    isUniversitiesActive: () => isActivePath("/universities"),
    isAIChatActive: () => isActivePath("/ai-chat"),
    isCommunityActive: () => isActivePath("/community"),
    isResourcesActive: () => isActivePath("/resources"),
    isBlogActive: () => isActivePath("/blog"),
    isProfileActive: () => isActivePath("/profile"),
    isSettingsActive: () => isActivePath("/settings"),
  };
}

// Navigation items configuration
export const navigationItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    exact: false, // Should match /dashboard and /dashboard/*
  },
  {
    label: "Applications",
    href: "/applications",
    exact: false,
  },
  {
    label: "Universities",
    href: "/universities",
    exact: false,
  },
  {
    label: "AI Chat",
    href: "/ai-chat",
    exact: false,
  },
  {
    label: "Community",
    href: "/community",
    exact: false,
  },
  {
    label: "Resources",
    href: "/resources",
    exact: false,
  },
  {
    label: "Blog",
    href: "/blog",
    exact: false,
  },
] as const;

export const userMenuItems = [
  {
    label: "Profile",
    href: "/profile",
    exact: false,
  },
  {
    label: "Settings",
    href: "/settings",
    exact: false,
  },
] as const;
