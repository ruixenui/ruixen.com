"use client";

import { ButtonFileUpload } from "@/registry/ruixenui/button-file-upload";

export default function ButtonFileUploadDemo() {
  const handleFileSelect = (files: FileList) => {
    console.log(
      "Selected files:",
      Array.from(files).map((f) => f.name),
    );
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <ButtonFileUpload onFileSelect={handleFileSelect} label="Upload File" />
      <ButtonFileUpload
        variant="outline"
        type="image"
        onFileSelect={handleFileSelect}
        label="Upload Image"
      />
      <ButtonFileUpload
        variant="dashed"
        multiple
        onFileSelect={handleFileSelect}
        label="Upload Multiple"
      />
    </div>
  );
}
