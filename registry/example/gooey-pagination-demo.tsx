"use client";

import GooeyPagination from "@/registry/ruixenui/gooey-pagination";

export default function GooeyPaginationDemo() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <GooeyPagination totalPages={7} className="mb-12" />
    </div>
  );
}
