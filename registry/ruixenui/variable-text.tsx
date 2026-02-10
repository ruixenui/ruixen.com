"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   Variable Text — cursor is a focal plane. Characters near
   the pointer sharpen: heavier weight, slight lift, full
   opacity, subtle scale. Characters far from focus soften:
   lighter weight, smaller, translucent. The effect is
   photographic depth-of-field applied to typography.

   Single proximity spring per character → four derived
   motion values (fontWeight, scale, y, opacity). Geist's
   variable wght axis (100–900) enables sub-pixel-smooth
   weight transitions — fontWeight: 523.7 just works.
   ═══════════════════════════════════════════════════════════ */

type TextElement = "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface VariableTextProps {
  children: string;
  as?: TextElement;
  className?: string;
}

const SPRING = { stiffness: 400, damping: 28 };
const THRESHOLD = 100;

function Char({
  char,
  mouseX,
  mouseY,
}: {
  char: string;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sync = () => {
      pos.current = {
        x: el.offsetLeft + el.offsetWidth / 2,
        y: el.offsetTop + el.offsetHeight / 2,
      };
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  /* ── single proximity value: +1 (touching) → 0 (edge) → −1 (far) ── */
  const rawProximity = useTransform(mouseX, (mx) => {
    if (mx < -9000) return 0;
    const my = mouseY.get();
    const dx = mx - pos.current.x;
    const dy = my - pos.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < THRESHOLD) {
      const ratio = 1 - dist / THRESHOLD;
      return ratio * ratio; // quadratic ease — 0→1
    }
    return Math.max(-1, -((dist - THRESHOLD) / THRESHOLD)); // 0→−1
  });

  const proximity = useSpring(rawProximity, SPRING);

  /* ── four derived properties from one spring ── */
  const fontWeight = useTransform(proximity, (p) =>
    p >= 0 ? 400 + p * 400 : 400 + p * 150,
  ); // near: 400→800, far: 400→250

  const scale = useTransform(proximity, (p) =>
    p >= 0 ? 1 + p * 0.25 : 1 + p * 0.07,
  ); // near: 1→1.25, far: 1→0.93

  const y = useTransform(proximity, (p) => (p > 0 ? p * -6 : 0));
  // near: lift up to −6px

  const opacity = useTransform(proximity, (p) => (p >= 0 ? 1 : 1 + p * 0.55)); // far: 1→0.45

  return (
    <motion.span
      ref={ref}
      style={{
        fontWeight,
        scale,
        y,
        opacity,
        display: "inline-block",
        willChange: "transform, opacity, font-weight",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

export default function VariableText({
  children,
  as: Tag = "p",
  className,
}: VariableTextProps) {
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  return (
    <Tag
      className={cn("relative cursor-default select-none", className)}
      onMouseMove={(e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
      onMouseLeave={() => {
        mouseX.set(-9999);
        mouseY.set(-9999);
      }}
    >
      {Array.from(children).map((char, i) => (
        <Char key={i} char={char} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </Tag>
  );
}
