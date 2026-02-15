"use client";

import { Index } from "@/__registry__";
import { ComponentWrapper } from "@/components/component-wrapper";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  CheckIcon,
  ClipboardIcon,
  RotateCcw,
  SquareArrowOutUpRight,
} from "lucide-react";
import * as React from "react";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  align?: "center" | "start" | "end";
  preview?: boolean;
}

export function ComponentPreview({
  name,
  children,
  className,
  align = "center",
  preview = false,
  ...props
}: ComponentPreviewProps) {
  const [replayKey, setReplayKey] = React.useState(0);
  const [hasCopied, setHasCopied] = React.useState(false);
  const [sourceCode, setSourceCode] = React.useState("");
  const Codes = React.Children.toArray(children) as React.ReactElement[];
  const Code = Codes[0];

  React.useEffect(() => {
    if (hasCopied) {
      const t = setTimeout(() => setHasCopied(false), 2000);
      return () => clearTimeout(t);
    }
  }, [hasCopied]);

  React.useEffect(() => {
    const componentName = name.replace(/-demo$/, "");
    fetch(`/r/${componentName}.json`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.files?.[0]?.content) {
          setSourceCode(data.files[0].content);
        }
      })
      .catch(() => {});
  }, [name]);

  const Preview = React.useMemo(() => {
    const Component = Index[name]?.component;

    if (!Component) {
      console.error(`Component with name "${name}" not found in registry.`);
      return (
        <p className="text-sm text-muted-foreground">
          Component{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      );
    }

    return <Component />;
  }, [name]);

  return (
    <div
      className={cn(
        "relative my-4 flex flex-col space-y-2 lg:max-w-[120ch]",
        className,
      )}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="overflow-hidden rounded-2xl border">
          {!preview && (
            <div className="flex items-center justify-between bg-muted/50 px-4">
              <TabsList className="h-auto gap-3.5 rounded-none bg-transparent p-0">
                <TabsTrigger
                  value="preview"
                  className="h-auto rounded-none border-0 bg-transparent px-0 py-2 text-sm font-medium text-muted-foreground shadow-none ring-0 ring-offset-0 transition-colors hover:text-accent-foreground focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none data-[state=active]:border-0 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  Preview
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className="h-auto rounded-none border-0 bg-transparent px-0 py-2 text-sm font-medium text-muted-foreground shadow-none ring-0 ring-offset-0 transition-colors hover:text-accent-foreground focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none data-[state=active]:border-0 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  Code
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-1.5">
                {sourceCode && (
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(sourceCode);
                      setHasCopied(true);
                    }}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    title="Copy code"
                  >
                    {hasCopied ? (
                      <CheckIcon className="h-3.5 w-3.5" />
                    ) : (
                      <ClipboardIcon className="h-3.5 w-3.5" />
                    )}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setReplayKey((k) => k + 1)}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  title="Replay animation"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>

                <a
                  href={`https://v0.dev/chat/api/open?url=https://ruixen.com/r/${name}.json`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-7 items-center gap-1 rounded-md bg-black px-2 text-xs font-semibold text-white transition-colors hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
                  title="Open in v0"
                >
                  <svg
                    viewBox="0 0 40 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-auto"
                  >
                    <path
                      d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z"
                      fill="currentColor"
                    />
                    <path
                      d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>

                <a
                  href={`https://ruixen.com/r/${name}.json`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  title="Open in new tab"
                >
                  <SquareArrowOutUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          )}

          <TabsContent value="preview" className="mt-0">
            <ComponentWrapper
              key={replayKey}
              className="overflow-hidden rounded-t-2xl bg-background"
            >
              <React.Suspense
                fallback={
                  <div className="flex min-h-[360px] items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <Image
                        src="/ruixen_logo_blue_1024.svg"
                        alt="Loading"
                        className="size-12 animate-pulse"
                        width={1024}
                        height={1024}
                      />
                      <span className="text-sm text-muted-foreground">
                        Loading...
                      </span>
                    </div>
                  </div>
                }
              >
                {Preview}
              </React.Suspense>
            </ComponentWrapper>
          </TabsContent>

          <TabsContent value="code" className="mt-0">
            <div className="rounded-t-2xl bg-background p-4">
              <div className="w-full rounded-lg [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
                {Code}
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
