"use client";

import { useCallback, useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";

import { transformToTw4 } from "@/lib/tw-v3-to-v4";

const SAMPLE_INPUT = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
  }
}

.btn-primary {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border: 1px solid hsl(var(--border));
}

/* Component markup */
<div class="bg-gradient-to-br from-sky-500 to-violet-500 outline-none">
  <span class="bg-[--theme-bg] text-[--theme-fg]">Hello</span>
</div>
`;

export function TwV3ToV4Editor() {
  const [input, setInput] = useState(SAMPLE_INPUT);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => transformToTw4(input), [input]);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(result.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [result.code]);

  return (
    <div className="grid grid-cols-1 divide-y md:grid-cols-2 md:divide-x md:divide-y-0">
      <div className="flex flex-col">
        <div className="flex items-center justify-between border-b px-4 py-2 text-xs font-medium text-muted-foreground">
          <span>Tailwind v3 input</span>
          <span className="text-[10px] uppercase tracking-wider">
            Paste CSS or HTML
          </span>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          aria-label="Tailwind v3 source"
          className="min-h-[480px] w-full resize-y bg-background p-4 font-mono text-xs leading-relaxed text-foreground focus:outline-none"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between border-b px-4 py-2 text-xs font-medium text-muted-foreground">
          <span>Tailwind v4 output</span>
          <button
            type="button"
            onClick={handleCopy}
            disabled={!result.code}
            className="inline-flex items-center gap-1 rounded border bg-card px-2 py-0.5 text-[11px] text-foreground transition-colors hover:bg-muted disabled:opacity-50"
          >
            {copied ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="min-h-[480px] overflow-auto whitespace-pre-wrap bg-background p-4 font-mono text-xs leading-relaxed text-foreground">
          {result.code}
        </pre>
      </div>
      <div className="border-t bg-muted/30 px-4 py-3 md:col-span-2">
        {result.applied.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            No v3 patterns detected. Either the input is empty or already
            v4-compatible.
          </p>
        ) : (
          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-medium text-foreground">
              Transforms applied
            </p>
            <ul className="flex flex-col gap-0.5">
              {result.applied.map((a) => (
                <li key={a.rule.id} className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {a.count}×
                  </span>{" "}
                  {a.rule.label} — {a.rule.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
