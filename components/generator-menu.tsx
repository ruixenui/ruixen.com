"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const generators = [
  {
    title: "Glass Morphism",
    href: "/glass-morphism",
    description: "Create stunning glass morphism effects",
  },
  {
    title: "Shadow Generator",
    href: "/shadow-generator",
    description: "Generate custom CSS shadows",
  },
];

export function GeneratorMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={cn(
          "flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground/80",
          isOpen ? "text-foreground" : "text-foreground/60"
        )}
      >
        Generator
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{
              type: "spring",
              mass: 0.5,
              damping: 20,
              stiffness: 300,
            }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
          >
            <div className="bg-background/95 backdrop-blur-lg rounded-lg border border-border shadow-lg overflow-hidden min-w-[280px]">
              <div className="p-2">
                {generators.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block p-3 rounded-md hover:bg-accent transition-colors group"
                  >
                    <div className="font-medium text-sm text-foreground group-hover:text-foreground">
                      {item.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {item.description}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
