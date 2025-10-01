"use client";

import ComparisonTable, { Item } from "@/registry/ruixenui/comparison-table";

const customData: Item[] = [
  { id: 1, category: "Camera", price: 900, rating: 4.6, stock: 25 },
  { id: 2, category: "Drone", price: 1200, rating: 4.8, stock: 12 },
  { id: 3, category: "Camera", price: 750, rating: 4.3, stock: 18 },
  { id: 4, category: "Headphones", price: 250, rating: 4.5, stock: 40 },
];

export default function ComparisonDemo() {
  return (
    <div className="p-6">
      <ComparisonTable
        data={customData}
        categories={["Camera", "Drone", "Headphones"]}
        title="Gadget Comparison Table"
      />
    </div>
  );
}
