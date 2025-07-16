'use client';

import { useState } from "react";
import { Smartphone, Tablet, Monitor, Download, Palette, Code2, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

type PageProps = {
  title: string;
  description: string;
  badge?: string;
  preview: React.ReactNode;
  downloadHandler?: () => void;
  code?: string;
};

export default function TemplateShowcasePage({
  title,
  description,
  badge = "Free",
  preview,
  downloadHandler,
  code,
}: PageProps) {

  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [showCode, setShowCode] = useState(false);

  const deviceWidth = device === "mobile" ? "w-[375px]" : device === "tablet" ? "w-[768px]" : "w-full";

  const handleDownload = () => {
    if (downloadHandler) {
      downloadHandler();
    } else {
      console.log("Default download triggered");
    }
  };

  const copyCode = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      alert("Code copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white py-6">

      {/* Top Controls */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-lg font-medium flex items-center gap-2">
            {title}
            {badge && (
              <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded text-xs">{badge}</span>
            )}
          </h1>
          <p className="text-sm text-muted-foreground dark:text-zinc-400 max-w-xl mt-1">{description}</p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-2 p-1 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg items-center">
          {/* Copy Code */}
          {code && (
            <Button variant="outline" onClick={copyCode} className="flex items-center gap-2 text-xs bg-white dark:bg-zinc-900">
              <Copy size={16} /> Copy Code
            </Button>
          )}

          {/* <ToggleGroup
            variant="outline"
            className="inline-flex gap-0 border border-gray-100 dark:border-zinc-700 rounded-md bg-gray-50 dark:bg-zinc-800"
            type="single"
            value={device}
            onValueChange={(val) => {
              if (val) setDevice(val as 'mobile' | 'tablet' | 'desktop');
            }}
          >
            <ToggleGroupItem
              className={cn(
                "px-2 py-1 text-xs border-r border-gray-100 dark:border-zinc-700 first:rounded-s-md last:rounded-e-md",
                device === "mobile" && "border-2 border-gray-300 dark:border-zinc-400"
              )}
              value="mobile"
              aria-label="Mobile View"
            >
              <Smartphone size={16} />
            </ToggleGroupItem>

            <ToggleGroupItem
              className={cn(
                "px-2 py-1 text-xs border-r border-gray-100 dark:border-zinc-700 first:rounded-s-md last:rounded-e-md",
                device === "tablet" && "border-2 border-gray-300 dark:border-zinc-400"
              )}
              value="tablet"
              aria-label="Tablet View"
            >
              <Tablet size={16} />
            </ToggleGroupItem>

            <ToggleGroupItem
              className={cn(
                "px-2 py-1 text-xs first:rounded-s-md last:rounded-e-md",
                device === "desktop" && "border-2 border-gray-300 dark:border-zinc-400"
              )}
              value="desktop"
              aria-label="Desktop View"
            >
              <Monitor size={16} />
            </ToggleGroupItem>
          </ToggleGroup> */}

          {/* Download */}
          <Button variant="outline" onClick={handleDownload} className="flex items-center gap-2 text-xs bg-white dark:bg-zinc-900">
            <Download size={16} /> Download Component
          </Button>

          {/* Toggle Code/Preview */}
          {code && (
            <ToggleGroup
              type="single"
              value={showCode ? "code" : "preview"}
              onValueChange={(val) => {
                if (val) setShowCode(val === "code");
              }}
              className="relative border border-gray-200 dark:border-zinc-700 rounded overflow-hidden inline-flex bg-white/60 dark:bg-zinc-900"
            >

              {/* Sliding Tab */}
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={cn(
                  "absolute top-0 h-full w-1/2 bg-gray-100 dark:bg-zinc-700 rounded text-white z-0 transition-all",
                  showCode ? "left-1/2" : "left-0"
                )}
              />

              {/* Preview Button */}
              <ToggleGroupItem
                value="preview"
                className={cn(
                  "relative z-10 px-4 py-1.5 text-xs w-1/2 text-center transition-colors",
                  !showCode ? "text-white" : "text-zinc-700 dark:text-zinc-300"
                )}
              >
                Preview
              </ToggleGroupItem>

              {/* Code Button */}
              <ToggleGroupItem
                value="code"
                className={cn(
                  "relative z-10 px-4 py-1.5 text-xs w-1/2 text-center transition-colors",
                  showCode ? "text-white" : "text-zinc-700 dark:text-zinc-300"
                )}
              >
                Code
              </ToggleGroupItem>
            </ToggleGroup>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-900">
        {showCode ? (
          <ScrollArea className="w-full h-[400px] bg-black text-white rounded-xl p-4">
            <pre className="text-xs font-mono whitespace-pre-wrap flex flex-col space-y-0">
              {code?.split("\n").map((line, index) => (
                <div key={index} className="flex">
                  <span className="text-zinc-500 pr-4 w-8 text-right select-none">
                    {index + 1}
                  </span>
                  <span className="whitespace-pre-wrap">{line}</span>
                </div>
              ))}
            </pre>
          </ScrollArea>
        ) : (
          <div className={cn(deviceWidth, "transition-all duration-300 min-h-[70vh] flex justify-center items-center")}>
            {preview}
          </div>
        )}
      </div>
    </div>
  );
}
