"use client";

import SlidingPagination from "@/registry/ruixenui/sliding-pagination";
import { useState } from "react";

export default function DemoPagination() {
  const [page, setPage] = useState(1);

  return (
    <div className="mt-10">
      <SlidingPagination
        totalPages={120}
        currentPage={page}
        onPageChange={setPage}
        maxVisiblePages={9} // optional, number of visible buttons
      />
    </div>
  );
}
