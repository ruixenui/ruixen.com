"use client";

import { useState } from "react";
import { ChevronDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Export3DFormat } from "./lib/canvas-defaults";

interface DownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDownload: (format: Export3DFormat) => void;
}

type FormatInfo = {
  value: Export3DFormat;
  label: string;
  ext: string;
  tagline: string;
  detail: string;
};

const PRIMARY_FORMATS: FormatInfo[] = [
  {
    value: "glb",
    label: "GLB",
    ext: ".glb",
    tagline: "Recommended",
    detail:
      "Full color, materials, textures. Works in Blender, Unity, AR, and web viewers.",
  },
  {
    value: "stl",
    label: "STL",
    ext: ".stl",
    tagline: "For 3D printing",
    detail:
      "Geometry only. Opens in any slicer (Cura, Bambu Studio, PrusaSlicer).",
  },
];

const SECONDARY_FORMATS: FormatInfo[] = [
  {
    value: "obj",
    label: "OBJ",
    ext: ".obj",
    tagline: "Universal mesh",
    detail: "Geometry only. Use when a tool doesn't accept GLB.",
  },
  {
    value: "ply",
    label: "PLY",
    ext: ".ply",
    tagline: "Scans / point clouds",
    detail: "Geometry only. Niche; most users should pick GLB instead.",
  },
];

function FormatCard({
  format,
  selected,
  onSelect,
}: {
  format: FormatInfo;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left rounded-lg border px-4 py-3 transition-colors ${
        selected
          ? "border-primary bg-primary/10"
          : "border-white/[0.08] hover:bg-white/[0.04]"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold">{format.label}</span>
          <span className="text-xs text-muted-foreground font-mono">
            {format.ext}
          </span>
          {format.tagline && (
            <span className="text-[10px] uppercase tracking-wider text-primary/80 font-medium ml-1">
              {format.tagline}
            </span>
          )}
        </div>
        <div
          className={`h-4 w-4 rounded-full border-2 transition-colors shrink-0 ${
            selected ? "border-primary bg-primary" : "border-white/20"
          }`}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-1">{format.detail}</p>
    </button>
  );
}

export function DownloadDialog({
  open,
  onOpenChange,
  onDownload,
}: DownloadDialogProps) {
  const [format, setFormat] = useState<Export3DFormat>("glb");
  const [otherOpen, setOtherOpen] = useState(false);

  const activeFormat =
    [...PRIMARY_FORMATS, ...SECONDARY_FORMATS].find(
      (f) => f.value === format,
    ) ?? PRIMARY_FORMATS[0];

  const handleDownload = () => {
    onDownload(format);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Download 3D model</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 py-2">
          {PRIMARY_FORMATS.map((f) => (
            <FormatCard
              key={f.value}
              format={f}
              selected={format === f.value}
              onSelect={() => setFormat(f.value)}
            />
          ))}

          <Collapsible open={otherOpen} onOpenChange={setOtherOpen}>
            <CollapsibleTrigger className="flex w-full items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors pt-1">
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${otherOpen ? "rotate-0" : "-rotate-90"}`}
              />
              Other formats
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
              {SECONDARY_FORMATS.map((f) => (
                <FormatCard
                  key={f.value}
                  format={f}
                  selected={format === f.value}
                  onSelect={() => setFormat(f.value)}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>

        <Button onClick={handleDownload} className="w-full gap-2">
          <Download className="h-4 w-4" />
          Download {activeFormat.ext}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
