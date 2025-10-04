"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export type DropFile = {
  id: string;
  file: File;
};

interface SketchpadDropzoneProps {
  files: DropFile[];
  onDrop?: (files: FileList) => void;
  onRemove?: (id: string) => void;
}

export function SketchpadDropzone({
  files,
  onDrop,
  onRemove,
}: SketchpadDropzoneProps) {
  const dropRef = React.useRef<HTMLDivElement | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Handle drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && onDrop) {
      onDrop(e.dataTransfer.files);
    }
  };

  // Handle click to open file manager
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && onDrop) {
      onDrop(e.target.files);
      e.target.value = ""; // reset input so same file can be selected again
    }
  };

  return (
    <div>
      {/* Hidden file input */}
      <input
        type="file"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />

      {/* Drop Zone / Sketchpad */}
      <div
        ref={dropRef}
        onClick={handleClick}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="relative border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg p-8 min-h-[300px] bg-white dark:bg-gray-800 flex flex-wrap gap-4 items-start cursor-pointer"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(0,0,0,0.05) 25px), repeating-linear-gradient(-90deg, transparent, transparent 24px, rgba(0,0,0,0.05) 25px)",
        }}
      >
        <AnimatePresence>
          {files.map((file) => (
            <motion.div
              key={file.id}
              initial={{ scale: 0, rotate: -5, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Card className="w-40 bg-yellow-50 dark:bg-yellow-900 shadow-lg relative">
                <CardContent className="p-2 flex justify-between items-center">
                  <p className="font-medium text-sm break-all">
                    {file.file.name}
                  </p>
                  {onRemove && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(file.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3 text-red-500" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
