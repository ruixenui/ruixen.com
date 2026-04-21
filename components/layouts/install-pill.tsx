"use client";

import * as React from "react";
import { Check, Copy, Terminal } from "lucide-react";

export function InstallPill({ registry }: { registry: string }) {
  const command = `npx shadcn@latest add "https://ruixen.com/r/${registry}.json"`;
  const [copied, setCopied] = React.useState(false);

  const onCopy = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(command).then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      });
    },
    [command],
  );

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? "Copied install command" : "Copy install command"}
      className="group/pill relative flex items-center gap-2 rounded-md border border-border bg-background/60 px-2 py-1.5 font-mono text-[10px] text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
    >
      <Terminal className="h-3 w-3 shrink-0" />
      <span className="truncate">
        npx shadcn add {registry.replace("layouts-", "layouts/")}
      </span>
      {copied ? (
        <Check className="ml-auto h-3 w-3 shrink-0 text-emerald-500" />
      ) : (
        <Copy className="ml-auto h-3 w-3 shrink-0 opacity-60 transition-opacity group-hover/pill:opacity-100" />
      )}
    </button>
  );
}
