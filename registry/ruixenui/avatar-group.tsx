"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarData {
  src?: string;
  alt?: string;
  fallback: string;
}

interface AvatarGroupProps {
  avatars: AvatarData[];
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
};

const spacingClasses = {
  sm: "-space-x-2",
  md: "-space-x-3",
  lg: "-space-x-4",
};

export default function AvatarGroup({
  avatars,
  max = 4,
  size = "md",
  className,
}: AvatarGroupProps) {
  const displayAvatars = avatars.slice(0, max);

  return (
    <div className={cn("flex", spacingClasses[size], className)}>
      {displayAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          className={cn(
            sizeClasses[size],
            "ring-2 ring-background transition-transform hover:z-10 hover:scale-110",
          )}
        >
          <AvatarImage src={avatar.src} alt={avatar.alt || avatar.fallback} />
          <AvatarFallback className="text-xs font-medium">
            {avatar.fallback}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}
