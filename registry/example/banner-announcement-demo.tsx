"use client";

import { useState, useCallback } from "react";
import BannerAnnouncement from "@/registry/ruixenui/banner-announcement";
import { RotateCcw } from "lucide-react";

export default function BannerAnnouncementDemo() {
  const [key, setKey] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  const replay = useCallback(() => {
    setKey((k) => k + 1);
    setDismissed(false);
  }, []);

  return (
    <div className="flex min-h-[300px] w-full flex-col">
      <div className="w-full">
        <BannerAnnouncement
          key={key}
          badge="New"
          action={{ label: "Learn more", href: "#" }}
          onDismiss={() => setDismissed(true)}
        >
          Real-time collaboration is now available for your team.
        </BannerAnnouncement>
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
