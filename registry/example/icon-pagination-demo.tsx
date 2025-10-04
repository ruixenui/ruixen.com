"use client";

import * as React from "react";
import IconPagination from "@/registry/ruixenui/icon-pagination";
import { Card, CardContent } from "@/components/ui/card";

export default function IconPaginationDemo() {
  const [currentPage, setCurrentPage] = React.useState(0);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Icon Pagination Demo
      </h1>

      {/* Pagination Component */}
      <IconPagination totalPages={200} maxVisible={7} className="mb-10" />

      {/* Display current page info */}
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-6 text-center space-y-4">
          <h2 className="text-xl font-semibold">Current Page</h2>
          <p className="text-lg text-primary font-medium">
            You are on <strong>Page {currentPage + 1}</strong>
          </p>
          <p className="text-sm text-muted-foreground">
            Click on an icon to change pages or use the arrow buttons to
            navigate. Hover over an icon to see the tooltip label.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
