"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Upload, Image, File } from "lucide-react";

export type UploadType = "file" | "image" | "any";

export interface ButtonFileUploadProps {
  onFileSelect: (files: FileList) => void;
  type?: UploadType;
  accept?: string;
  multiple?: boolean;
  variant?: "default" | "outline" | "dashed";
  size?: "sm" | "md" | "lg";
  label?: string;
  disabled?: boolean;
  className?: string;
}

const variantStyles = {
  default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
  outline:
    "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
  dashed:
    "border-2 border-dashed border-muted-foreground/25 bg-background hover:border-muted-foreground/50 hover:bg-accent/50",
};

const sizeStyles = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-9 px-4 text-sm gap-2",
  lg: "h-10 px-5 text-base gap-2",
};

const typeConfig: Record<
  UploadType,
  { icon: React.ReactNode; accept: string }
> = {
  file: { icon: <File className="size-4" />, accept: "*/*" },
  image: { icon: <Image className="size-4" />, accept: "image/*" },
  any: { icon: <Upload className="size-4" />, accept: "*/*" },
};

export function ButtonFileUpload({
  onFileSelect,
  type = "any",
  accept,
  multiple = false,
  variant = "outline",
  size = "md",
  label,
  disabled = false,
  className,
}: ButtonFileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const config = typeConfig[type];

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files);
      e.target.value = "";
    }
  };

  const defaultLabel =
    type === "image"
      ? "Upload Image"
      : type === "file"
        ? "Upload File"
        : "Upload";

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept || config.accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
        disabled={disabled}
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
      >
        {config.icon}
        <span>{label || defaultLabel}</span>
      </button>
    </>
  );
}
