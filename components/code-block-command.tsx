"use client";

import { copyToClipboardWithMeta } from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useConfig } from "@/hooks/use-config";
import { useMounted } from "@/hooks/use-mounted";
import { NpmCommands } from "@/types/unist";
import { trackCopyCommand } from "@/lib/ga-events";
import { CheckIcon, ClipboardIcon } from "lucide-react";
import * as React from "react";

/**
 * Rewrite ruixen registry URLs based on selected Tailwind version
 * and UI library.
 *
 * URL patterns:
 *   /r/<name>              → Radix + TW v4 (default)
 *   /r/tw3/<name>          → Radix + TW v3
 *   /r/baseui/<name>       → Base UI + TW v4
 *   /r/baseui/tw3/<name>   → Base UI + TW v3
 */
function applyRegistryUrl(
  command: string | undefined,
  twVersion: "3" | "4",
  uiLibrary: "radix" | "baseui",
) {
  if (!command) return command;
  if (!command.includes("ruixen.com/r/")) return command;

  let prefix = "";
  if (uiLibrary === "baseui") prefix += "baseui/";
  if (twVersion === "3") prefix += "tw3/";

  if (!prefix) return command;
  return command.replace("ruixen.com/r/", `ruixen.com/r/${prefix}`);
}

export function CodeBlockCommand({
  __npmCommand__,
  __yarnCommand__,
  __pnpmCommand__,
  __bunCommand__,
}: React.ComponentProps<"pre"> & NpmCommands) {
  const [config, setConfig] = useConfig();
  const [hasCopied, setHasCopied] = React.useState(false);
  const mounted = useMounted();

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  const packageManager = config.packageManager || "pnpm";
  const twVersion = config.tailwindVersion || "4";
  const uiLibrary = config.uiLibrary || "radix";

  const isRuixenInstall =
    __pnpmCommand__?.includes("ruixen.com/r/") ||
    __npmCommand__?.includes("ruixen.com/r/");

  const tabs = React.useMemo(() => {
    return {
      pnpm: applyRegistryUrl(__pnpmCommand__, twVersion, uiLibrary),
      npm: applyRegistryUrl(__npmCommand__, twVersion, uiLibrary),
      yarn: applyRegistryUrl(__yarnCommand__, twVersion, uiLibrary),
      bun: applyRegistryUrl(__bunCommand__, twVersion, uiLibrary),
    };
  }, [
    __npmCommand__,
    __pnpmCommand__,
    __yarnCommand__,
    __bunCommand__,
    twVersion,
    uiLibrary,
  ]);

  const copyCommand = React.useCallback(() => {
    const command = tabs[packageManager];

    if (!command) {
      return;
    }

    copyToClipboardWithMeta(command, {
      name: "copy_npm_command",
      properties: {
        command,
        pm: packageManager,
      },
    });

    // Track to GA4
    trackCopyCommand({
      command,
      component_type: "component",
      label: packageManager,
    });

    setHasCopied(true);
  }, [packageManager, tabs]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative w-full mt-6 max-h-[650px] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 dark:bg-zinc-900">
      <Tabs
        className="w-full"
        defaultValue={packageManager}
        onValueChange={(value) => {
          setConfig({
            ...config,
            packageManager: value as "pnpm" | "npm" | "yarn" | "bun",
          });
        }}
      >
        <div className="flex items-start justify-between border-b border-zinc-800 bg-zinc-900 px-3 pt-2.5 w-full">
          <TabsList className="h-7 translate-y-[2px] gap-3 bg-transparent p-0 pl-1 w-fit">
            {Object.entries(tabs).map(([key, value]) => {
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="rounded-none border-b border-transparent bg-transparent p-0 pb-1.5 font-mono text-zinc-400 data-[state=active]:border-b-zinc-50 data-[state=active]:bg-transparent data-[state=active]:text-zinc-50"
                >
                  {key}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Config toggles — only shown for ruixen install commands */}
          {isRuixenInstall && (
            <div className="flex items-center gap-2.5 pr-8">
              {/* UI library toggle */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setConfig({ ...config, uiLibrary: "radix" })}
                  className={`rounded px-1.5 py-0.5 font-mono text-xs transition-colors ${
                    uiLibrary === "radix"
                      ? "bg-zinc-700 text-zinc-50"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  Radix
                </button>
                <button
                  onClick={() => setConfig({ ...config, uiLibrary: "baseui" })}
                  className={`rounded px-1.5 py-0.5 font-mono text-xs transition-colors ${
                    uiLibrary === "baseui"
                      ? "bg-zinc-700 text-zinc-50"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  Base UI
                </button>
              </div>

              {/* Separator */}
              <div className="h-3.5 w-px bg-zinc-700" />

              {/* Tailwind version toggle */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setConfig({ ...config, tailwindVersion: "4" })}
                  className={`rounded px-1.5 py-0.5 font-mono text-xs transition-colors ${
                    twVersion === "4"
                      ? "bg-zinc-700 text-zinc-50"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  v4
                </button>
                <button
                  onClick={() => setConfig({ ...config, tailwindVersion: "3" })}
                  className={`rounded px-1.5 py-0.5 font-mono text-xs transition-colors ${
                    twVersion === "3"
                      ? "bg-zinc-700 text-zinc-50"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  v3
                </button>
              </div>
            </div>
          )}
        </div>
        {Object.entries(tabs).map(([key, value]) => {
          return (
            <TabsContent key={key} value={key} className="mt-0">
              <pre className="px-4 py-5 overflow-x-auto">
                <code
                  className="relative font-mono text-sm leading-none"
                  data-language="bash"
                >
                  {value}
                </code>
              </pre>
            </TabsContent>
          );
        })}
      </Tabs>
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-2.5 top-2 z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-3 [&_svg]:w-3"
        onClick={copyCommand}
      >
        <span className="sr-only">Copy</span>
        {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
      </Button>
    </div>
  );
}
