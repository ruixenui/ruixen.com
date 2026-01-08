"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarVerifiedProps {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
}

export default function AvatarVerified({
  src = "https://github.com/shadcn.png",
  alt = "User",
  fallback = "U",
  className,
}: AvatarVerifiedProps) {
  return (
    <div className={cn("relative", className)}>
      <Avatar className="size-10 rounded-lg">
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback className="rounded-lg">{fallback}</AvatarFallback>
      </Avatar>
      <span className="absolute -end-1 -top-1 rounded-full bg-background p-0.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-4 text-primary"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
            clipRule="evenodd"
          />
        </svg>
        <span className="sr-only">Verified</span>
      </span>
    </div>
  );
}
