"use client";

import { ScrollPagination } from "@/registry/ruixenui/scroll-pagination";

export default function ScrollPaginationDemo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center px-4">
      <ScrollPagination totalPages={20} />
    </div>
  );
}
