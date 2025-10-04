"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Circle, CheckCircle2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export type UploadFile = {
  id: string;
  file: File;
  progress: number;
  status: "uploading" | "done";
};

interface TimelineUploadProps {
  files: UploadFile[];
  onRemove?: (id: string) => void;
}

export function TimelineUpload({ files, onRemove }: TimelineUploadProps) {
  return (
    <div className="flex flex-col gap-6">
      {files.map((file, i) => (
        <div key={file.id} className="flex items-start gap-4">
          {/* Timeline connector */}
          <div className="flex flex-col items-center">
            {file.status === "done" ? (
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            ) : (
              <Circle className="h-6 w-6 text-blue-500" />
            )}
            {i !== files.length - 1 && <div className="w-px flex-1 bg-muted" />}
          </div>

          {/* File Card */}
          <Card className="w-full">
            <CardContent className="p-3 space-y-2">
              <div className="flex justify-between items-center">
                {/* File/Folder Name */}
                <p className="font-medium break-all flex-1 pr-4">
                  📄 {file.file.name}
                </p>

                {/* Status and Remove */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {file.status === "done" ? "Completed" : "Uploading..."}
                  </span>
                  {onRemove && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => onRemove(file.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              {file.status !== "done" && (
                <Progress value={file.progress} className="h-2" />
              )}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
