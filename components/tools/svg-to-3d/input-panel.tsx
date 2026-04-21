"use client";

import { useState, useRef, useEffect } from "react";
import {
  ArrowRight,
  Code,
  Diamond,
  FileCheck,
  FileUp,
  Heart,
  Moon,
  Pencil,
  Play,
  Plus,
  Shuffle,
  Star,
  Type,
  Upload,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { PixelEditor } from "./pixel-editor";
import { TextInput } from "./text-input";

interface InputPanelProps {
  inputTab: string;
  onInputTabChange: (tab: string) => void;
  customSvg: string;
  onCustomSvgChange: (v: string) => void;
  onFileSvgChange: (svg: string) => void;
  onPixelSvgChange: (svg: string) => void;
  onTextSvgChange: (svg: string) => void;
  onTextChange?: (text: string) => void;
  onFontChange?: (font: string) => void;
  initialText?: string;
  initialFont?: string;
  droppedFile?: { name: string; content: string } | null;
}

const tabs: {
  value: string;
  icon: LucideIcon;
  label: string;
}[] = [
  { value: "text", icon: Type, label: "Text" },
  { value: "draw", icon: Pencil, label: "Draw" },
  { value: "code", icon: Code, label: "Code" },
  { value: "file", icon: FileUp, label: "Upload" },
];

type Preset = {
  name: string;
  icon: LucideIcon;
  svg: string;
};

const PRESETS: Preset[] = [
  {
    name: "Star",
    icon: Star,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/></svg>`,
  },
  {
    name: "Heart",
    icon: Heart,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"/></svg>`,
  },
  {
    name: "Lightning",
    icon: Zap,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/></svg>`,
  },
  {
    name: "Play",
    icon: Play,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black"><polygon points="6 3 20 12 6 21"/></svg>`,
  },
  {
    name: "Arrow",
    icon: ArrowRight,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black"><polygon points="5 9 15 9 15 4 21 12 15 20 15 15 5 15"/></svg>`,
  },
  {
    name: "Moon",
    icon: Moon,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black"><path d="M20 12a8 8 0 1 1-8-8 7 7 0 0 0 8 8Z"/></svg>`,
  },
  {
    name: "Diamond",
    icon: Diamond,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black"><polygon points="12 2 22 12 12 22 2 12"/></svg>`,
  },
  {
    name: "Plus",
    icon: Plus,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black"><polygon points="9 2 15 2 15 9 22 9 22 15 15 15 15 22 9 22 9 15 2 15 2 9 9 9"/></svg>`,
  },
];

export function InputPanel({
  inputTab,
  onInputTabChange,
  customSvg,
  onCustomSvgChange,
  onFileSvgChange,
  onPixelSvgChange,
  onTextSvgChange,
  onTextChange,
  onFontChange,
  initialText,
  initialFont,
  droppedFile,
}: InputPanelProps) {
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedSvgContent, setUploadedSvgContent] = useState<string | null>(
    null,
  );
  const svgFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (droppedFile) {
      setUploadedFileName(droppedFile.name);
      setUploadedSvgContent(droppedFile.content);
    }
  }, [droppedFile]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      if (text) {
        setUploadedSvgContent(text);
        onFileSvgChange(text);
      }
    };
    reader.readAsText(file);
  };

  const applyPreset = (preset: Preset) => {
    onCustomSvgChange(preset.svg);
    onInputTabChange("code");
  };

  const applyRandomPreset = () => {
    const p = PRESETS[Math.floor(Math.random() * PRESETS.length)];
    applyPreset(p);
  };

  return (
    <div className="pointer-events-auto flex h-full w-[320px] flex-col gap-3 rounded-xl border border-foreground/10 bg-card/70 p-3 backdrop-blur-xl">
      {/* Source */}
      <div>
        <div className="mb-2 flex items-center justify-between px-0.5">
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Source
          </span>
        </div>
        <div className="grid grid-cols-4 gap-1 rounded-md border border-border bg-muted/40 p-0.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = inputTab === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => onInputTabChange(tab.value)}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 rounded py-1.5 text-[10px] font-medium transition-colors",
                  isActive
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active tab content */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className={inputTab === "text" ? "" : "hidden"}>
          <TextInput
            onSvgChange={onTextSvgChange}
            onTextChange={onTextChange}
            onFontChange={onFontChange}
            initialText={initialText}
            initialFont={initialFont}
            active={inputTab === "text"}
          />
        </div>
        <div className={inputTab === "draw" ? "" : "hidden"}>
          <PixelEditor onSvgChange={onPixelSvgChange} />
        </div>
        <div className={inputTab === "code" ? "" : "hidden"}>
          <textarea
            className="h-36 w-full resize-none rounded-md border border-input bg-background/50 px-3 py-2 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-ring"
            placeholder={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n  <path d="..." fill="black"/>\n</svg>`}
            value={customSvg}
            onChange={(e) => onCustomSvgChange(e.target.value)}
          />
        </div>
        <div className={inputTab === "file" ? "" : "hidden"}>
          {uploadedFileName ? (
            <div className="space-y-3">
              {uploadedSvgContent && (
                <div
                  className="flex aspect-square items-center justify-center overflow-hidden rounded-lg border border-foreground/10 bg-background p-4"
                  dangerouslySetInnerHTML={{
                    __html: uploadedSvgContent.replace(
                      /<svg/,
                      '<svg style="width:100%;height:100%;object-fit:contain;display:block;max-width:100%;max-height:100%"',
                    ),
                  }}
                />
              )}
              <div className="flex items-center gap-2 rounded-md border border-border bg-muted/30 px-2.5 py-1.5">
                <FileCheck className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <span className="flex-1 truncate text-xs text-foreground/80">
                  {uploadedFileName}
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6"
                      onClick={() => {
                        setUploadedFileName(null);
                        setUploadedSvgContent(null);
                        onFileSvgChange("");
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Remove</TooltipContent>
                </Tooltip>
              </div>
            </div>
          ) : (
            <div
              onClick={() => svgFileInputRef.current?.click()}
              className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-foreground/15 bg-background/30 text-muted-foreground transition-colors hover:border-foreground/30 hover:bg-background/50"
            >
              <Upload className="h-5 w-5" />
              <span className="text-xs">Click to upload SVG</span>
              <span className="text-[10px] text-muted-foreground/70">
                or drop one anywhere
              </span>
            </div>
          )}
          <input
            ref={svgFileInputRef}
            type="file"
            accept=".svg,image/svg+xml"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      {/* Presets */}
      <div className="shrink-0 border-t border-foreground/10 pt-3">
        <div className="mb-2 flex items-center justify-between px-0.5">
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Presets
          </span>
          <button
            type="button"
            onClick={applyRandomPreset}
            className="flex items-center gap-1 rounded text-[10px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Shuffle className="h-3 w-3" />
            Random
          </button>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {PRESETS.map((p) => {
            const Icon = p.icon;
            return (
              <Tooltip key={p.name}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => applyPreset(p)}
                    className="flex aspect-square items-center justify-center rounded-md border border-border bg-background/40 transition-colors hover:border-foreground/20 hover:bg-background/80"
                  >
                    <Icon className="h-5 w-5 text-foreground/70" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">{p.name}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </div>
  );
}
