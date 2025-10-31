"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export interface GalleryItem {
  id: string;
  type: "image" | "text";
  src?: string;
  text?: string;
  position?: string; // optional Tailwind position classes
}

interface InteractiveImageGalleryProps {
  items: GalleryItem[];
  className?: string;
}

export function InteractiveImageGallery({
  items,
  className,
}: InteractiveImageGalleryProps) {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  return (
    <div
      className={cn(
        "relative w-full min-h-screen bg-muted/10 flex flex-wrap justify-center items-center gap-8 p-10 transition-colors",
        className,
      )}
    >
      {items.map((item) =>
        item.type === "image" ? (
          <div
            key={item.id}
            className={cn(
              "relative transition-all duration-300 ease-in-out rounded-xl overflow-hidden",
              "hover:scale-105",
              hoveredId && hoveredId !== item.id
                ? "blur-sm opacity-50"
                : "opacity-100",
            )}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {item.src && (
              <Image
                src={item.src}
                alt="gallery item"
                width={200}
                height={200}
                unoptimized
                className="object-cover w-40 h-40 md:w-48 md:h-48 rounded-xl"
              />
            )}
          </div>
        ) : (
          <Card
            key={item.id}
            className="w-72 bg-background shadow-md border border-muted text-center"
          >
            <CardContent className="p-4 text-sm text-muted-foreground">
              {item.text}
            </CardContent>
          </Card>
        ),
      )}
    </div>
  );
}
