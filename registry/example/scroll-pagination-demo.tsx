"use client";

import * as React from "react";
import ScrollPagination from "@/registry/ruixenui/scroll-pagination";

export default function ScrollPaginationDemo() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <ScrollPagination totalPages={20} className="mb-10" />
    </div>
  );
}
