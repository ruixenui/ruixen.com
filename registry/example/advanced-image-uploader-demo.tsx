"use client";

import AdvancedImageUploader from "@/registry/ruixenui/advanced-image-uploader";

export default function ImageUploaderDemo() {
  return (
    <div className="p-4 max-w-xl mx-auto">
      <AdvancedImageUploader />
      <p className="text-muted-foreground mt-2">
        Drag & drop images, crop them, or remove them. Works with multiple
        images.
      </p>
    </div>
  );
}
