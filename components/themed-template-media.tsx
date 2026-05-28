"use client";

import * as React from "react";
import Image from "next/image";

import type { ProTemplate } from "@/types/pro-templates";
import { cn } from "@/lib/utils";

interface ThemedTemplateMediaProps {
  template: ProTemplate;
  className?: string;
  width?: number;
  height?: number;
}

function pickImages(template: ProTemplate) {
  const light =
    template.images.find((i) => i.is_thumbnail) ?? template.images[0];
  const dark =
    template.images.find((i) => {
      const alt = i.alt_text?.toLowerCase() ?? "";
      return alt.includes("dark");
    }) ??
    template.images[1] ??
    light;
  return { light, dark };
}

// Renders both light + dark variants and toggles them via Tailwind `dark:` so
// the correct one is visible on first paint — no SSR/hydration flash, no
// remount when the theme flips (which would otherwise restart the video).
export function ThemedTemplateMedia({
  template,
  className,
  width = 1200,
  height = 800,
}: ThemedTemplateMediaProps) {
  const { light: lightImg, dark: darkImg } = pickImages(template);
  const lightVideo =
    template.video_url_light ?? template.video_url_dark ?? null;
  const darkVideo = template.video_url_dark ?? template.video_url_light ?? null;

  if (lightVideo || darkVideo) {
    return (
      <>
        {lightVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            src={lightVideo}
            poster={lightImg?.image_url}
            className={cn(className, "block dark:hidden")}
          />
        )}
        {darkVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            src={darkVideo}
            poster={darkImg?.image_url}
            className={cn(className, "hidden dark:block")}
          />
        )}
      </>
    );
  }

  if (lightImg || darkImg) {
    return (
      <>
        {lightImg && (
          <Image
            src={lightImg.image_url}
            alt={lightImg.alt_text ?? template.name}
            width={width}
            height={height}
            className={cn(className, "block dark:hidden")}
            unoptimized
          />
        )}
        {darkImg && darkImg !== lightImg && (
          <Image
            src={darkImg.image_url}
            alt={darkImg.alt_text ?? template.name}
            width={width}
            height={height}
            className={cn(className, "hidden dark:block")}
            unoptimized
          />
        )}
      </>
    );
  }

  return (
    <div
      aria-hidden
      className={cn(
        className,
        "flex items-center justify-center bg-gradient-to-br from-muted to-muted/40 text-muted-foreground text-sm",
      )}
    >
      {template.name}
    </div>
  );
}
