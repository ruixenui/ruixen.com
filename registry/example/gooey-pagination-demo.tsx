"use client";

import { GooeyPagination } from "@/registry/ruixenui/gooey-pagination";

export default function GooeyPaginationDemo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center px-4">
      <GooeyPagination totalPages={7} />
    </div>
  );
}
