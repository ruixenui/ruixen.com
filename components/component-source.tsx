"use client";

import * as React from "react";
import { CheckIcon, ClipboardIcon, FileIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useConfig } from "@/hooks/use-config";
import { useMounted } from "@/hooks/use-mounted";
import { CodeBlockWrapper } from "@/components/code-block-wrapper";
import { Button } from "@/components/ui/button";

interface RegistryFile {
  path: string;
  content: string;
  type: string;
  target?: string;
}

interface RegistryJson {
  name: string;
  files: RegistryFile[];
  dependencies?: string[];
  registryDependencies?: string[];
}

interface ComponentSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name?: string;
}

/** Build the registry URL prefix based on user config. */
function getRegistryPrefix(
  twVersion: "3" | "4",
  uiLibrary: "radix" | "baseui",
) {
  let prefix = "";
  if (uiLibrary === "baseui") prefix += "baseui/";
  if (twVersion === "3") prefix += "tw3/";
  return prefix;
}

/** Pretty-print a file path for display. */
function displayPath(filePath: string) {
  return filePath
    .replace("registry/ruixenui/", "components/ruixen/")
    .replace(/^registry\/example\//, "components/example/");
}

function CopyFileButton({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (copied) {
      const t = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(t);
    }
  }, [copied]);

  return (
    <Button
      size="icon"
      variant="ghost"
      className="h-6 w-6 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-3 [&_svg]:w-3"
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
      }}
    >
      <span className="sr-only">Copy</span>
      {copied ? <CheckIcon /> : <ClipboardIcon />}
    </Button>
  );
}

function RegistryCodeBlock({
  file,
  defaultExpanded,
}: {
  file: RegistryFile;
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = React.useState(defaultExpanded ?? false);
  const path = displayPath(file.path);

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 dark:bg-zinc-900">
      {/* File header */}
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-3 py-1.5">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <FileIcon className="h-3 w-3" />
          <span className="font-mono">{path}</span>
        </div>
        <CopyFileButton value={file.content} />
      </div>

      {/* Code content */}
      <div className="relative">
        <div
          className={cn(
            "overflow-hidden transition-all",
            !expanded && "max-h-72",
          )}
        >
          <pre className="overflow-x-auto p-4">
            <code className="font-mono text-sm leading-relaxed text-zinc-300 whitespace-pre">
              {file.content}
            </code>
          </pre>
        </div>

        {/* Expand/collapse overlay */}
        {!expanded && file.content.split("\n").length > 15 && (
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-center bg-gradient-to-t from-zinc-950 to-transparent pb-2 pt-16 dark:from-zinc-900">
            <Button
              variant="secondary"
              size="sm"
              className="h-7 text-xs"
              onClick={() => setExpanded(true)}
            >
              Expand
            </Button>
          </div>
        )}

        {expanded && file.content.split("\n").length > 15 && (
          <div className="flex justify-center border-t border-zinc-800 py-2">
            <Button
              variant="secondary"
              size="sm"
              className="h-7 text-xs"
              onClick={() => setExpanded(false)}
            >
              Collapse
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function RegistryDeps({
  deps,
  npmDeps,
}: {
  deps?: string[];
  npmDeps?: string[];
}) {
  if ((!deps || deps.length === 0) && (!npmDeps || npmDeps.length === 0)) {
    return null;
  }

  return (
    <div className="mt-3 rounded-lg border border-zinc-800/50 bg-zinc-950/50 p-3 dark:bg-zinc-900/50">
      {deps && deps.length > 0 && (
        <div className="mb-2">
          <span className="text-xs font-medium text-zinc-400">
            Required shadcn primitives:
          </span>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {deps.map((d) => (
              <span
                key={d}
                className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-300"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      )}
      {npmDeps && npmDeps.length > 0 && (
        <div>
          <span className="text-xs font-medium text-zinc-400">
            npm packages:
          </span>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {npmDeps.map((d) => (
              <span
                key={d}
                className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-300"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ComponentSource({
  children,
  className,
  name,
  ...props
}: ComponentSourceProps) {
  const [config] = useConfig();
  const mounted = useMounted();
  const [registry, setRegistry] = React.useState<RegistryJson | null>(null);
  const [error, setError] = React.useState(false);

  const twVersion = config.tailwindVersion || "4";
  const uiLibrary = config.uiLibrary || "radix";
  const isDefault = twVersion === "4" && uiLibrary === "radix";

  React.useEffect(() => {
    if (!name || !mounted) return;

    const prefix = getRegistryPrefix(twVersion, uiLibrary);
    const url = `/r/${prefix}${name}.json`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status}`);
        return res.json();
      })
      .then((data: RegistryJson) => setRegistry(data))
      .catch(() => setError(true));
  }, [name, twVersion, uiLibrary, mounted]);

  // Fallback: show build-time injected code (original behavior)
  if (!mounted || !name || error || (!registry && isDefault)) {
    return (
      <CodeBlockWrapper
        expandButtonTitle="Expand"
        className={cn("my-6 overflow-hidden rounded-md", className)}
        {...props}
      >
        {children}
      </CodeBlockWrapper>
    );
  }

  // Loading state
  if (!registry) {
    return (
      <div
        className={cn(
          "my-6 flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 p-8 dark:bg-zinc-900",
          className,
        )}
      >
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-600 border-t-zinc-300" />
      </div>
    );
  }

  // Dynamic registry code display
  return (
    <div className={cn("my-6 space-y-3", className)}>
      {/* Config badge */}
      {!isDefault && (
        <div className="flex items-center gap-2">
          {uiLibrary === "baseui" && (
            <span className="rounded bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-400 ring-1 ring-blue-500/20">
              Base UI
            </span>
          )}
          {twVersion === "3" && (
            <span className="rounded bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-400 ring-1 ring-amber-500/20">
              Tailwind v3
            </span>
          )}
        </div>
      )}

      {/* All files from registry */}
      {registry.files.map((file, i) => (
        <RegistryCodeBlock
          key={file.path}
          file={file}
          defaultExpanded={i === 0 && registry.files.length === 1}
        />
      ))}

      {/* Dependencies info */}
      <RegistryDeps
        deps={registry.registryDependencies}
        npmDeps={registry.dependencies}
      />
    </div>
  );
}
