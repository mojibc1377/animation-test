'use client';

import { useEffect, useState, useCallback } from 'react';

export function useSnapScroll(snapCount: number = 4) {
  const [currentSnap, setCurrentSnap] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToSnap = useCallback((snapIndex: number) => {
    if (snapIndex < 0 || snapIndex >= snapCount) return;
    
    const targetPosition = (snapIndex / (snapCount - 1)) * (document.documentElement.scrollHeight - window.innerHeight);
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }, [snapCount]);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);

      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
      
      setScrollProgress(progress);

      // Determine current snap based on scroll position
      const snapIndex = Math.round(progress * (snapCount - 1));
      setCurrentSnap(Math.max(0, Math.min(snapCount - 1, snapIndex)));

      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSnap = Math.max(0, Math.min(snapCount - 1, currentSnap + direction));
      
      if (nextSnap !== currentSnap) {
        scrollToSnap(nextSnap);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        scrollToSnap(Math.min(snapCount - 1, currentSnap + 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        scrollToSnap(Math.max(0, currentSnap - 1));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    // Initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(scrollTimeout);
    };
  }, [currentSnap, isScrolling, snapCount, scrollToSnap]);

  return {
    currentSnap,
    scrollProgress,
    isScrolling,
    scrollToSnap,
    snapCount
  };
}