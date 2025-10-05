"use client";

import * as React from "react";
import { ProductBounceCard } from "@/registry/ruixenui/product-bounce-card";

export default function ProductBounceDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <ProductBounceCard
        imageUrl="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_shirt_product.png"
        alt="Ruixen Shirt"
      />
    </div>
  );
}
