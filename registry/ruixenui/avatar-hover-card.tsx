"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useId, useRef, useState } from "react";

export interface AvatarHoverCardProps {
  imageSrc: string;
  imageAlt?: string;
  name: string;
  username?: string;
  description?: string;
  stats?: { label: string; value: string }[];
  actions?: ReactNode;
  size?: "sm" | "md" | "lg";
  align?: "start" | "center" | "end";
  className?: string;
}

const triggerSizes = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function AvatarHoverCard({
  imageSrc,
  imageAlt,
  name,
  username,
  description,
  stats,
  actions,
  size = "md",
  align = "start",
  className,
}: AvatarHoverCardProps) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const uid = useId();

  const show = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(true), 80);
  };

  const hide = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 100);
  };

  const alignClass: Record<string, string> = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  };

  const spring = { type: "spring" as const, stiffness: 500, damping: 35 };

  const avatarContent = (
    <Avatar className="size-full">
      <AvatarImage src={imageSrc} alt={imageAlt || name} />
      <AvatarFallback className="text-xs font-medium">
        {initials(name)}
      </AvatarFallback>
    </Avatar>
  );

  return (
    <div
      className={cn("relative inline-flex", className)}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {/* Trigger — always in flow for layout stability */}
      <div
        className={cn(
          "rounded-full transition-shadow duration-200",
          triggerSizes[size],
          open
            ? "ring-[1.5px] ring-foreground/8"
            : "ring-[1.5px] ring-transparent",
        )}
      >
        {!open && (
          <motion.div
            layoutId={`${uid}-av`}
            className="size-full cursor-pointer overflow-hidden rounded-full"
            transition={spring}
          >
            {avatarContent}
          </motion.div>
        )}
      </div>

      {/* Card */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={cn("absolute top-full z-50 pt-1.5", alignClass[align])}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            <div className="w-[280px] overflow-hidden rounded-xl border border-border/50 bg-popover p-3.5 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.12),0_2px_8px_-2px_rgba(0,0,0,0.05)]">
              {/* Header — avatar morphs here via layoutId */}
              <div className="flex items-start gap-3">
                <motion.div
                  layoutId={`${uid}-av`}
                  className={cn(
                    "shrink-0 overflow-hidden rounded-full",
                    triggerSizes[size],
                  )}
                  transition={spring}
                >
                  {avatarContent}
                </motion.div>
                <motion.div
                  className="min-w-0 pt-0.5"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06, ...spring }}
                >
                  <p className="truncate text-[14px] font-semibold leading-tight text-foreground">
                    {name}
                  </p>
                  {username && (
                    <p className="mt-0.5 truncate text-[13px] leading-tight text-muted-foreground">
                      @{username}
                    </p>
                  )}
                </motion.div>
              </div>

              {/* Description */}
              {description && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                  className="mt-2.5 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground"
                >
                  {description}
                </motion.p>
              )}

              {/* Stats */}
              {stats && stats.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.14, duration: 0.2 }}
                  className="mt-2.5 flex items-center gap-3.5"
                >
                  {stats.map((s) => (
                    <span
                      key={s.label}
                      className="text-[13px] text-muted-foreground"
                    >
                      <span className="font-semibold text-foreground">
                        {s.value}
                      </span>{" "}
                      {s.label}
                    </span>
                  ))}
                </motion.div>
              )}

              {/* Actions */}
              {actions && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.2 }}
                  className="mt-3"
                >
                  {actions}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
