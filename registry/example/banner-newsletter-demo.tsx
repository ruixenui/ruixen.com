"use client";

import { useState, useCallback } from "react";
import BannerNewsletter from "@/registry/ruixenui/banner-newsletter";
import { RotateCcw } from "lucide-react";

export default function BannerNewsletterDemo() {
  const [key, setKey] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  const handleSubscribe = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
  };

  const replay = useCallback(() => {
    setKey((k) => k + 1);
    setDismissed(false);
  }, []);

  return (
    <div className="flex min-h-[300px] w-full flex-col">
      <div className="w-full">
        <BannerNewsletter
          key={key}
          onSubscribe={handleSubscribe}
          onDismiss={() => setDismissed(true)}
        />
      </div>

      <div
        className={`flex flex-1 items-center justify-center transition-opacity duration-300 ${
          dismissed ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          onClick={replay}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <RotateCcw className="size-3.5" />
          Replay
        </button>
      </div>
    </div>
  );
}
