"use client";

import { useState, useCallback } from "react";
import BannerCookie from "@/registry/ruixenui/banner-cookie";
import { RotateCcw } from "lucide-react";

export default function BannerCookieDemo() {
  const [key, setKey] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  const replay = useCallback(() => {
    setKey((k) => k + 1);
    setDismissed(false);
  }, []);

  return (
    <div className="relative flex min-h-[400px] w-full items-center justify-center overflow-hidden">
      {/* Ambient glow — makes the card's depth visible */}
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-56 w-56 rounded-full bg-gradient-to-tr from-primary/[0.07] to-transparent blur-3xl" />

      <div
        className={`transition-opacity duration-300 ${
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

      <div className="absolute bottom-5 left-5">
        <BannerCookie
          key={key}
          onAccept={() => setDismissed(true)}
          onDecline={() => setDismissed(true)}
        />
      </div>
    </div>
  );
}
