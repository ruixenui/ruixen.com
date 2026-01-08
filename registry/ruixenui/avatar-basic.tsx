"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarBasicProps {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
}

export default function AvatarBasic({
  src = "https://github.com/shadcn.png",
  alt = "User",
  fallback = "U",
  className,
}: AvatarBasicProps) {
  return (
    <Avatar className={cn("size-10", className)}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
