"use client";

import { ButtonFileUpload } from "@/registry/ruixenui/button-file-upload";

export default function ButtonFileUploadDemo() {
  return (
    <div className="flex items-center justify-center min-h-[400px] gap-4">
      <ButtonFileUpload
        onFileSelect={(files) =>
          console.log(Array.from(files).map((f) => f.name))
        }
        label="Upload File"
      />
      <ButtonFileUpload
        onFileSelect={(files) =>
          console.log(Array.from(files).map((f) => f.name))
        }
        accept="image/*"
        label="Upload Image"
      />
    </div>
  );
}
