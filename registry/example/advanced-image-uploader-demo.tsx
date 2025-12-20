"use client";

import AdvancedImageUploader from "@/registry/ruixenui/advanced-image-uploader";

export default function ImageUploaderDemo() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-xl text-center">
        <AdvancedImageUploader />
        <p className="text-muted-foreground mt-2">
          Drag & drop images, crop them, or remove them. Works with multiple
          images.
        </p>
      </div>
    </div>
  );
}
