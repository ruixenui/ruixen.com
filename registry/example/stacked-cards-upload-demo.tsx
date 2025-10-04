"use client";

import * as React from "react";
import {
  StackedCardsUpload,
  UploadFile,
} from "@/registry/ruixenui/stacked-cards-upload";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";

export default function DemoStackedCardsUpload() {
  const [files, setFiles] = React.useState<UploadFile[]>([]);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  // Fake upload simulation
  React.useEffect(() => {
    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) =>
          f.status === "uploading"
            ? {
                ...f,
                progress: Math.min(f.progress + 10, 100),
                status: f.progress + 10 >= 100 ? "done" : "uploading",
              }
            : f,
        ),
      );
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles: UploadFile[] = Array.from(e.target.files).map((file) => ({
      id: uuidv4(),
      file,
      progress: 0,
      status: "uploading",
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemove = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Stacked Cards Upload Demo</h1>

      <input
        type="file"
        multiple
        className="hidden"
        ref={inputRef}
        onChange={handleFileSelect}
      />

      <Button onClick={() => inputRef.current?.click()}>Upload Files</Button>

      <StackedCardsUpload files={files} onRemove={handleRemove} />
    </div>
  );
}
