"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import { createPortal } from "react-dom";

/* ------------------------------- IFramePortal ------------------------------ */
/** Mounts children inside an iframe and copies global styles + theme classes.
 *  Uses a fixed height with internal scrolling - no dynamic resizing. */
function IFramePortal({
  width,
  height = 500,
  className,
  title = "Component preview frame",
  children,
}: {
  width: number | "auto";
  height?: number;
  className?: string;
  title?: string;
  children: React.ReactNode;
}) {
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null);
  const [mountNode, setMountNode] = React.useState<HTMLElement | null>(null);
  const [isReady, setIsReady] = React.useState(false);

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
  <head>
    <meta charset="utf-8" />
    <style>
      *, *::before, *::after { box-sizing: border-box; }
      html, body { height: 100%; width: 100%; margin: 0; padding: 0; scrollbar-width: none; -ms-overflow-style: none; }
      html::-webkit-scrollbar, body::-webkit-scrollbar { display: none; }
      #__frame-root {
        min-height: 100%;
        width: 100%;
        display: grid;
        align-content: center;
      }
    </style>
  </head>
  <body class="bg-background">
    <div id="__frame-root"></div>
  </body>
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
      doc.body.className = (doc.body.className || "") + " bg-background";

      setMountNode(doc.getElementById("__frame-root") as HTMLElement);
      // Mark as ready after styles are applied
      requestAnimationFrame(() => {
        setIsReady(true);
      });
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

  // Fixed height - no dynamic resizing, hide until ready to prevent layout shift
  return (
    <div className="relative" style={{ height }}>
      <iframe
        ref={iframeRef}
        title={title}
        style={{
          width: width === "auto" ? "100%" : `${width}px`,
          height,
          opacity: isReady ? 1 : 0,
          transition: "opacity 0.1s ease-out",
        }}
        className={cn("block w-full rounded-xl bg-background", className)}
      />
      {mountNode ? createPortal(children, mountNode) : null}
    </div>
  );
}

/* --------------------------------- Wrapper --------------------------------- */

interface ComponentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {}

/** ComponentWrapper renders the preview area with drag-to-resize. */
export const ComponentWrapper = ({
  className,
  children,
}: ComponentWrapperProps) => {
  type PreviewWidth = number | "auto";

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

  return (
    <div ref={containerRef} className={cn("relative bg-muted/20", className)}>
      <div
        className={cn(
          "relative mx-auto w-full",
          dragging ? "overflow-hidden" : "overflow-x-auto",
        )}
        style={
          {
            scrollbarWidth: "none",
            msOverflowStyle: "none",
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
          <IFramePortal width={width} height={500} className="bg-background">
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
