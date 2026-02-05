"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { forwardRef, useState } from "react";

export interface AccordionAnimatedItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionAnimatedProps {
  items: AccordionAnimatedItem[];
  defaultValue?: string;
  className?: string;
}

export default function AccordionAnimated({
  items,
  defaultValue,
  className,
}: AccordionAnimatedProps) {
  const [openItem, setOpenItem] = useState<string | undefined>(defaultValue);

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item) => {
        const isOpen = openItem === item.id;
        return (
          <motion.div
            key={item.id}
            initial={false}
            animate={{
              backgroundColor: isOpen ? "hsl(var(--muted))" : "transparent",
            }}
            className="rounded-xl border overflow-hidden"
          >
            <button
              onClick={() => setOpenItem(isOpen ? undefined : item.id)}
              className="flex w-full items-center justify-between px-5 py-4 text-left text-[15px] font-medium transition-colors hover:bg-muted/50"
            >
              {item.title}
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 text-sm text-muted-foreground">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
