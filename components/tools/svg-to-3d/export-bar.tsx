"use client";

import { useState, useCallback, useEffect } from "react";
import { Download, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

function ShutterButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="relative h-16 w-16 rounded-full flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-40"
      aria-label="Capture image"
    >
      <div className="absolute inset-0 rounded-full border-[3px] border-white transition-colors duration-300" />
      <div className="h-12 w-12 rounded-full bg-white transition-all duration-300 active:scale-90" />
    </button>
  );
}

function ViewfinderOverlay({ aspectRatio }: { aspectRatio: number }) {
  const [dims, setDims] = useState({ vw: 0, vh: 0 });

  useEffect(() => {
    const update = () =>
      setDims({ vw: window.innerWidth, vh: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (dims.vw === 0) return null;

  const padding = 48;
  const availW = dims.vw - padding * 2;
  const availH = dims.vh - padding * 2;
  const viewportAspect = availW / availH;

  let rectW: number, rectH: number;
  if (aspectRatio > viewportAspect) {
    rectW = availW;
    rectH = availW / aspectRatio;
  } else {
    rectH = availH;
    rectW = availH * aspectRatio;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[5]"
      style={{
        boxShadow: `0 0 0 9999px rgba(0,0,0,0.5)`,
        width: rectW,
        height: rectH,
        left: `calc(50% - ${rectW / 2}px)`,
        top: `calc(50% - ${rectH / 2}px)`,
        borderRadius: "8px",
      }}
    />
  );
}

interface ExportModalProps {
  open: boolean;
  captureFn: React.RefObject<
    | ((
        resolution: number,
        withBackground: boolean,
        onCapture: (dataUrl: string) => void,
        aspectRatio?: number | null,
      ) => void)
    | null
  >;
  onPreviewOpen?: (isOpen: boolean) => void;
}

export function ExportModal({
  open,
  captureFn,
  onPreviewOpen,
}: ExportModalProps) {
  const [resolution, setResolution] = useState(1920);
  const [withBg, setWithBg] = useState(true);
  const [aspect, setAspect] = useState<string>("free");
  const [aspectExpanded, setAspectExpanded] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const aspectRatioValue: number | null = (() => {
    switch (aspect) {
      case "1:1":
        return 1;
      case "16:9":
        return 16 / 9;
      case "9:16":
        return 9 / 16;
      case "4:3":
        return 4 / 3;
      case "3:2":
        return 3 / 2;
      default:
        return null;
    }
  })();

  useEffect(() => {
    onPreviewOpen?.(!!capturedImage);
  }, [capturedImage, onPreviewOpen]);

  const handleImageCapture = useCallback(() => {
    captureFn.current?.(
      720,
      withBg,
      (dataUrl) => setCapturedImage(dataUrl),
      aspectRatioValue,
    );
  }, [captureFn, withBg, aspectRatioValue]);

  const handleImageDownload = useCallback(() => {
    captureFn.current?.(
      resolution,
      withBg,
      (dataUrl) => {
        const link = document.createElement("a");
        link.download = "ruixen-3d.png";
        link.href = dataUrl;
        link.click();
      },
      aspectRatioValue,
    );
  }, [resolution, withBg, aspectRatioValue, captureFn]);

  const aspectOptions = [
    { value: "free", label: "Auto" },
    { value: "1:1", label: "1:1" },
    { value: "16:9", label: "16:9" },
    { value: "9:16", label: "9:16" },
  ];

  return (
    <>
      {open && aspectRatioValue && (
        <ViewfinderOverlay aspectRatio={aspectRatioValue} />
      )}

      <Dialog
        open={!!capturedImage}
        onOpenChange={(v) => {
          if (!v) setCapturedImage(null);
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Photo Preview</DialogTitle>
          </DialogHeader>
          {capturedImage && (
            <div
              className="rounded-lg overflow-hidden border border-white/[0.06]"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, #1a1a1a 25%, transparent 25%),
                  linear-gradient(-45deg, #1a1a1a 25%, transparent 25%),
                  linear-gradient(45deg, transparent 75%, #1a1a1a 75%),
                  linear-gradient(-45deg, transparent 75%, #1a1a1a 75%)
                `,
                backgroundSize: "16px 16px",
                backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={capturedImage}
                alt="Captured preview"
                className="w-full max-h-[60vh] object-contain"
              />
            </div>
          )}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Resolution</span>
              <Select
                value={String(resolution)}
                onValueChange={(v) => setResolution(Number(v))}
              >
                <SelectTrigger className="h-8 w-24 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1280">720p</SelectItem>
                  <SelectItem value="1920">1080p</SelectItem>
                  <SelectItem value="2560">1440p</SelectItem>
                  <SelectItem value="3840">4K</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-xs text-muted-foreground">Background</span>
              <Switch
                checked={withBg}
                onCheckedChange={(v) => {
                  setWithBg(v);
                  captureFn.current?.(
                    720,
                    v,
                    (dataUrl) => setCapturedImage(dataUrl),
                    aspectRatioValue,
                  );
                }}
              />
            </label>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setCapturedImage(null)}
              className="gap-1.5"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Discard
            </Button>
            <Button onClick={handleImageDownload} className="gap-1.5">
              <Download className="h-3.5 w-3.5" />
              Download PNG
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-4">
              <ShutterButton onClick={handleImageCapture} />
            </div>

            <div className="flex items-center gap-1 rounded-full bg-black/40 backdrop-blur-xl border border-white/[0.12] p-1">
              <span className="px-3 py-1.5 text-[11px] font-medium text-white/70 uppercase tracking-wider">
                Photo
              </span>
              <div className="w-px h-5 bg-white/[0.1]" />
              <div
                className="flex items-center gap-0.5 overflow-hidden"
                onMouseLeave={() => setAspectExpanded(false)}
              >
                <AnimatePresence mode="popLayout">
                  {aspectOptions.map((opt) => {
                    const isActive = aspect === opt.value;
                    if (!aspectExpanded && !isActive) return null;
                    return (
                      <motion.button
                        key={opt.value}
                        layout
                        initial={{ opacity: 0, width: 0 }}
                        animate={{
                          opacity: 1,
                          width: "auto",
                          transition: { duration: 0.2, ease: "easeInOut" },
                        }}
                        exit={{
                          opacity: 0,
                          width: 0,
                          transition: {
                            duration: 0.5,
                            ease: "easeInOut",
                            opacity: { duration: 0.15 },
                            width: { delay: 0.12, duration: 0.4 },
                          },
                        }}
                        className={`rounded-full px-2.5 py-1 text-[11px] font-medium whitespace-nowrap cursor-pointer overflow-hidden transition-colors ${
                          isActive && aspectExpanded
                            ? "bg-black/30 text-white shadow-sm"
                            : isActive && !aspectExpanded
                              ? "text-white/60"
                              : "text-white/40 hover:text-white/70"
                        }`}
                        onClick={() => {
                          if (!aspectExpanded) setAspectExpanded(true);
                          else setAspect(opt.value);
                        }}
                      >
                        {opt.label}
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
