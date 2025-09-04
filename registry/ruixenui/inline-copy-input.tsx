"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function InlineCopyInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={cn(
          "flex items-center rounded-full border border-black/30 dark:border-white/30 overflow-hidden transition-colors",
          copied ? "bg-emerald-100 dark:bg-emerald-900/30" : "bg-transparent",
        )}
      >
        <input
          ref={inputRef}
          readOnly
          defaultValue="npm install ruixen-ui"
          className="flex-1 px-4 py-2 text-black dark:text-white bg-transparent outline-none"
        />
        <button
          onClick={handleCopy}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors",
            copied
              ? "text-white dark:text-black"
              : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white",
          )}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <p className="mt-2 text-xs text-black/50 dark:text-white/50">
        Click the button to copy the command.
      </p>
    </div>
  );
}
