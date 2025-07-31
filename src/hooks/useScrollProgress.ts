import { useState, useEffect, useRef } from 'react';

export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Intersection Observer to detect when section is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { 
        threshold: [0, 0.1, 0.5, 1],
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    observer.observe(container);

    const handleScroll = () => {
      if (!isInView) {
        setScrollProgress(0);
        return;
      }

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate progress based on how much of the container has been scrolled through
      const scrolled = Math.max(0, -rect.top);
      const maxScroll = containerHeight - windowHeight;
      let progress = 0;
      if (maxScroll > 0) {
        progress = scrolled / maxScroll;
      }
      // Clamp and sanitize progress
      if (isNaN(progress) || typeof progress !== 'number' || progress < 0) {
        progress = 0;
      } else if (progress > 1) {
        progress = 1;
      }
      progressRef.current = progress;
      setScrollProgress(progress);
    };

    // Use requestAnimationFrame for smooth animations
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [isInView]);

  return { scrollProgress, isInView, containerRef };
};

export default useScrollProgress;
