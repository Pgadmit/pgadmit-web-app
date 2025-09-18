"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";
import {
  User,
  Settings,
  LogOut,
  LayoutDashboard,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useActivePath } from "@/lib/navigation-utils";

export function UserMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { isActivePath, mounted } = useActivePath();

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleDashboard = () => {
    router.push("/dashboard");
  };

  const handleProfile = () => {
    router.push("/profile");
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  const handleApplications = () => {
    router.push("/applications");
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleDashboard}
          className={`cursor-pointer transition-colors ${
            mounted && isActivePath("/dashboard", false)
              ? "bg-blue-50 text-blue-700 font-semibold"
              : "hover:bg-gray-50"
          }`}
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          <span>Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleApplications}
          className={`cursor-pointer transition-colors ${
            mounted && isActivePath("/applications", false)
              ? "bg-blue-50 text-blue-700 font-semibold"
              : "hover:bg-gray-50"
          }`}
        >
          <FileText className="mr-2 h-4 w-4" />
          <span>Applications</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleProfile}
          className={`cursor-pointer transition-colors ${
            mounted && isActivePath("/profile", false)
              ? "bg-blue-50 text-blue-700 font-semibold"
              : "hover:bg-gray-50"
          }`}
        >
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleSettings}
          className={`cursor-pointer transition-colors ${
            mounted && isActivePath("/settings", false)
              ? "bg-blue-50 text-blue-700 font-semibold"
              : "hover:bg-gray-50"
          }`}
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
