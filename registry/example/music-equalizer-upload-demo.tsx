"use client";

import * as React from "react";
import {
  MusicEqualizerUpload,
  UploadFile,
} from "@/registry/ruixenui/music-equalizer-upload";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";

export default function DemoMusicEqualizerUpload() {
  const [files, setFiles] = React.useState<UploadFile[]>([]);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  // Simulate upload completion after 3 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) =>
          f.status === "uploading" ? { ...f, status: "done" } : f,
        ),
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    // Filter only audio files
    const audioFiles = Array.from(e.target.files).filter((file) =>
      file.type.startsWith("audio/"),
    );

    const newFiles: UploadFile[] = audioFiles.map((file) => ({
      id: uuidv4(),
      file,
      status: "uploading",
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    e.target.value = ""; // reset input to allow re-upload
  };

  const handleRemove = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 min-h-screen">
      <h1 className="text-2xl font-semibold">
        Music Equalizer Upload Demo (Audio Only)
      </h1>

      <input
        type="file"
        multiple
        accept="audio/*" // Accept only audio files
        className="hidden"
        ref={inputRef}
        onChange={handleFileSelect}
      />
      <Button onClick={() => inputRef.current?.click()}>
        Upload Audio Files
      </Button>

      <MusicEqualizerUpload files={files} onRemove={handleRemove} />
    </div>
  );
}
