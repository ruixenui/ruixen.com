"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseHorizontalScrollOptions {
  containerRef: React.RefObject<HTMLDivElement | null>;
  dayColumnWidth: number;
  onNavigate: (daysDelta: number) => void;
  disabled?: boolean;
}

interface UseHorizontalScrollReturn {
  scrollOffset: number;
  slideOffset: number;
  isScrolling: boolean;
  isAnimating: boolean;
  triggerSlideAnimation: (daysDelta: number) => void;
}

const SCROLL_END_DEBOUNCE_MS = 150;
const SNAP_ANIMATION_MS = 200;

export function useHorizontalScroll({
  containerRef,
  dayColumnWidth,
  onNavigate,
  disabled,
}: UseHorizontalScrollOptions): UseHorizontalScrollReturn {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [slideOffset, setSlideOffset] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const scrollEndTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const accumulatedDelta = useRef(0);
  const onNavigateRef = useRef(onNavigate);
  useEffect(() => {
    onNavigateRef.current = onNavigate;
  }, [onNavigate]);

  const snapAndNavigate = useCallback(
    (offset: number) => {
      if (dayColumnWidth <= 0) return;

      const daysDelta = Math.round(offset / dayColumnWidth);

      // If scroll distance < half a day-column width, snap back
      if (daysDelta === 0) {
        setIsAnimating(true);
        setScrollOffset(0);
        setTimeout(() => {
          setIsAnimating(false);
          setIsScrolling(false);
        }, SNAP_ANIMATION_MS);
        return;
      }

      // Snap to exact day boundary then navigate
      const targetOffset = daysDelta * dayColumnWidth;
      setIsAnimating(true);
      setScrollOffset(targetOffset);

      setTimeout(() => {
        onNavigateRef.current(-daysDelta);
        setScrollOffset(0);
        setIsAnimating(false);
        setIsScrolling(false);
        accumulatedDelta.current = 0;
      }, SNAP_ANIMATION_MS);
    },
    [dayColumnWidth],
  );

  // Programmatic slide animation for button/keyboard navigation
  // Uses slideOffset (not scrollOffset) so dynamicBuffer isn't affected
  // Does NOT call onNavigate — caller is responsible for having already changed the date
  const triggerSlideAnimation = useCallback(
    (daysDelta: number) => {
      if (dayColumnWidth <= 0 || isAnimating || isScrolling) return;

      // Start from the opposite direction to create slide effect
      const startOffset = daysDelta * dayColumnWidth;
      setSlideOffset(startOffset);

      // Force a reflow then animate to 0
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
          setSlideOffset(0);
          setTimeout(() => {
            setIsAnimating(false);
          }, SNAP_ANIMATION_MS);
        });
      });
    },
    [dayColumnWidth, isAnimating, isScrolling],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (disabled) return;

      // Only handle horizontal-dominant scrolls
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;

      e.preventDefault();

      setIsScrolling(true);

      // Negate deltaX: scroll right (positive deltaX) = move calendar left = navigate forward
      accumulatedDelta.current += -e.deltaX;
      setScrollOffset(accumulatedDelta.current);

      // Reset debounce timer
      if (scrollEndTimer.current) {
        clearTimeout(scrollEndTimer.current);
      }

      scrollEndTimer.current = setTimeout(() => {
        snapAndNavigate(accumulatedDelta.current);
        accumulatedDelta.current = 0;
      }, SCROLL_END_DEBOUNCE_MS);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      if (scrollEndTimer.current) {
        clearTimeout(scrollEndTimer.current);
      }
    };
  }, [containerRef, snapAndNavigate, disabled]);

  return {
    scrollOffset,
    slideOffset,
    isScrolling,
    isAnimating,
    triggerSlideAnimation,
  };
}
