"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";

/**
 * Wordmark Footer — Rauno Freiberg craft, Ruixen UI edition.
 *
 * Centered giant wordmark on a full-width dark surface with a subtle
 * bottom clip. Move your cursor and the metallic shine follows —
 * a radial gradient spotlight tracks the pointer with lerped
 * smoothing at 60fps via direct DOM writes, zero re-renders.
 * A vertical mask handles the half-cut fade independently.
 * cursor: pointer. The light IS the interaction.
 */

/* ── Types ── */

interface WordmarkFooterProps {
  brandName?: string;
}

/* ── Scoped CSS ── */

const STYLE = `
.wf{
  --wf-bg:#161618;
  --wf-line:rgba(255,255,255,.07)
}
.dark .wf,[data-theme="dark"] .wf{
  --wf-bg:#111113;
  --wf-line:rgba(255,255,255,.08)
}
`.replace(/\n/g, "");

/* ── Radial shine gradient — follows cursor ── */

function makeShine(x: number, y: number): string {
  return `radial-gradient(ellipse 100% 100% at ${x.toFixed(1)}% ${y.toFixed(1)}%, rgba(255,255,255,.88) 0%, rgba(255,255,255,.62) 24%, rgba(255,255,255,.34) 50%, rgba(255,255,255,.16) 100%)`;
}

/* ── Vertical mask — dims bottom for the half-cut, independent of shine ── */

const VMASK =
  "linear-gradient(to bottom, black 0%, black 38%, rgba(0,0,0,.55) 76%, rgba(0,0,0,.30) 100%)";

/* ── Main component ── */

export function WordmarkFooter({
  brandName = "Ruixen UI",
}: WordmarkFooterProps) {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  /* ── Cursor-tracking state — refs only, zero re-renders ── */

  const hovering = useRef(false);
  const curX = useRef(50);
  const curY = useRef(30);
  const tgtX = useRef(50);
  const tgtY = useRef(30);
  const raf = useRef(0);

  /* ── Per-frame lerp loop — direct DOM writes ── */

  const paint = useCallback(() => {
    curX.current += (tgtX.current - curX.current) * 0.1;
    curY.current += (tgtY.current - curY.current) * 0.1;

    const grad = makeShine(curX.current, curY.current);

    if (textRef.current) {
      textRef.current.style.backgroundImage = grad;
    }

    const dx = Math.abs(tgtX.current - curX.current);
    const dy = Math.abs(tgtY.current - curY.current);

    if (hovering.current || dx > 0.05 || dy > 0.05) {
      raf.current = requestAnimationFrame(paint);
    }
  }, []);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const r = sectionRef.current?.getBoundingClientRect();
      if (!r) return;
      tgtX.current = ((e.clientX - r.left) / r.width) * 100;
      tgtY.current = ((e.clientY - r.top) / r.height) * 100;

      if (!hovering.current) {
        hovering.current = true;
        raf.current = requestAnimationFrame(paint);
      }
    },
    [paint],
  );

  const onLeave = useCallback(() => {
    hovering.current = false;
    tgtX.current = 50;
    tgtY.current = 30;
    raf.current = requestAnimationFrame(paint);
  }, [paint]);

  /* ── Cleanup ── */

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  /* ── IntersectionObserver ── */

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="wf"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        background: "var(--wf-bg)",
        height: "clamp(100px, 15.5vw, 215px)",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        cursor: "pointer",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />

      {/* ── Wordmark — absolute, centered, pointer-events off ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(10px, 2vw, 24px)",
          padding: "clamp(20px, 3vw, 40px) clamp(24px, 4vw, 56px)",
          pointerEvents: "none",
        }}
      >
        {/* Brand text */}
        <span
          ref={textRef}
          style={{
            fontSize: "clamp(64px, 17vw, 240px)",
            fontWeight: 700,
            letterSpacing: "-0.05em",
            lineHeight: 1,
            backgroundImage: makeShine(50, 30),
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            maskImage: VMASK,
            WebkitMaskImage: VMASK,
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          {brandName}
        </span>
      </motion.div>

      {/* ── Hairline — just above the clip edge ── */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "clamp(10px, 1.5vw, 22px)",
          height: 0.5,
          background: "var(--wf-line)",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}

export default WordmarkFooter;
