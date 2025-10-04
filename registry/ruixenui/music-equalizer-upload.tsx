"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type UploadFile = {
  id: string;
  file: File;
  status: "uploading" | "done";
};

interface MusicEqualizerUploadProps {
  files: UploadFile[];
  onRemove?: (id: string) => void;
}

export function MusicEqualizerUpload({
  files,
  onRemove,
}: MusicEqualizerUploadProps) {
  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence>
        {files.map((file) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-full relative overflow-hidden">
              <CardContent className="flex justify-between items-center p-3">
                {/* File name */}
                <p className="font-medium break-all">{file.file.name}</p>

                {/* Equalizer bars */}
                {file.status === "uploading" && (
                  <div className="flex items-end gap-1 ml-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 bg-blue-500 dark:bg-blue-400"
                        animate={{ height: ["4px", "12px", "4px"] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.5 + i * 0.1,
                          repeatType: "loop",
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Remove button */}
                {onRemove && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 ml-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(file.id);
                    }}
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
