"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IconGridButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  size?: "sm" | "md" | "lg";
  icons?: Array<{ icon: React.ReactNode; onClick: () => void }>;
}

const sizeConfig = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

export default function IconGridButton({
  label,
  size = "md",
  icons = [],
  className,
  ...props
}: IconGridButtonProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block">
      <Button
        className={cn(sizeConfig[size], className)}
        onClick={() => setOpen(!open)}
        {...props}
      >
        {label}
      </Button>
      {open && (
        <div className="absolute mt-2 grid grid-cols-4 gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-2 z-50">
          {icons.map((item, idx) => (
            <Button
              key={idx}
              variant="ghost"
              className="flex items-center justify-center p-2"
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
            >
              {item.icon}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
