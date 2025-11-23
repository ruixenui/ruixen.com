"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import Link from "next/link";

const GITHUB_URL = "https://github.com/ruixenui/ruixen.com";

export default function GitHubStarPopup() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStar = () => {
    window.open(GITHUB_URL, "_blank", "noopener,noreferrer");
  };

  if (!mounted) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-[2147483647] pointer-events-none"
      role="status"
      aria-live="polite"
    >
      <div className="pointer-events-auto animate-in slide-in-from-bottom-5 fade-in duration-700 ease-out">
        <div className="relative group">
          {/* Water glass effect - frosted glass with liquid shimmer */}
          <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent rounded-xl blur-md opacity-70 group-hover:opacity-90 transition-all duration-500" />
          <div className="absolute -inset-0.5 bg-gradient-to-tr from-background/40 via-background/20 to-transparent rounded-xl blur-sm" />

          <div className="relative w-[220px] rounded-xl border border-blue-600 bg-background/80 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Liquid wave animation */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div
                className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent animate-pulse"
                style={{ animationDuration: "3s" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/10 to-transparent animate-pulse"
                style={{ animationDuration: "4s", animationDelay: "1s" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent animate-pulse"
                style={{ animationDuration: "3s" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/10 to-transparent animate-pulse"
                style={{ animationDuration: "4s", animationDelay: "1s" }}
              />
            </div>

            <div className="relative p-3">
              <div className="flex flex-col space-y-2">
                <p className="text-[11px] text-muted-foreground leading-snug">
                  Star us & join{" "}
                  <Link
                    href="/supporters"
                    className="text-blue-600 underline font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    supporters page
                  </Link>
                </p>

                <Button
                  onClick={handleStar}
                  size="sm"
                  className={cn(
                    "h-7 w-full rounded-md font-medium text-[11px]",
                    "bg-gradient-to-r from-primary to-primary/80",
                    "hover:from-primary/90 hover:to-primary/70",
                    "shadow-md hover:shadow-lg hover:scale-[1.02]",
                    "transition-all duration-300",
                  )}
                >
                  <Star className="h-3 w-3 mr-1 fill-current text-yellow-400 animate-bounce duration-200 [animation-iteration-count:3]" />
                  Star on GitHub
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
