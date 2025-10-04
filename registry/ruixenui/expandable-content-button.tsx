"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandableContentButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  size?: "sm" | "md" | "lg";
  options?: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  }>;
}

const sizeConfig = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

export default function ExpandableContentButton({
  label,
  size = "md",
  options = [],
  className,
  ...props
}: ExpandableContentButtonProps) {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="inline-block relative">
      <Button
        className={cn(
          "flex justify-between items-center w-full",
          sizeConfig[size],
          className,
        )}
        onClick={() => setExpanded(!expanded)}
        {...props}
      >
        <span className="flex-1 text-left">{label}</span>
        <span className="flex-shrink-0 ml-2">
          {expanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </span>
      </Button>

      {expanded && options.length > 0 && (
        <div className="absolute mt-2 w-60 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 z-50 border border-gray-200 dark:border-gray-700">
          {options.map((opt, idx) => (
            <Button
              key={idx}
              variant="ghost"
              className="justify-start w-full flex items-center gap-2"
              onClick={() => {
                opt.onClick();
                setExpanded(false);
              }}
            >
              {opt.icon && <span className="w-5 h-5">{opt.icon}</span>}
              <span>{opt.label}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
