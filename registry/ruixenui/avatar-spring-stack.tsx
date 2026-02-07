"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

/* ═══════════════════════════════════════════════════════════
   Magnetic Repulsion — each avatar is a charged body. Hover
   one and neighbors spring away in proportion to 1/distance,
   creating a lens-like spread that follows your cursor.
   The wave isn't animated — it emerges from the spring physics.
   ═══════════════════════════════════════════════════════════ */

interface AvatarSpringStackItem {
  src: string;
  alt?: string;
  label?: string;
}

interface AvatarSpringStackProps {
  avatars: AvatarSpringStackItem[];
  maxVisible?: number;
  size?: number;
  className?: string;
}

export default function AvatarSpringStack({
  avatars,
  maxVisible = 5,
  size = 44,
  className,
}: AvatarSpringStackProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const visible = avatars.slice(0, maxVisible);
  const extra = avatars.length - maxVisible;
  const total = visible.length + (extra > 0 ? 1 : 0);

  const overlap = Math.round(size * 0.32);
  const step = size - overlap;
  const spread = Math.round(size * 0.45);

  function getOffset(idx: number) {
    if (activeIdx === null) return 0;
    const d = idx - activeIdx;
    if (d === 0) return 0;
    return (d > 0 ? 1 : -1) * (spread / Math.abs(d));
  }

  const hasActive = activeIdx !== null;

  return (
    <div
      className={cn("relative", className)}
      style={{ width: (total - 1) * step + size, height: size }}
      onMouseLeave={() => setActiveIdx(null)}
    >
      {visible.map((avatar, idx) => {
        const active = activeIdx === idx;

        return (
          <motion.div
            key={idx}
            className="absolute top-0 cursor-pointer"
            animate={{
              x: idx * step + getOffset(idx),
              y: active ? -6 : 0,
              scale: active ? 1.08 : 1,
            }}
            transition={{
              x: { type: "spring", stiffness: 500, damping: 30 },
              y: { type: "spring", stiffness: 420, damping: 22 },
              scale: { type: "spring", stiffness: 420, damping: 22 },
            }}
            style={{
              width: size,
              height: size,
              zIndex: active ? 50 : total - idx,
            }}
            onMouseEnter={() => setActiveIdx(idx)}
          >
            <div
              className="size-full overflow-hidden rounded-full border-2 border-background"
              style={{
                opacity: hasActive && !active ? 0.65 : 1,
                transition: "opacity 0.2s",
              }}
            >
              <Avatar className="size-full">
                <AvatarImage
                  src={avatar.src}
                  alt={avatar.alt || avatar.label || ""}
                />
                <AvatarFallback className="text-xs font-medium">
                  {avatar.label?.[0]?.toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
            </div>

            <AnimatePresence>
              {active && avatar.label && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ type: "spring", stiffness: 380, damping: 20 }}
                  className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap pt-1.5 text-[11px] font-medium text-muted-foreground"
                  style={{ top: "100%" }}
                >
                  {avatar.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {extra > 0 && (
        <motion.div
          className="absolute top-0"
          animate={{
            x: visible.length * step + getOffset(visible.length),
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          style={{ width: size, height: size, zIndex: 0 }}
        >
          <div
            className="flex size-full items-center justify-center rounded-full border-2 border-background bg-muted font-semibold text-muted-foreground"
            style={{
              fontSize: Math.round(size * 0.3),
              opacity: hasActive ? 0.65 : 1,
              transition: "opacity 0.2s",
            }}
          >
            +{extra}
          </div>
        </motion.div>
      )}
    </div>
  );
}
