"use client";

import { useState } from "react";
import MorphingPageDots from "@/registry/ruixenui/morphing-page-dots";

export default function DemoPagination() {
  const [page, setPage] = useState(0);
  return (
    <div className="flex flex-col items-center gap-4 mt-20">
      <MorphingPageDots total={5} initialPage={page} onPageChange={setPage} />
    </div>
  );
}
