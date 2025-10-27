"use client";

import { Archive } from "lucide-react";
import SlideToDeleteButton from "@/registry/ruixenui/slide-to-delete-button";

export default function DemoSlideToDelete() {
  return (
    <main className="flex flex-col items-center justify-center gap-8 min-h-screen">
      <SlideToDeleteButton
        label="Remove Item"
        deletedLabel="Removed!"
        onClick={() => alert("Item deleted")}
      />

      <SlideToDeleteButton
        className="bg-blue-100 text-blue-700 hover:bg-blue-200"
        label="Slide to Archive"
        deletedLabel="Archived"
        icon={<Archive className="w-5 h-5" />}
        handleClassName="bg-blue-500 hover:bg-blue-600"
      />
    </main>
  );
}
