'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/features/auth';

interface UserAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  className?: string;
}

export function UserAvatar({
  size = 'md',
  showName = false,
  className = '',
}: UserAvatarProps) {
  const { user } = useAuth();

  if (!user) return null;

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const initials =
    user.name
      ?.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase() || 'U';

  // Get avatar from user data
  const avatarUrl = user.avatar_url;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Avatar className={sizeClasses[size]}>
        {avatarUrl && (
          <AvatarImage
            src={avatarUrl}
            alt={user.name || 'User'}
            className='object-cover'
          />
        )}
        <AvatarFallback className='bg-primary text-primary-foreground'>
          {initials}
        </AvatarFallback>
      </Avatar>
      {showName && (
        <div className='flex flex-col'>
          <span className='text-sm font-medium'>{user.name || 'User'}</span>
          <span className='text-xs text-muted-foreground'>{user.email}</span>
        </div>
      )}
    </div>
  );
}
