"use client";

import { SlidingPagination } from "@/registry/ruixenui/sliding-pagination";

export default function SlidingPaginationDemo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center px-4">
      <SlidingPagination totalPages={30} />
    </div>
  );
}
