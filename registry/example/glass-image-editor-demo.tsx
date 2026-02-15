"use client";

import {
  ImageEditor,
  ImageDropZone,
  ImageCanvas,
  ImageStrip,
  ImageBar,
} from "@/registry/ruixenui/glass-image-editor";

export default function GlassImageEditorDemo() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "48px 16px",
      }}
    >
      <ImageEditor>
        <ImageDropZone />
        <ImageCanvas />
        <ImageStrip />
        <ImageBar />
      </ImageEditor>
    </div>
  );
}
