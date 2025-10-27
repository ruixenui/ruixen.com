"use client";

import IconPagination from "@/registry/ruixenui/icon-pagination";

export default function IconPaginationDemo() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <IconPagination totalPages={200} maxVisible={7} className="mb-10" />
    </div>
  );
}
