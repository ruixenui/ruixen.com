"use client";

import * as React from "react";
import {
  SketchpadDropzone,
  DropFile,
} from "@/registry/ruixenui/sketchpad-dropzone";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";

export default function DemoSketchpadDropzone() {
  const [files, setFiles] = React.useState<DropFile[]>([]);

  const handleDrop = (fileList: FileList) => {
    const newFiles = Array.from(fileList).map((file) => ({
      id: uuidv4(),
      file,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemove = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Sketchpad Drop Zone Demo</h1>

      <p className="text-sm text-muted-foreground">
        Drag and drop files onto the sketchpad. They will appear as pinned
        notes.
      </p>

      <SketchpadDropzone
        files={files}
        onDrop={handleDrop}
        onRemove={handleRemove}
      />

      <Button onClick={() => setFiles([])} variant="outline" className="mt-4">
        Clear All
      </Button>
    </div>
  );
}
