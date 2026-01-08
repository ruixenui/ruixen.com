"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AvatarBadgeProps {
  src?: string;
  alt?: string;
  fallback?: string;
  count?: number;
  className?: string;
}

export default function AvatarBadge({
  src = "https://github.com/shadcn.png",
  alt = "User",
  fallback = "U",
  count = 6,
  className,
}: AvatarBadgeProps) {
  return (
    <div className={cn("relative", className)}>
      <Avatar className="size-10 rounded-lg">
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback className="rounded-lg">{fallback}</AvatarFallback>
      </Avatar>
      <Badge className="border-background absolute -top-1 left-full min-w-5 -translate-x-4 px-1">
        {count}
      </Badge>
    </div>
  );
}
