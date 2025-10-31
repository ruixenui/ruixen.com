// components/product-image-card.tsx
"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowLeft, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export type ProductImage = {
  src: string;
  alt?: string;
  thumbSrc?: string; // optional smaller thumbnail; falls back to src
};

export interface ProductImageCardProps {
  title?: string;
  images: ProductImage[];
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
  className?: string;
}

export function ProductImageCard({
  title = "Product Details",
  images,
  initialIndex = 0,
  onIndexChange,
  className,
}: ProductImageCardProps) {
  const [index, setIndex] = React.useState(initialIndex);

  const setSafeIndex = (i: number) => {
    const next = (i + images.length) % images.length;
    setIndex(next);
    onIndexChange?.(next);
  };

  const prev = () => setSafeIndex(index - 1);
  const next = () => setSafeIndex(index + 1);

  // optional keyboard support
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, images.length]);

  if (!images?.length) return null;

  return (
    <Card
      className={cn(
        "relative mx-auto w-full max-w-3xl rounded-3xl border-border bg-card/70 p-4 shadow-sm",
        className,
      )}
    >
      {/* Header row */}
      <div className="flex items-center justify-between">
        <Button asChild size="icon" variant="outline" className="rounded-full">
          <Link href="#" aria-label="Back">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>

        <h2 className="text-xl font-semibold sm:text-2xl">{title}</h2>

        <Button
          size="icon"
          variant="outline"
          className="rounded-full"
          aria-label="Favorite"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <Separator className="my-4" />

      {/* Content grid */}
      <div className="grid grid-cols-12 gap-4">
        {/* Thumbnails */}
        <div className="order-2 col-span-12 sm:order-1 sm:col-span-3">
          {/* vertical on sm+, horizontal on xs */}
          <ScrollArea className="h-auto sm:h-[420px]">
            <div className="flex gap-3 sm:flex-col">
              {images.map((img, i) => {
                const active = i === index;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSafeIndex(i)}
                    aria-pressed={active}
                    className={cn(
                      "relative overflow-hidden rounded-xl border p-0 outline-none transition",
                      "focus-visible:ring-2 focus-visible:ring-ring",
                      active
                        ? "border-foreground"
                        : "border-border hover:border-foreground/50",
                    )}
                  >
                    <img
                      src={img.thumbSrc ?? img.src}
                      alt={img.alt ?? `Thumbnail ${i + 1}`}
                      className="h-20 w-20 object-cover sm:h-16 sm:w-full"
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Main image */}
        <div className="order-1 col-span-12 sm:order-2 sm:col-span-9">
          <div className="relative">
            <AspectRatio ratio={4 / 5}>
              <div className="h-full w-full overflow-hidden rounded-3xl bg-muted">
                <img
                  src={images[index].src}
                  alt={images[index].alt ?? "Selected view"}
                  className="h-full w-full rounded-3xl object-contain"
                />
              </div>
            </AspectRatio>

            {/* Next/Prev controls */}
            <div className="absolute bottom-3 right-3 flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-background/80 backdrop-blur"
                onClick={prev}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-background/80 backdrop-blur"
                onClick={next}
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
