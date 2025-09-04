"use client";

import SlideToDeleteButton from "../ruixenui/slide-to-delete-button";

export default function DemoSlideToDelete() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8 p-6">
      <SlideToDeleteButton
        label="Remove Item"
        deletedLabel="Removed!"
        onClick={() => alert("Item deleted")}
      />

      <SlideToDeleteButton
        className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
        label="Slide to Archive"
        deletedLabel="Archived"
      />
    </main>
  );
}
