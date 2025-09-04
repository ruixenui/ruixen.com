"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface GlowLinkButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  href?: string;
}

export default function GlowLinkButton({
  className,
  label = "Explore on GitHub",
  href = "https://github.com/ruixenui",
  ...props
}: GlowLinkButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "relative group px-5 h-11 rounded-full overflow-hidden",
          "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800",
          "text-zinc-800 dark:text-zinc-100",
          "transition-all duration-300 ease-out hover:shadow-md",
          className,
        )}
        {...props}
      >
        {/* Soft glow on hover */}
        <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-zinc-100 to-transparent dark:via-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none rounded-full" />

        {/* Button Content */}
        <div className="relative flex items-center gap-2 font-medium">
          <span>{label}</span>
          <ArrowUpRight
            className={cn(
              "w-4 h-4 transition-transform duration-300",
              hovered
                ? "translate-x-1 -translate-y-1"
                : "translate-x-0 translate-y-0",
            )}
          />
        </div>
      </Button>
    </a>
  );
}
