"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvatarIconProps {
  className?: string;
}

export default function AvatarIcon({ className }: AvatarIconProps) {
  return (
    <Avatar className={cn("size-10", className)}>
      <AvatarFallback>
        <UserRound
          className="opacity-60"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
      </AvatarFallback>
    </Avatar>
  );
}
