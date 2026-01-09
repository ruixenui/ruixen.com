"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarFallbackOnlyProps {
  fallback?: string;
  className?: string;
}

export default function AvatarFallbackOnly({
  fallback = "KK",
  className,
}: AvatarFallbackOnlyProps) {
  return (
    <Avatar className={cn("size-10", className)}>
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
