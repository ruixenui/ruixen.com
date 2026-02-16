"use client";

import { StackPagination } from "@/registry/ruixenui/stack-pagination";

export default function StackPaginationDemo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center px-4">
      <StackPagination totalPages={15} />
    </div>
  );
}
