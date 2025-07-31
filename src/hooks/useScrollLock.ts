import { useEffect, useState, useRef, useCallback } from "react";

interface UseScrollLockReturn {
  scrollProgress: number;
  isLocked: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
}

const useScrollLock = (): UseScrollLockReturn => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const accumulatedDelta = useRef(0);
  const isScrollingRef = useRef(false);

  const handleWheel = useCallback((event: WheelEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const isInView = rect.top <= 0 && rect.bottom >= window.innerHeight;
    
    if (!isInView) return;

    // Allow upward scrolling at any time
    if (event.deltaY < 0) {
      setIsLocked(false);
      return; // Don't prevent upward scroll
    }

    // Only lock downward scrolling when progress < 1
    if (scrollProgress < 1 && event.deltaY > 0) {
      event.preventDefault();
      setIsLocked(true);
      
      // Accumulate scroll delta with smoother progression
      const scrollSensitivity = Math.abs(event.deltaY) > 100 ? 2 : 1; // Faster for big scrolls
      accumulatedDelta.current += event.deltaY * scrollSensitivity;
      
      // Calculate progress based on accumulated scroll (reduced sensitivity)
      const maxDelta = 2000; // Reduced from 3000 for faster progression
      const newProgress = Math.min(Math.max(accumulatedDelta.current / maxDelta, 0), 1);
      
      setScrollProgress(newProgress);
      
      // If progress reaches 100%, unlock scrolling
      if (newProgress >= 1) {
        setIsLocked(false);
      }
    } else {
      setIsLocked(false);
    }
  }, [scrollProgress]);

  const handleTouchStart = useCallback((event: TouchEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const isInView = rect.top <= 0 && rect.bottom >= window.innerHeight;
    
    if (isInView && scrollProgress < 1) {
      isScrollingRef.current = true;
      // Store initial touch position to determine scroll direction
      const touch = event.touches[0];
      if (touch) {
        (event as any).startY = touch.clientY;
      }
    }
  }, [scrollProgress]);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const isInView = rect.top <= 0 && rect.bottom >= window.innerHeight;
    
    if (isInView && scrollProgress < 1 && isScrollingRef.current) {
      const touch = event.touches[0];
      const startY = (event as any).startY;
      
      if (touch && startY) {
        const deltaY = startY - touch.clientY;
        
        // Only prevent downward scrolling (deltaY > 0 means scrolling down)
        if (deltaY > 0) {
          event.preventDefault();
          setIsLocked(true);
        } else {
          // Allow upward scrolling
          setIsLocked(false);
        }
      }
    }
  }, [scrollProgress]);

  const handleTouchEnd = useCallback(() => {
    isScrollingRef.current = false;
  }, []);

  const resetProgress = useCallback(() => {
    accumulatedDelta.current = 0;
    setScrollProgress(0);
    setIsLocked(false);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if section is in view on scroll
    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const isInView = rect.top <= 0 && rect.bottom >= window.innerHeight;
      
      // If section goes out of view from the top (user scrolled up past it), reset progress
      if (rect.bottom < 0) {
        resetProgress();
      }
      // If section is completely below viewport (user scrolled up above it), reset progress
      else if (rect.top > window.innerHeight) {
        resetProgress();
      }
      // If user scrolls back up while in the section, allow some progress reduction
      else if (isInView && rect.top > -50) { // Small threshold to prevent jitter
        // Gradually reduce progress as user scrolls up
        const upwardReduction = Math.max(0, (rect.top + 50) / 100);
        if (upwardReduction > 0 && scrollProgress > 0) {
          const reducedProgress = Math.max(0, scrollProgress - upwardReduction * 0.1);
          accumulatedDelta.current = reducedProgress * 2000; // Update accumulated delta to match
          setScrollProgress(reducedProgress);
        }
      }
    };

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd, scrollProgress, resetProgress]);

  return {
    scrollProgress,
    isLocked,
    containerRef,
  };
};

export default useScrollLock;
