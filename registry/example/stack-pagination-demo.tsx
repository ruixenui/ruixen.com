"use client";

import * as React from "react";
import StackPagination from "@/registry/ruixenui/stack-pagination"; // <-- adjust path if needed
import { Card, CardContent } from "@/components/ui/card";

export default function StackPaginationDemo() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <h1 className="text-3xl font-bold mb-8">Stack Pagination Demo</h1>

      <StackPagination
        totalPages={15}
        visibleCount={5}
        className="w-full max-w-3xl"
      />

      <section className="mt-12 w-full max-w-2xl">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <p className="text-muted-foreground">
              Hover over any card to see it pop up. Click on a card to flip it
              and reveal the back side. Use the <strong>Prev</strong> and{" "}
              <strong>Next</strong> buttons to navigate between pages.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
