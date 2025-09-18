"use client";

import { usePathname } from "next/navigation";
import { GlobalHeader } from "@/components/global-header";

export function ConditionalHeader() {
  const pathname = usePathname();

  // Don't show header on AI Chat pages
  if (pathname.startsWith("/ai-chat")) {
    return null;
  }

  return <GlobalHeader />;
}
