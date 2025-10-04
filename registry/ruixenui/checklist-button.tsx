"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface ChecklistButtonProps {
  label?: string;
  doneLabel?: string;
  onDone?: () => void;
  resettable?: boolean;
  icon?: React.ReactNode;
  doneIcon?: React.ReactNode;
  className?: string;
}

export default function ChecklistButton({
  label = "Mark as Done",
  doneLabel = "Done",
  onDone,
  resettable = false,
  icon,
  doneIcon = <Check className="w-4 h-4 text-green-600" />,
  className,
}: ChecklistButtonProps) {
  const [done, setDone] = React.useState(false);

  const handleClick = () => {
    if (done && resettable) {
      setDone(false);
      return;
    }
    if (!done) {
      setDone(true);
      onDone?.();
    }
  };

  return (
    <Button
      variant={done ? "secondary" : "default"}
      className={`relative w-40 flex bg-white text-black dark:bg-black dark:text-white border hover:bg-white justify-center items-center ${className}`}
      onClick={handleClick}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!done ? (
          <motion.span
            key="label"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            {icon}
            {label}
          </motion.span>
        ) : (
          <motion.span
            key="check"
            initial={{ scale: 0, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex items-center gap-2"
          >
            {doneIcon}
            {doneLabel}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}
