"use client";

import StackPagination from "@/registry/ruixenui/stack-pagination";

export default function StackPaginationDemo() {
  return (
    <div className="flex flex-col items-center justify-center">
      <StackPagination
        totalPages={15}
        visibleCount={5}
        className="w-full max-w-3xl"
      />
    </div>
  );
}
