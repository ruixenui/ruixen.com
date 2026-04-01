"use client";

import { Index } from "@/__registry__";
import { useParams } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import * as React from "react";

export default function PreviewPage() {
  const params = useParams();
  const name = params.name as string;
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Try both with and without -demo suffix
  const demoName = name.endsWith("-demo") ? name : `${name}-demo`;
  const componentName = name.replace(/-demo$/, "");

  const Component =
    Index[demoName]?.component || Index[componentName]?.component;

  if (!Component) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Component Not Found
          </h1>
          <p className="text-muted-foreground">
            The component{" "}
            <code className="rounded bg-muted px-2 py-1 font-mono text-sm">
              {name}
            </code>{" "}
            could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Back to Ruixen
            </a>
            <span className="text-muted-foreground/50">|</span>
            <span className="font-medium text-foreground">{componentName}</span>
          </div>

          {/* Theme Toggle */}
          {mounted && (
            <div className="flex items-center gap-1 rounded-lg border p-1">
              <button
                onClick={() => setTheme("light")}
                className={`inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
                  resolvedTheme === "light"
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Light mode"
              >
                <Sun className="h-4 w-4" />
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
                  resolvedTheme === "dark"
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Dark mode"
              >
                <Moon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setTheme("system")}
                className={`inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
                  theme === "system"
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="System theme"
              >
                <Monitor className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Component Preview */}
      <main className="min-h-[calc(100vh-3.5rem)] py-12 px-4 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <React.Suspense
            fallback={
              <div className="flex min-h-[50vh] items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
                  <span className="text-sm text-muted-foreground">
                    Loading...
                  </span>
                </div>
              </div>
            }
          >
            <Component />
          </React.Suspense>
        </div>
      </main>
    </div>
  );
}
