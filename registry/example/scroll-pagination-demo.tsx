"use client";

import * as React from "react";
import ScrollPagination from "@/registry/ruixenui/scroll-pagination";
import { Card, CardContent } from "@/components/ui/card";

export default function ScrollPaginationDemo() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Scroll Pagination Demo
      </h1>

      {/* ScrollPagination Component */}
      <ScrollPagination totalPages={20} className="mb-10" />

      {/* Info Card */}
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-6 text-center space-y-4">
          <h2 className="text-xl font-semibold">Interactive Pagination</h2>
          <p className="text-lg text-primary font-medium">
            Use <strong>mouse wheel</strong> or click arrows to navigate
          </p>
          <p className="text-sm text-muted-foreground">
            Use the <strong>mouse wheel</strong> to scroll through pages or
            click the arrows to navigate. The number in the center changes with
            a smooth animation.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
