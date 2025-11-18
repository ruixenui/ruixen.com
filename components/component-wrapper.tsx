"use client";

import { OpenInV0Button } from "@/components/open-in-v0-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RotateCcw, Maximize2, Minimize2, X, Smartphone, Tablet, Monitor, Laptop } from "lucide-react";
import * as React from "react";
import { createPortal } from "react-dom";

/* ------------------------------- IFramePortal ------------------------------ */
/** Mounts children inside an iframe and copies global styles + theme classes.
 *  SUPER-FAST autosize: the height is measured INSIDE the iframe and applied
 *  directly to frameElement (no cross-doc reads). */
function IFramePortal({
  width,
  minHeight = 320,
  autoHeight = true, // pause autosize (e.g., while dragging)
  className,
  title = "Component preview frame",
  children,
}: {
  width: number | "auto";
  minHeight?: number;
  autoHeight?: boolean;
  className?: string;
  title?: string;
  children: React.ReactNode;
}) {
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null);
  const [mountNode, setMountNode] = React.useState<HTMLElement | null>(null);

  // Keep data attrs in sync so the in-frame script can honor them without re-injecting.
  React.useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    iframe.setAttribute("data-min-height", String(minHeight));
    iframe.setAttribute("data-auto-height", autoHeight ? "1" : "0");
  }, [minHeight, autoHeight]);

  React.useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument;
    if (!doc) return;

    if (!doc.getElementById("__frame-root")) {
      // Initialize iframe document once
      doc.open();
      doc.write(`<!doctype html>
<html>
  <head><meta charset="utf-8" /></head>
  <body class="bg-background"><div id="__frame-root"></div></body>
</html>`);
      doc.close();

      // Copy stylesheets and inline <style>
      const nodes = Array.from(
        document.head.querySelectorAll(
          'style, link[rel="stylesheet"], meta[name="color-scheme"]',
        ),
      );
      nodes.forEach((n) => doc.head.appendChild(n.cloneNode(true)));

      // Mirror theme/root classes (e.g., "dark")
      doc.documentElement.className = document.documentElement.className;
      doc.body.className = (document.body.className || "") + " bg-background";

      // Hygiene to avoid inner scrollbars/jitter
      doc.documentElement.style.overflow = "hidden";
      doc.body.style.margin = "0";
      doc.body.style.overflow = "hidden";

      // Inject a self-sizing script that sets frame height from inside the iframe.
      const script = doc.createElement("script");
      script.type = "text/javascript";
      script.text = `
(function () {
  var root = document.getElementById("__frame-root") || document.body;
  var body = document.body;
  var frame = window.frameElement;

  function getMin() {
    if (!frame) return 0;
    var v = parseInt(frame.getAttribute("data-min-height") || "0", 10);
    return isNaN(v) ? 0 : v;
  }
  function isAuto() {
    if (!frame) return true;
    return frame.getAttribute("data-auto-height") !== "0";
  }

  var raf = null;
  function setH(next) {
    if (!frame || !isAuto()) return;
    var h = Math.max(getMin(), Math.ceil(next));
    if (frame.style.height !== h + "px") {
      frame.style.height = h + "px";
    }
  }

  function measure() {
    // Use scrollingElement for broadest correctness
    var scroller = document.scrollingElement || document.documentElement;
    var h = Math.max(
      root ? root.scrollHeight : 0,
      scroller ? scroller.scrollHeight : 0
    );
    setH(h);
  }

  // ResizeObserver on root and body (covers most layout changes)
  var ro = new ResizeObserver(function () {
    if (raf != null) return;
    raf = requestAnimationFrame(function () {
      raf = null;
      measure();
    });
  });
  ro.observe(root);
  ro.observe(body);

  // Re-measure on viewport width changes of the iframe
  window.addEventListener("resize", measure);

  // After fonts/load settle, re-measure (prevents late "snap")
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(measure);
    document.fonts.addEventListener && document.fonts.addEventListener("loadingdone", measure);
  }
  window.addEventListener("load", measure);

  // Initial measure
  measure();
})();`;
      doc.head.appendChild(script);

      setMountNode(doc.getElementById("__frame-root") as HTMLElement);
    }
  }, []);

  // Separate effect to sync theme changes
  React.useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument;
    if (!doc) return;

    // Sync theme function
    const syncTheme = () => {
      if (!doc || !doc.documentElement) return;
      // Sync html classes (this is where "dark" class is added by next-themes)
      doc.documentElement.className = document.documentElement.className;
      // Also sync any data attributes that might be used for theming
      Array.from(document.documentElement.attributes).forEach((attr) => {
        if (attr.name.startsWith("data-") || attr.name === "style") {
          doc.documentElement.setAttribute(attr.name, attr.value);
        }
      });
    };

    // Initial sync
    syncTheme();

    // Watch for changes
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "style"],
    });

    return () => {
      observer.disconnect();
    };
  }, [mountNode]);

  // Width is driven by parent; height is set from inside the iframe.
  return (
    <>
      <iframe
        ref={iframeRef}
        title={title}
        style={{ width: width === "auto" ? "100%" : `${width}px`, minHeight }}
        className={cn(
          "block w-full rounded-md border bg-background shadow-sm ring-1 ring-border",
          className,
        )}
      />
      {mountNode ? createPortal(children, mountNode) : null}
    </>
  );
}

