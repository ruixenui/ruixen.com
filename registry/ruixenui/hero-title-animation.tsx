"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";

interface HeroTitleAnimationProps {
  className?: string;
}

export function HeroTitleAnimation({ className }: HeroTitleAnimationProps) {
  const [phase, setPhase] = useState<
    "measuring" | "fade-in" | "move" | "reveal" | "highlight" | "done"
  >("measuring");

  const [brandOffsetX, setBrandOffsetX] = useState(0);
  const [titleOffsetY, setTitleOffsetY] = useState(0);
  const [ready, setReady] = useState(false);

  const measureBrandRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const brandWords = ["Make", "your", "websites"];
  const highlightWords = ["feel", "premium", "instantly"];

  const titleCx =
    "flex flex-wrap items-baseline justify-center gap-x-[0.1em] gap-y-2 md:gap-y-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-[1.15]";

  /* ─── Measure BEFORE first paint ─── */
  useLayoutEffect(() => {
    const brand = measureBrandRef.current;
    const container = containerRef.current;
    if (!brand || !container) return;

    const brandRect = brand.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const brandCenterX = brandRect.left + brandRect.width / 2;
    const containerCenterX = containerRect.left + containerRect.width / 2;
    setBrandOffsetX(containerCenterX - brandCenterX);

    const brandMidY = brandRect.top - containerRect.top + brandRect.height / 2;
    const containerMidY = containerRect.height / 2;
    setTitleOffsetY(containerMidY - brandMidY);

    setReady(true);
  }, []);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const startSequence = useCallback(() => {
    clearTimers();
    setPhase("fade-in");
    timersRef.current.push(setTimeout(() => setPhase("move"), 1200));
    timersRef.current.push(setTimeout(() => setPhase("reveal"), 1800));
    timersRef.current.push(setTimeout(() => setPhase("highlight"), 2500));
    timersRef.current.push(setTimeout(() => setPhase("done"), 3100));
  }, [clearTimers]);

  useEffect(() => {
    if (!ready) return;
    startSequence();
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  useEffect(() => clearTimers, [clearTimers]);

  /* ─── Derived flags ─── */
  const brandVisible = phase !== "measuring";
  const brandMoved =
    phase === "move" ||
    phase === "reveal" ||
    phase === "highlight" ||
    phase === "done";
  const showReveal =
    phase === "reveal" || phase === "highlight" || phase === "done";
  const showHighlight = phase === "highlight" || phase === "done";

  return (
    <div
      ref={containerRef}
      className={`relative w-full pb-3 md:pb-4 ${className ?? ""}`}
    >
      {/* ── Hidden sizing layer ── */}
      <h1
        className={`${titleCx} invisible pointer-events-none`}
        aria-hidden="true"
      >
        <span
          ref={measureBrandRef}
          className="inline-flex flex-wrap items-baseline justify-center gap-x-[0.3em] font-medium"
        >
          {brandWords.map((w, i) => (
            <span key={i} className="inline-block">
              {w}
            </span>
          ))}
        </span>
        <span className="inline-flex items-center gap-x-[0.3em] whitespace-nowrap mt-1 md:mt-2 ml-2 sm:ml-3 md:ml-4">
          <span className="relative inline-flex items-center gap-x-[0.3em]">
            {highlightWords.map((w, i) => (
              <span key={i} className="font-bold">
                {w}
              </span>
            ))}
          </span>
        </span>
      </h1>

      {/* ── Visible animated title ── */}
      <h1
        className={`${titleCx} absolute inset-x-0 top-0`}
        style={{
          visibility: ready ? "visible" : "hidden",
          transform: `translateY(${brandMoved ? 0 : titleOffsetY}px)`,
          transition: brandMoved
            ? "transform 0.75s cubic-bezier(0.22, 1, 0.36, 1)"
            : "none",
        }}
      >
        {/* "Built for Your Foundation" — fades in centered, then slides to position */}
        <span
          className="inline-flex flex-wrap items-baseline justify-center gap-x-[0.3em] font-medium text-foreground/85"
          style={{
            opacity: brandVisible ? 1 : 0,
            transform: `translateX(${brandMoved ? 0 : brandOffsetX}px)`,
            transition: brandMoved
              ? "opacity 0.55s ease-out, transform 0.75s cubic-bezier(0.22, 1, 0.36, 1)"
              : "opacity 0.55s ease-out",
          }}
        >
          {brandWords.map((w, i) => (
            <span key={i} className="inline-block">
              {w}
            </span>
          ))}
        </span>

        {/* "of Design Engineering" — reveals together, only "Design Engineering" gets highlight */}
        <span
          className="inline-flex items-center gap-x-[0.3em] whitespace-nowrap mt-1 md:mt-2 ml-2 sm:ml-3 md:ml-4"
          style={{
            opacity: showReveal ? 1 : 0,
            transform: `translateY(${showReveal ? 0 : 14}px)`,
            filter: `blur(${showReveal ? 0 : 8}px)`,
            transition:
              "opacity 0.5s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        >
          {/* Highlight sub-group */}
          <span className="relative inline-flex items-center gap-x-[0.3em]">
            {/* Highlight box sweeps left → right */}
            <span
              className="absolute -inset-x-1.5 -inset-y-0.5 sm:-inset-x-2 sm:-inset-y-1 md:-inset-x-2.5 md:-inset-y-1 rounded-xl sm:rounded-2xl bg-foreground pointer-events-none"
              style={{
                transformOrigin: "left center",
                transform: `scaleX(${showHighlight ? 1 : 0})`,
                transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
            {highlightWords.map((word, i) => (
              <span
                key={`hl-${i}`}
                className={`relative z-10 font-bold transition-colors duration-300 ${
                  showHighlight
                    ? "text-background delay-200"
                    : "text-foreground/85"
                }`}
              >
                {word}
              </span>
            ))}
          </span>
        </span>
      </h1>
    </div>
  );
}
