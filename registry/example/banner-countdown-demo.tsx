"use client";

import { useState, useMemo, useCallback } from "react";
import BannerCountdown from "@/registry/ruixenui/banner-countdown";
import { RotateCcw } from "lucide-react";

export default function BannerCountdownDemo() {
  const [key, setKey] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  // 2 hours from mount — rolling is visible every second
  const endDate = useMemo(
    () => new Date(Date.now() + 2 * 60 * 60 * 1000),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  );

  const replay = useCallback(() => {
    setKey((k) => k + 1);
    setDismissed(false);
  }, []);

  return (
    <div className="flex min-h-[300px] w-full flex-col">
      <div className="w-full">
        <BannerCountdown
          key={key}
          title="Flash Sale ends in"
          endDate={endDate}
          action={{ label: "Shop now", href: "#" }}
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
