"use client";

import * as React from "react";
import { useState, useRef } from "react";
import Cropper from "react-easy-crop";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Crop } from "lucide-react";

// /lib/cropImage.ts
export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: any,
): Promise<string> {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");

  ctx!.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob!);
      resolve(url);
    }, "image/png");
  });
}

type UploadedImage = {
  file: File;
  preview: string;
  cropped?: string;
};

export default function AdvancedImageUploader() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [cropImage, setCropImage] = useState<UploadedImage | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = (files: FileList) => {
    const newImages: UploadedImage[] = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const showCropper = (image: UploadedImage) => setCropImage(image);

  const saveCroppedImage = async () => {
    if (!cropImage || !croppedAreaPixels) return;
    const cropped = await getCroppedImg(cropImage.preview, croppedAreaPixels);
    setImages((prev) =>
      prev.map((img) =>
        img.preview === cropImage.preview ? { ...img, cropped } : img,
      ),
    );
    setCropImage(null);
  };

  // Drag & Drop Handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="p-4">
        <CardTitle>Advanced Image Upload & Crop</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {/* Drag & Drop Area */}
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="flex flex-col justify-center items-center border-2 border-dashed border p-8 rounded-lg cursor-pointer mb-4 border-gray-400 dark:border-gray-800 transition"
          onClick={() => fileInputRef.current?.click()}
        >
          <p className="text-muted-foreground">
            Drag & Drop images here or click to select
          </p>
          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept="image/*"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
            className="hidden"
          />
        </div>

        {/* Image Previews */}
        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative group border rounded-lg overflow-hidden"
              >
                <img
                  src={img.cropped || img.preview}
                  alt={`preview-${index}`}
                  className="object-cover w-full h-24"
                />
                <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => showCropper(img)}
                  >
                    <Crop className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleRemove(index)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cropper Modal */}
        {cropImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-background p-4 rounded-lg w-[90%] max-w-md">
              <div className="relative h-64 w-full">
                <Cropper
                  image={cropImage.preview}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={(_, croppedAreaPixels) =>
                    setCroppedAreaPixels(croppedAreaPixels)
                  }
                />
              </div>
              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={() => setCropImage(null)}>
                  Cancel
                </Button>
                <Button onClick={saveCroppedImage}>Save Crop</Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
