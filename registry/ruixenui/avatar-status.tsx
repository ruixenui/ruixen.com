"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarStatusProps {
  src?: string;
  alt?: string;
  fallback?: string;
  status?: "online" | "offline" | "busy" | "away";
  className?: string;
}

const statusColors = {
  online: "bg-emerald-500",
  offline: "bg-muted-foreground",
  busy: "bg-red-500",
  away: "bg-amber-500",
};

export default function AvatarStatus({
  src = "https://github.com/shadcn.png",
  alt = "User",
  fallback = "U",
  status = "online",
  className,
}: AvatarStatusProps) {
  return (
    <div className={cn("relative", className)}>
      <Avatar className="size-10 rounded-lg">
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback className="rounded-lg">{fallback}</AvatarFallback>
      </Avatar>
      <span
        className={cn(
          "border-background absolute -end-1 -top-1 size-3 rounded-full border-2",
          statusColors[status],
        )}
      >
        <span className="sr-only">{status}</span>
      </span>
    </div>
  );
}
