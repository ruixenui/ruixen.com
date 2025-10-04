"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type UploadFile = {
  id: string;
  file: File;
  progress: number;
  status: "uploading" | "done";
};

interface StackedCardsUploadProps {
  files: UploadFile[];
  onRemove?: (id: string) => void;
}

export function StackedCardsUpload({
  files,
  onRemove,
}: StackedCardsUploadProps) {
  return (
    <div className="flex flex-col gap-4 relative">
      <AnimatePresence>
        {files.map((file, i) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ zIndex: files.length - i }}
          >
            <Card className="relative overflow-hidden">
              {/* Progress background */}
              {file.status !== "done" && (
                <div
                  className="absolute top-0 left-0 h-full bg-gray-300 dark:bg-gray-700 opacity-30 z-0 transition-all"
                  style={{ width: `${file.progress}%` }}
                />
              )}

              <CardContent className="relative flex justify-between items-center p-4">
                {/* File name */}
                <p className="font-medium break-all flex-1 z-10 text-center sm:text-left">
                  {file.file.name}
                </p>

                {/* Remove button */}
                {onRemove && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 z-10"
                    onClick={() => onRemove(file.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