/* --------------------------------- Wrapper --------------------------------- */

interface ComponentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  category?: string;
}

/** ComponentWrapper now owns the responsive controls + drag handle. */
export const ComponentWrapper = ({
  className,
  category,
  children,
  name,
}: ComponentWrapperProps) => {
  type PreviewWidth = number | "auto";

  const [key, setKey] = React.useState(0);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);

  const [width, _setWidth] = React.useState<PreviewWidth>("auto");
  const [dragging, setDragging] = React.useState(false);

  // rAF-throttled setter for smooth dragging
  const widthPending = React.useRef<PreviewWidth>("auto");
  const rafId = React.useRef<number | null>(null);

  const setWidthRaf = React.useCallback((val: PreviewWidth) => {
    widthPending.current = val;
    if (rafId.current != null) return;
    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      _setWidth(widthPending.current);
    });
  }, []);

  const setWidthImmediate = React.useCallback((val: PreviewWidth) => {
    if (rafId.current != null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    widthPending.current = val;
    _setWidth(val);
  }, []);

  const PRESETS: Array<{
    label?: string;
    icon?: React.ComponentType<{ className?: string }>;
    value: PreviewWidth;
    title?: string
  }> = [
      { label: "Auto", value: "auto", title: "Use container width" },
      { icon: Smartphone, value: 375, title: "Mobile (375px)" },
      { icon: Tablet, value: 640, title: "Tablet Small (640px)" },
      { icon: Tablet, value: 768, title: "Tablet (768px)" },
      { icon: Laptop, value: 1024, title: "Laptop (1024px)" },
    ];

  const compress = () => setWidthImmediate(375);
  const expand = () => setWidthImmediate("auto");
  const step = (delta: number) => {
    const base =
      width === "auto"
        ? containerRef.current?.clientWidth || 1200
        : (width as number);
    const next = Math.min(
      1920,
      Math.max(320, Math.round((base + delta) / 10) * 10),
    );
    setWidthImmediate(next);
  };

  const toggleFullscreen = () => setIsFullscreen((prev) => !prev);

  // Escape to exit fullscreen
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isFullscreen, category]);

  // Drag-to-resize (right handle)
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let isDragging = false;
    let startX = 0;
    let startWidth = 0;

    const onPointerDown = (e: PointerEvent) => {
      const handle = (e.target as HTMLElement).closest("[data-resize-handle]");
      if (!handle) return;
      isDragging = true;
      setDragging(true);

      startX = e.clientX;
      const current = width === "auto" ? el.clientWidth : (width as number);
      startWidth = current;

      document.body.style.cursor = "col-resize";
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      e.preventDefault();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const raw = startWidth + dx;
      const next = Math.min(1920, Math.max(320, Math.round(raw / 10) * 10));
      setWidthRaf(next);
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      setDragging(false);
      document.body.style.cursor = "";
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      // Commit final width immediately to trigger a last measure
      setWidthImmediate(widthPending.current);
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      document.body.style.cursor = "";
    };
  }, [width, setWidthImmediate, setWidthRaf]);

  /** Toolbar used in both normal and fullscreen modes */
  const Toolbar = (
    <div className="flex w-full flex-wrap items-center gap-2">
      {/* Left side: width presets */}
      <div className="inline-flex flex-wrap items-center gap-1 text-xs">
        {PRESETS.map((p, index) => {
          const isActive = width === p.value;
          const Icon = p.icon;
          return (
            <button
              key={`${p.value}-${index}`}
              type="button"
              title={p.title || p.label}
              className={cn(
                "rounded border px-2 py-1 font-medium transition-colors",
                isActive
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background hover:bg-muted",
              )}
              onClick={() => setWidthImmediate(p.value)}
            >
              {Icon ? <Icon className="h-4 w-4" /> : p.label}
            </button>
          );
        })}
      </div>

      {/* Right side: util buttons */}
      <div className="ml-auto inline-flex items-center gap-1">
        {/* <div className="inline-flex rounded border border-border bg-background">
          <button
            type="button"
            className="px-2 py-1 hover:bg-muted text-xs"
            title="Narrower"
            onClick={() => step(-100)}
          >
            −100
          </button>
          <div className="px-2 py-1 text-muted-foreground">|</div>
          <button
            type="button"
            className="px-2 py-1 hover:bg-muted text-xs"
            title="Wider"
            onClick={() => step(100)}
          >
            +100
          </button>
        </div> */}
{/* 
        <Button
          onClick={compress}
          size="sm"
          variant="outline"
          className="bg-background/80 backdrop-blur-sm"
          title="Compress (mobile)"
        >
          <Minimize2 className="h-4 w-4" />
        </Button>

        <Button
          onClick={expand}
          size="sm"
          variant="outline"
          className="bg-background/80 backdrop-blur-sm"
          title="Expand (auto width)"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>

        <div className="ml-2 rounded border border-border px-2 py-1 text-xs text-muted-foreground">
          {width === "auto" ? "auto" : `${width}px`}
        </div> */}

        {/* <div className="mx-2 h-4 w-px bg-border" /> */}

        <OpenInV0Button url={`https://ruixen.com/r/${name}.json`} />

        <Button
          onClick={() => setKey((prev) => prev + 1)}
          size="sm"
          variant="outline"
          className="bg-background/80 backdrop-blur-sm"
          title="Restart"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={toggleFullscreen}
          className="bg-background/80 backdrop-blur-sm"
          title="Fullscreen"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  // Fullscreen overlay
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[9999] bg-background/95 backdrop-blur-sm">
        <div className="absolute top-4 left-4 right-4 z-50">{Toolbar}</div>

        <div className="absolute top-4 right-4 z-50">
          <Button
            size="sm"
            variant="outline"
            onClick={toggleFullscreen}
            className="bg-background/80 backdrop-blur-sm"
            title="Exit fullscreen"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex h-full w-full items-center justify-center p-8">
          <div
            ref={containerRef}
            key={key}
            className={cn(
              "relative mx-auto w-full rounded-xl border bg-muted/20 p-4",
              dragging ? "overflow-hidden" : "overflow-x-auto",
            )}
            style={
              {
                scrollbarGutter: "stable",
                overscrollBehaviorX: "contain",
                overscrollBehaviorY: "contain",
              } as React.CSSProperties
            }
          >
            <div
              className="relative mx-auto"
              style={{
                width: width === "auto" ? "100%" : `${width}px`,
                willChange: dragging ? "width" : undefined,
              }}
            >
              <IFramePortal
                width={width}
                minHeight={360}
                autoHeight={!dragging}
                className="bg-background"
              >
                {children}
              </IFramePortal>

              {/* Drag handle */}
              <div
                data-resize-handle
                role="separator"
                aria-orientation="vertical"
                aria-label="Resize preview"
                title="Drag to resize"
                className={cn(
                  "absolute right-[-6px] top-0 h-full w-3 cursor-col-resize rounded-sm",
                  "bg-transparent transition-colors hover:bg-primary/20",
                )}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Normal (inline) wrapper
  return (
    <div
      ref={containerRef}
      className={cn(
        "max-w-screen relative rounded-xl border bg-background",
        className,
      )}
      key={key}
    >
      <div className="flex items-center justify-between gap-2 p-4">
        {Toolbar}
      </div>

      <div
        className={cn(
          "relative mx-auto w-full rounded-b-xl border-t bg-muted/20 p-4",
          dragging ? "overflow-hidden" : "overflow-x-auto",
        )}
        style={
          {
            scrollbarGutter: "stable",
            overscrollBehaviorX: "contain",
            overscrollBehaviorY: "contain",
          } as React.CSSProperties
        }
      >
        <div
          className="relative mx-auto"
          style={{
            width: width === "auto" ? "100%" : `${width}px`,
            willChange: dragging ? "width" : undefined,
          }}
        >
          <IFramePortal
            width={width}
            minHeight={360}
            autoHeight={!dragging}
            className="bg-background"
          >
            {children}
          </IFramePortal>

          {/* Drag handle */}
          <div
            data-resize-handle
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize preview"
            title="Drag to resize"
            className={cn(
              "absolute right-[-6px] top-0 h-full w-3 cursor-col-resize rounded-sm",
              "bg-transparent transition-colors hover:bg-primary/20",
            )}
          />
        </div>
      </div>
    </div>
  );
};
