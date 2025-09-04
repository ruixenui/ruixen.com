"use client";

import React from "react";
import CompositeFeatureShowcase from "@/components/ruixen-featured-message-card";

export default function DemoPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-10">
      <div className="max-w-md w-full">
        <CompositeFeatureShowcase />
      </div>
    </main>
  );
}
