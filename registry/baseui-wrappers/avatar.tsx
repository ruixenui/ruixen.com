"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type ImageLoadingStatus = "loading" | "loaded" | "error";

const AvatarContext = React.createContext<{
  status: ImageLoadingStatus;
  setStatus: (status: ImageLoadingStatus) => void;
}>({ status: "loading", setStatus: () => {} });

function Avatar({ className, ...props }: React.ComponentProps<"span">) {
  const [status, setStatus] = React.useState<ImageLoadingStatus>("loading");

  return (
    <AvatarContext.Provider value={{ status, setStatus }}>
      <span
        data-slot="avatar"
        className={cn(
          "relative flex size-8 shrink-0 overflow-hidden rounded-full",
          className,
        )}
        {...props}
      />
    </AvatarContext.Provider>
  );
}

function AvatarImage({
  className,
  src,
  alt = "",
  onLoadingStatusChange,
  ...props
}: React.ComponentProps<"img"> & {
  onLoadingStatusChange?: (status: ImageLoadingStatus) => void;
}) {
  const { setStatus } = React.useContext(AvatarContext);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!src) {
      setStatus("error");
      onLoadingStatusChange?.("error");
      return;
    }
    setLoaded(false);
    setStatus("loading");
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setLoaded(true);
      setStatus("loaded");
      onLoadingStatusChange?.("loaded");
    };
    img.onerror = () => {
      setStatus("error");
      onLoadingStatusChange?.("error");
    };
  }, [src, onLoadingStatusChange, setStatus]);

  if (!loaded) return null;

  return (
    <img
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
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
  const { status } = React.useContext(AvatarContext);
  const [delayElapsed, setDelayElapsed] = React.useState(!delayMs);

  React.useEffect(() => {
    if (delayMs) {
      const timer = setTimeout(() => setDelayElapsed(true), delayMs);
      return () => clearTimeout(timer);
    }
  }, [delayMs]);

  if (status === "loaded" || !delayElapsed) return null;

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
