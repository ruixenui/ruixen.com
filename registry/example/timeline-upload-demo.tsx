"use client";

import * as React from "react";
import {
  TimelineUpload,
  UploadFile,
} from "@/registry/ruixenui/timeline-upload";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";

export default function DemoTimelineUpload() {
  const [files, setFiles] = React.useState<UploadFile[]>([]);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const folderRef = React.useRef<HTMLInputElement | null>(null);

  // Fake upload simulation
  React.useEffect(() => {
    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) =>
          f.status === "uploading"
            ? {
                ...f,
                progress: Math.min(f.progress + 15, 100),
                status: f.progress + 15 >= 100 ? "done" : "uploading",
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
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <h1 className="text-2xl font-medium">Timeline Upload Demo</h1>

      {/* Hidden file inputs */}
      <input
        type="file"
        multiple
        className="hidden"
        ref={inputRef}
        onChange={handleFileSelect}
      />
      <input
        type="file"
        className="hidden"
        ref={folderRef}
        onChange={handleFileSelect}
      />

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button onClick={() => inputRef.current?.click()}>Upload Files</Button>
        <Button variant="outline" onClick={() => folderRef.current?.click()}>
          Upload Folder
        </Button>
      </div>

      {/* Upload Timeline */}
      <TimelineUpload files={files} onRemove={handleRemove} />
    </div>
  );
}
