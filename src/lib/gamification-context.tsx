'use client';

import type React from 'react';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useAuth } from '@/features/auth';
import type { UserStats, Achievement } from '@/types';

interface GamificationContextType {
  userStats: UserStats;
  updateStreak: () => void;
  unlockAchievement: (achievementId: string) => void;
  addPoints: (points: number, reason: string) => void;
  completeTask: (taskId: string) => void;
  showCelebration: boolean;
  celebrationMessage: string;
  dismissCelebration: () => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(
  undefined
);

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'welcome',
    title: 'Welcome Aboard!',
    description: 'Created your PGadmit account',
    icon: '🎉',
    category: 'milestone',
    unlocked: false,
  },
  {
    id: 'profile-complete',
    title: 'Profile Master',
    description: 'Completed your full academic profile',
    icon: '👤',
    category: 'profile',
    unlocked: false,
  },
  {
    id: 'first-match',
    title: 'University Explorer',
    description: 'Used the AI matching tool for the first time',
    icon: '🎯',
    category: 'application',
    unlocked: false,
  },
  {
    id: 'first-application',
    title: 'Application Pioneer',
    description: 'Started your first university application',
    icon: '📝',
    category: 'application',
    unlocked: false,
  },
  {
    id: 'streak-7',
    title: 'Week Warrior',
    description: 'Maintained a 7-day activity streak',
    icon: '🔥',
    category: 'engagement',
    unlocked: false,
  },
  {
    id: 'streak-30',
    title: 'Monthly Master',
    description: 'Maintained a 30-day activity streak',
    icon: '💪',
    category: 'engagement',
    unlocked: false,
  },
  {
    id: 'ai-chat-10',
    title: 'AI Buddy',
    description: 'Had 10 conversations with your AI counselor',
    icon: '🤖',
    category: 'engagement',
    unlocked: false,
    progress: 0,
    maxProgress: 10,
  },
  {
    id: 'visa-approved',
    title: 'Visa Victory',
    description: 'Successfully obtained your student visa',
    icon: '✈️',
    category: 'visa',
    unlocked: false,
  },
  {
    id: 'departure-ready',
    title: 'Journey Ready',
    description: 'Completed all pre-departure preparations',
    icon: '🎒',
    category: 'milestone',
    unlocked: false,
  },
];

export function GamificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState<UserStats>({
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: '',
    totalPoints: 0,
    level: 1,
    completedTasks: 0,
    achievements: DEFAULT_ACHIEVEMENTS,
  });
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState('');

  // Load user stats from localStorage on mount
  useEffect(() => {
    if (user) {
      const savedStats = localStorage.getItem(`pgadmit_stats_${user.id}`);
      if (savedStats) {
        const parsed = JSON.parse(savedStats);
        setUserStats({
          ...parsed,
          achievements: parsed.achievements || DEFAULT_ACHIEVEMENTS,
        });
      }
    }
  }, [user]);

  // Save stats to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(
        `pgadmit_stats_${user.id}`,
        JSON.stringify(userStats)
      );
    }
  }, [userStats, user]);

  const updateStreak = useCallback(() => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    setUserStats(prev => {
      let newStreak = prev.currentStreak;

      if (prev.lastActiveDate === today) {
        // Already active today, no change
        return prev;
      } else if (prev.lastActiveDate === yesterday) {
        // Consecutive day, increment streak
        newStreak = prev.currentStreak + 1;
      } else if (prev.lastActiveDate !== today) {
        // Streak broken or first time, reset to 1
        newStreak = 1;
      }

      const newStats = {
        ...prev,
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastActiveDate: today,
      };

      // Check for streak achievements
      if (
        newStreak === 7 &&
        !prev.achievements.find(a => a.id === 'streak-7')?.unlocked
      ) {
        setTimeout(() => unlockAchievement('streak-7'), 500);
      }
      if (
        newStreak === 30 &&
        !prev.achievements.find(a => a.id === 'streak-30')?.unlocked
      ) {
        setTimeout(() => unlockAchievement('streak-30'), 500);
      }

      return newStats;
    });
  }, []);

  const unlockAchievement = useCallback((achievementId: string) => {
    setUserStats(prev => {
      const achievement = prev.achievements.find(a => a.id === achievementId);
      if (!achievement || achievement.unlocked) return prev;

      const updatedAchievements = prev.achievements.map(a =>
        a.id === achievementId
          ? { ...a, unlocked: true, unlockedAt: new Date().toISOString() }
          : a
      );

      // Add points for achievement
      const points = getAchievementPoints(achievement.category);

      return {
        ...prev,
        achievements: updatedAchievements,
        totalPoints: prev.totalPoints + points,
        level: calculateLevel(prev.totalPoints + points),
      };
    });
  }, []);

  const addPoints = useCallback((points: number, reason: string) => {
    setUserStats(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + points,
      level: calculateLevel(prev.totalPoints + points),
    }));
  }, []);

  const completeTask = useCallback(
    (taskId: string) => {
      setUserStats(prev => ({
        ...prev,
        completedTasks: prev.completedTasks + 1,
      }));

      // Add points for completing task
      addPoints(10, 'Task completed');

      // Check for task-based achievements
      if (taskId.includes('profile') && user?.onboardingComplete) {
        setTimeout(() => unlockAchievement('profile-complete'), 500);
      }
    },
    [addPoints, user, unlockAchievement]
  );

  const dismissCelebration = useCallback(() => {
    setShowCelebration(false);
    setCelebrationMessage('');
  }, []);

  // Update streak on mount and daily
  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  return (
    <GamificationContext.Provider
      value={{
        userStats,
        updateStreak,
        unlockAchievement,
        addPoints,
        completeTask,
        showCelebration,
        celebrationMessage,
        dismissCelebration,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
}

function getAchievementPoints(category: Achievement['category']): number {
  const pointMap = {
    profile: 50,
    application: 100,
    visa: 150,
    engagement: 25,
    milestone: 200,
  };
  return pointMap[category];
}

function calculateLevel(totalPoints: number): number {
  return Math.floor(totalPoints / 100) + 1;
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error(
      'useGamification must be used within a GamificationProvider'
    );
  }
  return context;
}
