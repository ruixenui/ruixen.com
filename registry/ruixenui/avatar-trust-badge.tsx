"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarData {
  src?: string;
  alt?: string;
  fallback: string;
}

interface AvatarTrustBadgeProps {
  avatars: AvatarData[];
  count: string;
  label?: string;
  className?: string;
}

export default function AvatarTrustBadge({
  avatars,
  count,
  label = "Trusted by",
  className,
}: AvatarTrustBadgeProps) {
  const displayAvatars = avatars.slice(0, 5);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-full border bg-background/80 px-4 py-2 backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex -space-x-2">
        {displayAvatars.map((avatar, index) => (
          <Avatar key={index} className="size-8 ring-2 ring-background">
            <AvatarImage src={avatar.src} alt={avatar.alt || avatar.fallback} />
            <AvatarFallback className="text-xs font-medium">
              {avatar.fallback}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        {label} <span className="font-semibold text-foreground">{count}</span>
      </p>
    </div>
  );
}
