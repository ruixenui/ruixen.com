"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function Avatar({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  src,
  alt = "",
  onLoadingStatusChange,
  ...props
}: React.ComponentProps<"img"> & {
  onLoadingStatusChange?: (status: "loading" | "loaded" | "error") => void;
}) {
  const [status, setStatus] = React.useState<"loading" | "loaded" | "error">(
    "loading",
  );

  React.useEffect(() => {
    if (!src) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setStatus("loaded");
      onLoadingStatusChange?.("loaded");
    };
    img.onerror = () => {
      setStatus("error");
      onLoadingStatusChange?.("error");
    };
  }, [src, onLoadingStatusChange]);

  if (status !== "loaded") return null;

  return (
    <img
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      src={src}
      alt={alt}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  delayMs,
  children,
  ...props
}: React.ComponentProps<"span"> & { delayMs?: number }) {
  const [show, setShow] = React.useState(!delayMs);

  React.useEffect(() => {
    if (delayMs) {
      const timer = setTimeout(() => setShow(true), delayMs);
      return () => clearTimeout(timer);
    }
  }, [delayMs]);

  if (!show) return null;

  return (
    <span
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Avatar, AvatarImage, AvatarFallback };
