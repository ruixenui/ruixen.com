"use client";

import * as React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import type { ProTemplate } from "@/types/pro-templates";

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

export function ThemedTemplateMedia({
  template,
  className,
  width = 1200,
  height = 800,
}: ThemedTemplateMediaProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Render light variant on server / before hydration to avoid mismatch;
  // swap to dark once theme resolves on the client.
  const isDark = mounted && resolvedTheme === "dark";

  const { light: lightImg, dark: darkImg } = pickImages(template);
  const poster = isDark ? darkImg?.image_url : lightImg?.image_url;
  const videoUrl = isDark
    ? template.video_url_dark || template.video_url_light
    : template.video_url_light || template.video_url_dark;
  const imgSrc = isDark ? darkImg : lightImg;

  if (videoUrl) {
    return (
      <video
        key={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        src={videoUrl}
        poster={poster ?? undefined}
        className={className}
      />
    );
  }
  if (imgSrc) {
    return (
      <Image
        src={imgSrc.image_url}
        alt={imgSrc.alt_text ?? template.name}
        width={width}
        height={height}
        className={className}
        unoptimized
      />
    );
  }
  return (
    <div
      aria-hidden
      className={`${className ?? ""} flex items-center justify-center bg-gradient-to-br from-muted to-muted/40 text-muted-foreground text-sm`}
    >
      {template.name}
    </div>
  );
}
