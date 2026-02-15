"use client";

import SlideToDeleteButton from "@/registry/ruixenui/slide-to-delete-button";

export default function SlideToDeleteButtonDemo() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <SlideToDeleteButton
        label="Slide to Delete"
        onConfirm={() => console.log("Deleted")}
      />
    </div>
  );
}
