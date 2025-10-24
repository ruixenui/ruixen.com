"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, Image as ImageIcon, Settings2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  gradients,
  gradientCategories,
  getGradientsByCategory,
  type Gradient,
} from "@/lib/gradients-data";

export default function GradientsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [downloadFormat, setDownloadFormat] = useState<string>("png");
  const [downloadSize, setDownloadSize] = useState<string>("original");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [loadingType, setLoadingType] = useState<"quick" | "advanced" | null>(
    null,
  );

  const filteredGradients =
    selectedCategory === "all"
      ? gradients
      : getGradientsByCategory(selectedCategory);

  const handleDownload = async (
    gradient: Gradient,
    format?: string,
    size?: string,
    type: "quick" | "advanced" = "quick",
  ) => {
    const selectedFormat = format || downloadFormat;
    const selectedSize = size || downloadSize;
    setLoadingId(gradient.id);
    setLoadingType(type);
    try {
      // Build download URL with parameters
      const params = new URLSearchParams({
        url: gradient.imageUrl,
        filename: gradient.slug,
        format: selectedFormat,
      });

      // Add resize parameters if not original
      if (selectedSize !== "original") {
        const dimensions: Record<string, { width: string; height: string }> = {
          "4k": { width: "3840", height: "2160" },
          "2k": { width: "2560", height: "1440" },
          "1080p": { width: "1920", height: "1080" },
          "720p": { width: "1280", height: "720" },
        };

        if (dimensions[selectedSize]) {
          params.append("width", dimensions[selectedSize].width);
          params.append("height", dimensions[selectedSize].height);
        }
      }

      // Create download link
      const downloadUrl = `/api/download-gradient?${params.toString()}`;
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `${gradient.slug}.${selectedFormat}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setTimeout(() => {
        setLoadingId(null);
        setLoadingType(null);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-background mx-auto max-w-6xl">
      {/* Hero Section */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Gradient Collection
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              A curated collection of beautiful gradients for your next project.
              Free to download and use in your designs.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="border-b sticky top-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className="whitespace-nowrap"
            >
              All Gradients ({gradients.length})
            </Button>
            {gradientCategories.map((category) => {
              const count = getGradientsByCategory(category.id).length;
              return (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  {category.name} ({count})
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Gradients Grid */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:gap-12">
          {filteredGradients.map((gradient) => (
            <div
              key={gradient.id}
              className="grid md:grid-cols-2 gap-6 md:gap-8 items-center group"
            >
              {/* Image on Left */}
              <div className="relative aspect-video rounded-xl overflow-hidden border shadow-lg hover:shadow-xl transition-shadow">
                <Image
                  src={gradient.imageUrl}
                  alt={gradient.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Details on Right */}
              <div className="flex flex-col gap-6">
                <div>
                  <Badge variant="secondary" className="mb-3">
                    {gradient.collectionName}
                  </Badge>
                  <h2 className="text-3xl font-bold mb-2">{gradient.name}</h2>
                  <p className="text-muted-foreground">
                    High-quality gradient background perfect for hero sections,
                    cards, and modern designs.
                  </p>
                </div>

                {/* Specifications */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg border">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">
                      File Type
                    </div>
                    <div className="font-semibold">{gradient.fileType}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">
                      Resolution
                    </div>
                    <div className="font-semibold">{gradient.resolution}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">
                      Category
                    </div>
                    <div className="font-semibold capitalize">
                      {gradient.collectionName}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">
                      File Size
                    </div>
                    <div className="font-semibold">{gradient.fileSize}</div>
                  </div>
                </div>

                {/* Download Options */}
                <div className="space-y-3">
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() =>
                      handleDownload(gradient, undefined, undefined, "quick")
                    }
                    disabled={
                      loadingId === gradient.id && loadingType === "quick"
                    }
                  >
                    {loadingId === gradient.id && loadingType === "quick" ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <Download className="mr-2 h-5 w-5" />
                    )}
                    {loadingId === gradient.id && loadingType === "quick"
                      ? "Downloading..."
                      : "Quick Download"}
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="lg" variant="outline" className="w-full">
                        <Settings2 className="mr-2 h-5 w-5" />
                        Advanced Download
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Download Options</DialogTitle>
                        <DialogDescription>
                          Customize your gradient download with size and format
                          options.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="format">Format</Label>
                          <Select
                            value={downloadFormat}
                            onValueChange={setDownloadFormat}
                          >
                            <SelectTrigger id="format">
                              <SelectValue placeholder="Select format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="png">
                                PNG (Lossless)
                              </SelectItem>
                              <SelectItem value="jpg">JPG (Smaller)</SelectItem>
                              <SelectItem value="webp">
                                WebP (Modern)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="size">Size</Label>
                          <Select
                            value={downloadSize}
                            onValueChange={setDownloadSize}
                          >
                            <SelectTrigger id="size">
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="original">
                                Original (3840 × 2160)
                              </SelectItem>
                              <SelectItem value="4k">
                                4K (3840 × 2160)
                              </SelectItem>
                              <SelectItem value="2k">
                                2K (2560 × 1440)
                              </SelectItem>
                              <SelectItem value="1080p">
                                1080p (1920 × 1080)
                              </SelectItem>
                              <SelectItem value="720p">
                                720p (1280 × 720)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Button
                          size="lg"
                          className="w-full"
                          onClick={() =>
                            handleDownload(
                              gradient,
                              downloadFormat,
                              downloadSize,
                              "advanced",
                            )
                          }
                          disabled={
                            loadingId === gradient.id &&
                            loadingType === "advanced"
                          }
                        >
                          {loadingId === gradient.id &&
                          loadingType === "advanced" ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          ) : (
                            <Download className="mr-2 h-5 w-5" />
                          )}
                          {loadingId === gradient.id &&
                          loadingType === "advanced"
                            ? "Downloading..."
                            : `Download ${downloadFormat.toUpperCase()}`}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <p className="text-xs text-center text-muted-foreground">
                    {gradient.fileSize} • 4K Resolution • Multiple Formats
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGradients.length === 0 && (
          <div className="text-center py-20">
            <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No gradients found</h3>
            <p className="text-muted-foreground">
              Try selecting a different category
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
