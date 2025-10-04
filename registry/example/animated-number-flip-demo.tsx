"use client";

import { useState } from "react";
import AnimatedNumberFlip from "@/registry/ruixenui/animated-number-flip";
import { Button } from "@/components/ui/button";

export default function Demo() {
  const [page, setPage] = useState(1);

  return (
    <div className="flex flex-col items-center gap-6 py-20">
      <AnimatedNumberFlip value={page} />
      <div className="flex gap-4">
        <Button onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</Button>
        <Button onClick={() => setPage((p) => p + 1)}>Next</Button>
      </div>
    </div>
  );
}
