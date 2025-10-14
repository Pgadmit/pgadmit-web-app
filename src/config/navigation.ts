import {
  Home,
  Search,
  MessageCircle,
  ClipboardList,
  User,
  Settings,
  BookOpen,
  Users,
  type LucideIcon,
} from 'lucide-react';

export interface NavigationItem {
  icon: LucideIcon;
  label: string;
  mobileLabel?: string; // Shorter label for mobile navigation
  href: string;
  description?: string;
  showInMobile?: boolean;
  showInSidebar?: boolean;
}

// Single source of truth for all navigation across the app
export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    icon: Home,
    label: 'Dashboard',
    href: '/dashboard',
    description: 'Your study abroad hub',
    showInMobile: true,
    showInSidebar: true,
  },
  {
    icon: Search,
    label: 'Find Universities',
    mobileLabel: 'Search',
    href: '/universities',
    description: 'Search and explore programs',
    showInMobile: true,
    showInSidebar: true,
  },
  {
    icon: MessageCircle,
    label: 'AI Counselor',
    mobileLabel: 'AI Chat',
    href: '/ai-chat',
    description: 'Get personalized guidance',
    showInMobile: true,
    showInSidebar: true,
  },
  {
    icon: ClipboardList,
    label: 'My Applications',
    mobileLabel: 'Apps',
    href: '/applications',
    description: 'Track your progress',
    showInMobile: true,
    showInSidebar: true,
  },
  {
    icon: User,
    label: 'My Profile',
    mobileLabel: 'Profile',
    href: '/profile',
    description: 'Manage your information',
    showInMobile: true,
    showInSidebar: true,
  },
  {
    icon: Settings,
    label: 'Settings',
    href: '/settings',
    description: 'Account preferences',
    showInMobile: false,
    showInSidebar: true,
  },
  {
    icon: BookOpen,
    label: 'Resources',
    href: '/resources',
    description: 'Helpful guides and tools',
    showInMobile: true,
    showInSidebar: true,
  },
  {
    icon: Users,
    label: 'Community',
    href: '/community',
    description: 'Connect with peers',
    showInMobile: false,
    showInSidebar: true,
  },
];

// Filter items for mobile navigation (limited space)
export const MOBILE_NAVIGATION_ITEMS = NAVIGATION_ITEMS.filter(
  item => item.showInMobile
);

// Filter items for sidebar navigation
export const SIDEBAR_NAVIGATION_ITEMS = NAVIGATION_ITEMS.filter(
  item => item.showInSidebar
);

