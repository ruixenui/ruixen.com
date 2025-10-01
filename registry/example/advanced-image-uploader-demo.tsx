"use client";

import AdvancedImageUploader from "@/registry/ruixenui/advanced-image-uploader";

export default function ImageUploaderDemo() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Advanced Image Uploader Demo</h1>
      <p className="text-muted-foreground">
        Drag & drop images, crop them, or remove them. Works with multiple
        images.
      </p>

      <AdvancedImageUploader />
    </div>
  );
}
