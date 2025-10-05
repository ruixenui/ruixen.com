"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ElitePlanCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  title: string;
  subtitle: string;
  description: string;
  highlights?: string[]; // new section for extra text
  onAction?: () => void;
}

export const ElitePlanCard = React.forwardRef<
  HTMLDivElement,
  ElitePlanCardProps
>(
  (
    {
      className,
      imageUrl,
      title,
      subtitle,
      description,
      highlights = [],
      onAction,
      ...props
    },
    ref,
  ) => {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        className={cn(
          "relative w-full max-w-sm overflow-hidden rounded-3xl hover:shadow-xl bg-black",
          className,
        )}
      >
        {/* Top image with parallax */}
        <motion.div
          className="relative h-64 w-full overflow-hidden"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.45 }}
        >
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
          {/* Fade connection between image and black background */}
          <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-black via-black/80 to-transparent" />
        </motion.div>

        {/* Bottom content */}
        <div className="relative z-10 p-6 bg-black text-white">
          <p className="text-sm uppercase tracking-wider text-gray-400">
            {subtitle}
          </p>
          <h3 className="mt-1 text-2xl font-bold">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-gray-300">
            {description}
          </p>

          {/* Highlights */}
          {highlights.length > 0 && (
            <ul className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-400">
              {highlights.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 rounded-md bg-gray-800/50 px-2 py-1"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  {item}
                </li>
              ))}
            </ul>
          )}

          {/* CTA */}
          {onAction && (
            <div className="mt-6">
              <Button
                variant="default"
                onClick={onAction}
                className="w-full bg-white text-black hover:bg-gray-200"
              >
                Learn More
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    );
  },
);

ElitePlanCard.displayName = "ElitePlanCard";
