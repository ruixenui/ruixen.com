"use client";

import { useState, useCallback } from "react";
import BadgeMorph from "@/registry/ruixenui/badge-morph";

type Status = "idle" | "loading" | "success" | "error";

export default function BadgeMorphDemo() {
  const [status, setStatus] = useState<Status>("idle");
  const [isRunning, setIsRunning] = useState(false);

  const deploy = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    setStatus("loading");

    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setIsRunning(false);
      }, 2500);
    }, 2200);
  }, [isRunning]);

  return (
    <div className="flex min-h-[320px] w-full flex-col items-center justify-center gap-10 p-6">
      {/* Interactive */}
      <div className="flex flex-col items-center gap-5">
        <BadgeMorph status={status} />
        <button
          onClick={deploy}
          disabled={isRunning}
          className="inline-flex h-9 items-center gap-2 rounded-full bg-foreground px-4 text-[13px] font-medium text-background transition-all hover:opacity-90 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 1v10M6 1l3.5 3.5M6 1L2.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Deploy
        </button>
      </div>

      {/* Static reference */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <BadgeMorph status="idle" />
        <BadgeMorph status="loading" label="Building" />
        <BadgeMorph status="success" />
        <BadgeMorph status="error" />
      </div>
    </div>
  );
}
