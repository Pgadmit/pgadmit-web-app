import { useEffect } from 'react';

/**
 * Hook to prevent body scroll when modal is open
 * @param isOpen - Whether the modal is open
 */

export function useOverflowLock(isOpen: boolean) {
  useEffect(() => {
    if (isOpen) {
      const previousOverflow = document.body.style.overflow;
      const previousOverflowX = document.body.style.overflowX;
      document.body.style.overflow = 'hidden';
      document.body.style.overflowX = 'hidden';
      return () => {
        document.body.style.overflow = previousOverflow;
        document.body.style.overflowX = previousOverflowX;
      };
    }
  }, [isOpen]);
}
