"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarOnlineProps {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
}

export default function AvatarOnline({
  src = "https://github.com/shadcn.png",
  alt = "User",
  fallback = "U",
  className,
}: AvatarOnlineProps) {
  return (
    <div className={cn("relative", className)}>
      <Avatar className="size-10 rounded-lg">
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback className="rounded-lg">{fallback}</AvatarFallback>
      </Avatar>
      <span className="border-background absolute bottom-0 end-0 size-3 rounded-full border-2 bg-emerald-500">
        <span className="sr-only">Online</span>
      </span>
    </div>
  );
}
