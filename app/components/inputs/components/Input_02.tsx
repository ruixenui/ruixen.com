"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ImagePlus, X, FileText } from "lucide-react";
import { useFileInput } from "@/hooks/use-file-input";
import Image from "next/image";

export const codeStringInput_02 = `
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ImagePlus, X, FileText } from "lucide-react";
import { useFileInput } from "@/hooks/use-file-input";

export default function Input_02() {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    fileName,
    fileInputRef,
    clearFile,
    error,
    validateAndSetFile,
    fileSize,
  } = useFileInput({ accept: "image/*", maxSize: 5 });

  function handleFile(file: File) {
    const isValid = validateAndSetFile(file);
    if (isValid && !error) {
      simulateUpload(file);
    }
  }

  function simulateUpload(file: File) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onloadend = () => setPreview(reader.result as string);
          reader.readAsDataURL(file);
        }
      }
    }, 80);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;
    handleFile(droppedFile);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    handleFile(selectedFile);
  }

  function removeFile() {
    clearFile();
    setPreview(null);
    setUploadProgress(0);
  }

  return (
    <div className="w-full max-w-md mx-auto px-6">
      <div
        className={cn(
          "group relative grid grid-cols-1 sm:grid-cols-2 gap-6 border rounded-xl overflow-hidden transition duration-300",
          isDragging
            ? "border-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 shadow-lg"
            : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        role="button"
        tabIndex={0}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />

        {/* Left - Image Preview */}
        <div className="relative flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
          {preview ? (
            <>
              <img
                src={preview}
                alt="Preview"
                className="object-cover w-full h-full transition-opacity duration-300"
              />
              {uploadProgress < 100 && (
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-zinc-300 dark:bg-zinc-700">
                  <div
                    className="h-full bg-indigo-500 transition-all duration-300"
                    style={{ width: \`\${uploadProgress}%\` }}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-zinc-400 dark:text-zinc-500">
              <ImagePlus className="w-16 h-16" />
            </div>
          )}
        </div>

        {/* Right - File Info or Placeholder */}
        <div className="flex flex-col justify-between py-6 px-4 relative">
          {!fileName ? (
            <div className="text-zinc-600 dark:text-zinc-300 text-center sm:text-left">
              <p className="text-md font-semibold mb-2">No file uploaded</p>
              <p className="text-sm opacity-80">
                Click or drag an image to upload. Max 5MB. JPG, PNG, etc.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-1">
                <p className="text-zinc-900 dark:text-white font-medium text-md truncate">
                  {fileName}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {fileSize ? \`\${(fileSize / 1024 / 1024).toFixed(2)} MB\` : ""}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="absolute top-3 right-3 text-zinc-400 hover:text-red-500 dark:hover:text-red-400 transition"
                type="button"
              >
                <X className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
`;


export default function Input_02() {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    fileName,
    fileInputRef,
    clearFile,
    error,
    validateAndSetFile,
    fileSize,
  } = useFileInput({ accept: "image/*", maxSize: 5 });

  function handleFile(file: File) {
    validateAndSetFile(file);
    if (!error) {
      simulateUpload(file);
    }
  }

  function simulateUpload(file: File) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onloadend = () => setPreview(reader.result as string);
          reader.readAsDataURL(file);
        }
      }
    }, 80);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;
    handleFile(droppedFile);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    handleFile(selectedFile);
  }

  function removeFile() {
    clearFile();
    setPreview(null);
    setUploadProgress(0);
  }

  return (
    <div className="w-full max-w-md mx-auto px-6">
      <div
        className={cn(
          "group relative grid grid-cols-1 sm:grid-cols-2 gap-6 border rounded-xl overflow-hidden transition duration-300",
          isDragging
            ? "border-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 shadow-lg"
            : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        role="button"
        tabIndex={0}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />

        {/* Left - Image Preview */}
        <div className="relative flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
          {preview ? (
            <>
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover w-full h-full transition-opacity duration-300 rounded-none"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              {uploadProgress < 100 && (
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-zinc-300 dark:bg-zinc-700">
                  <div
                    className="h-full bg-indigo-500 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-zinc-400 dark:text-zinc-500">
              <ImagePlus className="w-16 h-16" />
            </div>
          )}

        </div>

        {/* Right - File Info or Placeholder */}
        <div className="flex flex-col justify-between py-6 px-4 relative">
          {!fileName ? (
            <div className="text-zinc-600 dark:text-zinc-300 text-center sm:text-left">
              <p className="text-md font-semibold mb-2">No file uploaded</p>
              <p className="text-sm opacity-80">
                Click or drag an image to upload. Max 5MB. JPG, PNG, etc.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-1">
                <p className="text-zinc-900 dark:text-white font-medium text-md truncate">
                  {fileName}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {fileSize ? `${(fileSize / 1024 / 1024).toFixed(2)} MB` : ""}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="absolute top-3 right-3 text-zinc-400 hover:text-red-500 dark:hover:text-red-400 transition"
                type="button"
              >
                <X className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
