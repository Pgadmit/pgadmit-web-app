'use client';

import { useConnectionMonitor } from '@/lib/connection-monitor';
import { useEffect, useState } from 'react';

interface ConnectionStatusProps {
  showWhenOnline?: boolean;
  className?: string;
}

export function ConnectionStatus({
  showWhenOnline = false,
  className = '',
}: ConnectionStatusProps) {
  const { isOnline, checkConnection } = useConnectionMonitor();
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      const check = async () => {
        setIsChecking(true);
        await checkConnection();
        setIsChecking(false);
      };
      check();
    }
  }, []);

  if (isOnline && !showWhenOnline) {
    return null;
  }

  return (
    <div className={`connection-status ${className}`}>
      {isChecking ? (
        <div className='flex items-center gap-2 text-yellow-600'>
          <div className='w-2 h-2 bg-yellow-500 rounded-full animate-pulse' />
          <span className='text-sm'>Checking connection...</span>
        </div>
      ) : !isOnline ? (
        <div className='flex items-center gap-2 text-red-600'>
          <div className='w-2 h-2 bg-red-500 rounded-full' />
          <span className='text-sm'>No internet connection</span>
        </div>
      ) : showWhenOnline ? (
        <div className='flex items-center gap-2 text-green-600'>
          <div className='w-2 h-2 bg-green-500 rounded-full' />
          <span className='text-sm'>Connected</span>
        </div>
      ) : null}
    </div>
  );
}
