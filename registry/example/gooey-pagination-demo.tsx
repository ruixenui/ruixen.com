"use client";

import * as React from "react";
import GooeyPagination from "@/registry/ruixenui/gooey-pagination";
import { Card, CardContent } from "@/components/ui/card";

export default function GooeyPaginationDemo() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Gooey Pagination Demo
      </h1>

      {/* GooeyPagination component */}
      <GooeyPagination totalPages={7} className="mb-12" />

      {/* Info card */}
      <Card className="max-w-md shadow-md">
        <CardContent className="p-6 text-center space-y-3">
          <h2 className="text-xl font-semibold">How to Use</h2>
          <p className="text-muted-foreground">
            Click the dots to switch pages, or use the arrows to navigate
            between pages.
          </p>
          <p className="text-muted-foreground">
            Notice the gooey animation effect when the active dot moves.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
