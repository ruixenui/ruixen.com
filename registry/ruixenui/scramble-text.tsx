"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════
   Scramble Text — hover triggers a decode sequence. Characters
   dissolve into random glyphs, then resolve in a directional
   wave that follows your entry point. Left-side entry sweeps
   left-to-right; right-side entry sweeps right-to-left. The
   direction is discovered, not configured.

   Each character locks in with a three-spring pop: y snaps up
   from below (stiffness 500, damping 20 — visible overshoot),
   scaleY expands from compressed (600/24 — crisp snap), and
   opacity fades in (400/28 — smooth). The staggered wave of
   these pops is the entire identity of the component.
   ═══════════════════════════════════════════════════════════ */

type TextElement = "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface ScrambleTextProps {
  children: string;
  as?: TextElement;
  className?: string;
}

const GLYPHS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
const TICK = 30;
const STAGGER = 1.4;

function glyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

interface Cell {
  char: string;
  locked: boolean;
}

export default function ScrambleText({
  children,
  as: Tag = "p",
  className,
}: ScrambleTextProps) {
  const text = children;
  const len = text.length;
  const active = useRef(false);
  const timer = useRef<ReturnType<typeof setInterval>>();

  const [cells, setCells] = useState<Cell[]>(() =>
    text.split("").map((c) => ({ char: c, locked: true })),
  );

  useEffect(() => {
    setCells(text.split("").map((c) => ({ char: c, locked: true })));
  }, [text]);

  const play = useCallback(
    (fromLeft: boolean) => {
      if (active.current) return;
      active.current = true;
      let tick = 0;

      setCells(
        text
          .split("")
          .map((c) =>
            c === " "
              ? { char: " ", locked: true }
              : { char: glyph(), locked: false },
          ),
      );

      timer.current = setInterval(() => {
        tick++;

        setCells(
          text.split("").map((c, i) => {
            if (c === " ") return { char: " ", locked: true };
            const order = fromLeft ? i : len - 1 - i;
            const resolveAt = Math.floor(order * STAGGER) + 2;
            if (tick >= resolveAt) return { char: c, locked: true };
            return { char: glyph(), locked: false };
          }),
        );

        const end = Math.floor((len - 1) * STAGGER) + 5;
        if (tick >= end) {
          clearInterval(timer.current);
          setCells(text.split("").map((c) => ({ char: c, locked: true })));
          active.current = false;
        }
      }, TICK);
    },
    [text, len],
  );

  useEffect(() => () => clearInterval(timer.current), []);

  return (
    <Tag
      className={cn("relative cursor-default", className)}
      onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        play(e.clientX - rect.left < rect.width / 2);
      }}
    >
      {cells.map((cell, i) => (
        <motion.span
          key={i}
          animate={{
            y: cell.locked ? 0 : 4,
            scaleY: cell.locked ? 1 : 0.85,
            opacity: cell.locked ? 1 : 0.35,
          }}
          transition={{
            y: { type: "spring", stiffness: 500, damping: 20 },
            scaleY: { type: "spring", stiffness: 600, damping: 24 },
            opacity: { type: "spring", stiffness: 400, damping: 28 },
          }}
          className="inline-block"
          style={{ transformOrigin: "center bottom" }}
        >
          {cell.char === " " ? "\u00A0" : cell.char}
        </motion.span>
      ))}
    </Tag>
  );
}
