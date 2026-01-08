"use client";

import * as React from "react";
import ButtonFileUpload from "@/registry/ruixenui/button-file-upload";

export default function ButtonFileUploadDemo() {
  const handleFileSelect = (files: FileList | null) => {
    if (files) {
      console.log(
        "Selected files:",
        Array.from(files).map((f) => f.name),
      );
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <ButtonFileUpload onFileSelect={handleFileSelect}>
        Upload File
      </ButtonFileUpload>
      <ButtonFileUpload
        variant="outline"
        accept="image/*"
        onFileSelect={handleFileSelect}
      >
        Upload Image
      </ButtonFileUpload>
      <ButtonFileUpload
        variant="secondary"
        multiple
        onFileSelect={handleFileSelect}
      >
        Upload Multiple
      </ButtonFileUpload>
    </div>
  );
}
