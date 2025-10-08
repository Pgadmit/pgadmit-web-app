// Gamification related types
export interface UserStats {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  totalPoints: number;
  level: number;
  completedTasks: number;
  achievements: Achievement[];
}

export interface ProgressData {
  current: number;
  maxProgress?: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'profile' | 'application' | 'visa' | 'engagement' | 'milestone';
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}
