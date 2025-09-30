import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

const ContentWrapper = ({ className, children }: { className?: string; children: ReactNode }) => {
  return (
    <div className={cn('mx-auto w-full max-w-[110rem] px-4 overflow-x-hidden', className)}>
      {children}
    </div>
  );
};

export default ContentWrapper;
