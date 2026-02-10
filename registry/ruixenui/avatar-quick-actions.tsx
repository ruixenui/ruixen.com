"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useState } from "react";

/* ═══════════════════════════════════════════════════════════
   Orbital Bloom — actions live behind the avatar. Hover and
   they spring outward radially with staggered timing, settling
   into orbit positions. Focus any action and the rest dim,
   drawing the eye. The avatar contracts to signal the release.
   No tooltip, no portal — same spatial plane.
   ═══════════════════════════════════════════════════════════ */

interface AvatarQuickActionsItem {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

interface AvatarQuickActionsProps {
  items: AvatarQuickActionsItem[];
  avatarSrc?: string;
  avatarFallback?: string;
  size?: number;
  className?: string;
}

export default function AvatarQuickActions({
  items,
  avatarSrc,
  avatarFallback,
  size = 44,
  className,
}: AvatarQuickActionsProps) {
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const actionSize = Math.round(size * 0.7);
  const orbit = Math.round(size * 0.95);
  const container = orbit * 2 + actionSize;

  const step = (2 * Math.PI) / items.length;
  const start = -Math.PI / 2;

  return (
    <div
      className={cn("relative", className)}
      style={{ width: container, height: container }}
      onMouseLeave={() => {
        setOpen(false);
        setActiveIdx(null);
      }}
    >
      {/* orbit ring */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-border/30"
        style={{
          width: orbit * 2,
          height: orbit * 2,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          opacity: open ? 1 : 0,
          scale: open ? 1 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />

      {/* avatar */}
      <motion.div
        className="absolute left-1/2 top-1/2 z-20 cursor-pointer"
        style={{ width: size, height: size, x: "-50%", y: "-50%" }}
        animate={{ scale: open ? 0.92 : 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 22 }}
        onMouseEnter={() => setOpen(true)}
      >
        <div className="size-full overflow-hidden rounded-full border-2 border-background shadow-sm">
          <Avatar className="size-full">
            {avatarSrc && (
              <AvatarImage src={avatarSrc} alt={avatarFallback || ""} />
            )}
            <AvatarFallback className="text-sm font-medium">
              {avatarFallback?.[0]?.toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
        </div>
      </motion.div>

      {/* orbiting actions */}
      {items.map((item, idx) => {
        const angle = start + idx * step;
        const tx = Math.cos(angle) * orbit;
        const ty = Math.sin(angle) * orbit;
        const active = activeIdx === idx;
        const labelAbove = ty < 0;

        return (
          <motion.div
            key={item.label}
            className="absolute left-1/2 top-1/2"
            style={{
              width: actionSize,
              height: actionSize,
              marginLeft: -actionSize / 2,
              marginTop: -actionSize / 2,
              zIndex: active ? 30 : 10,
              pointerEvents: open ? "auto" : "none",
            }}
            animate={{
              x: open ? tx : 0,
              y: open ? ty : 0,
              scale: open ? (active ? 1.15 : 1) : 0,
              opacity: open ? (activeIdx !== null && !active ? 0.5 : 1) : 0,
            }}
            transition={{
              x: {
                type: "spring",
                stiffness: 380,
                damping: 22,
                delay: open ? idx * 0.04 : 0,
              },
              y: {
                type: "spring",
                stiffness: 380,
                damping: 22,
                delay: open ? idx * 0.04 : 0,
              },
              scale: {
                type: "spring",
                stiffness: 420,
                damping: 22,
                delay: open ? idx * 0.04 : 0,
              },
              opacity: { duration: 0.15, delay: open ? idx * 0.04 : 0 },
            }}
            onMouseEnter={() => setActiveIdx(idx)}
            onMouseLeave={() => setActiveIdx(null)}
          >
            <button
              type="button"
              onClick={item.onClick}
              className="flex size-full cursor-pointer items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition-colors hover:text-foreground"
            >
              {item.icon}
            </button>

            <AnimatePresence>
              {active && (
                <motion.span
                  initial={{ opacity: 0, y: labelAbove ? 3 : -3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: labelAbove ? 3 : -3 }}
                  transition={{ type: "spring", stiffness: 380, damping: 20 }}
                  className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium text-muted-foreground"
                  style={
                    labelAbove
                      ? { bottom: "100%", paddingBottom: 4 }
                      : { top: "100%", paddingTop: 4 }
                  }
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
