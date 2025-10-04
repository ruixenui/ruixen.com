"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HoverPreviewButtonProps {
  label: string;
  previewContent: React.ReactNode;
  className?: string;
}

export default function HoverPreviewButton({
  label,
  previewContent,
  className,
}: HoverPreviewButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button className={cn("relative", className)}>{label}</Button>

      {isHovered && (
        <div className="absolute z-50 top-full mt-2 left-1/2 -translate-x-1/2 w-64 p-2 rounded-lg border bg-background shadow-lg">
          {previewContent}
        </div>
      )}
    </div>
  );
}
