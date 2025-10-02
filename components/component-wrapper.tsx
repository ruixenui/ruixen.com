"use client";

import { OpenInV0Button } from "@/components/open-in-v0-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RotateCcw, Maximize2, Minimize2, X } from "lucide-react";
import React from "react";

interface ComponentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  category?: string;
}

export const ComponentWrapper = ({
  className,
  category,
  children,
  name,
}: ComponentWrapperProps) => {
  const [key, setKey] = React.useState(0);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [scale, setScale] = React.useState(category === "cards" ? 0.95 : 0.85);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => {
      const newFullscreen = !prev;
      setScale(newFullscreen ? 1 : category === "cards" ? 0.95 : 0.85);
      return newFullscreen;
    });
  };

  // Handle escape key to exit fullscreen
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
        if (category === "cards") {
          setScale(0.95);
        } else {
          setScale(0.85);
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isFullscreen, category]);

  // Fullscreen overlay
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[9999] bg-background/95 backdrop-blur-sm">
        <div className="absolute top-4 right-4 z-50 flex gap-2">
          {/* <div className="px-3 py-1 text-sm bg-black/10 dark:bg-white/10 rounded backdrop-blur-sm">
            {Math.round(scale * 100)}%
          </div> */}
          <OpenInV0Button url={`https://ruixen.com/r/${name}.json`} />
          <Button
            onClick={() => setKey((prev) => prev + 1)}
            size="sm"
            variant="outline"
            className="bg-background/80 backdrop-blur-sm"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={toggleFullscreen}
            className="bg-background/80 backdrop-blur-sm"
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={toggleFullscreen}
            className="bg-background/80 backdrop-blur-sm"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="w-full h-full flex items-center justify-center p-8 overflow-auto">
          <div
            ref={contentRef}
            className="flex items-center justify-center"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "center center",
              width: "100%",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "max-w-screen relative rounded-xl border bg-background",
        className,
      )}
      key={key}
    >
      <div className="flex items-center justify-end gap-2 p-4">
        {/* <div className="px-2 py-1 text-xs bg-black/10 dark:bg-white/10 rounded backdrop-blur-sm">
          {Math.round(scale * 100)}%
        </div> */}
        <OpenInV0Button url={`https://ruixen.com/r/${name}.json`} />
        <Button
          onClick={() => setKey((prev) => prev + 1)}
          className="flex items-center rounded-lg px-3 py-1"
          variant="ghost"
        >
          <RotateCcw aria-label="restart-btn" size={16} />
        </Button>
        <Button
          onClick={toggleFullscreen}
          className="flex items-center rounded-lg px-3 py-1"
          variant="ghost"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex min-h-[100px] w-[100%] items-center justify-center">
        <div
          ref={contentRef}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "center center",
            width: "100%",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
