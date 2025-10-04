"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { FaCheck, FaTimes } from "react-icons/fa";

export type ButtonState = "idle" | "loading" | "success" | "error";

interface MultiStateMorphButtonProps {
  label?: string;
  onClick?: () => Promise<void> | void;
  className?: string;
  width?: number;
  height?: number;
  colors?: {
    idle?: string;
    loading?: string;
    success?: string;
    error?: string;
  };
}

export default function MultiStateMorphButton({
  label = "Submit",
  onClick,
  className,
  width = 200,
  height = 50,
  colors = {},
}: MultiStateMorphButtonProps) {
  const [state, setState] = React.useState<ButtonState>("idle");

  const handleClick = async () => {
    if (state === "loading") return;
    setState("loading");
    try {
      await onClick?.();
      setState("success");
      setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 2000);
    }
  };

  const stateColors = {
    idle: colors.idle || "#3b82f6",
    loading: colors.loading || "#2563eb",
    success: colors.success || "#16a34a",
    error: colors.error || "#dc2626",
  };

  return (
    <motion.div
      className="inline-block"
      style={{ width, height }}
      animate={{
        borderRadius: state === "success" || state === "error" ? height / 2 : 8,
      }}
      transition={{ duration: 0.4 }}
    >
      <Button
        className={cn(
          "w-full h-full flex items-center justify-center text-white transition-colors duration-300",
          className,
        )}
        onClick={handleClick}
        style={{ backgroundColor: stateColors[state] }}
      >
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {label}
            </motion.span>
          )}
          {state === "loading" && (
            <motion.span
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="animate-spin"
            >
              ⏳
            </motion.span>
          )}
          {state === "success" && (
            <motion.span
              key="success"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <FaCheck />
            </motion.span>
          )}
          {state === "error" && (
            <motion.span
              key="error"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <FaTimes />
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  );
}
