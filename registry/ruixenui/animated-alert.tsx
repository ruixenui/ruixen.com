"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  error: CircleAlert,
};

interface AnimatedAlertProps {
  variant?: "info" | "success" | "warning" | "error";
  title: string;
  description?: string;
  actions?: React.ReactNode;
  onDismiss?: () => void;
  autoDismiss?: number;
  show?: boolean;
  className?: string;
}

export default function AnimatedAlert({
  variant = "info",
  title,
  description,
  actions,
  onDismiss,
  autoDismiss,
  show = true,
  className,
}: AnimatedAlertProps) {
  const Icon = icons[variant];
  const [visible, setVisible] = useState(show);
  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;

  useEffect(() => {
    setVisible(show);
  }, [show]);

  useEffect(() => {
    if (!autoDismiss || !visible) return;
    const timer = setTimeout(() => {
      setVisible(false);
      onDismissRef.current?.();
    }, autoDismiss);
    return () => clearTimeout(timer);
  }, [autoDismiss, visible]);

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="alert"
          initial={{ opacity: 0, y: -8, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
          className={cn(
            "relative flex w-full gap-3 overflow-hidden rounded-lg border border-border/50 bg-card px-4 py-3 text-sm shadow-xs",
            className,
          )}
        >
          {autoDismiss && (
            <motion.div
              className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-muted-foreground/20"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{
                duration: autoDismiss / 1000,
                ease: "linear",
              }}
            />
          )}

          <div className="flex shrink-0 items-start pt-0.5">
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                delay: 0.1,
                duration: 0.4,
                bounce: 0.35,
              }}
            >
              <Icon
                className={cn(
                  "size-4",
                  variant === "info" && "text-muted-foreground",
                  variant === "success" &&
                    "text-emerald-500 dark:text-emerald-400",
                  variant === "warning" && "text-amber-500 dark:text-amber-400",
                  variant === "error" && "text-red-500 dark:text-red-400",
                )}
                strokeWidth={2}
                aria-hidden="true"
              />
            </motion.div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex flex-col gap-0.5">
              <p className="font-medium leading-snug text-card-foreground">
                {title}
              </p>
              {description && (
                <p className="leading-snug text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
            {actions && (
              <div className="flex flex-wrap items-center gap-3">{actions}</div>
            )}
          </div>

          <button
            onClick={handleDismiss}
            className="-mr-1 -mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Dismiss"
          >
            <X className="size-3.5" strokeWidth={2} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
