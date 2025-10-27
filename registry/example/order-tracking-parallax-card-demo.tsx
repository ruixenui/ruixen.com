"use client";

import * as React from "react";
import { OrderTrackingParallaxCard } from "@/registry/ruixenui/order-tracking-parallax-card";

export default function OrderTrackingParallaxDemo() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <OrderTrackingParallaxCard
        orderId="4582"
        product="Wireless Headphones"
        status="Out for Delivery"
        eta="Tomorrow, 7 PM"
        imageUrl="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/delivery-man.png"
      />
    </div>
  );
}
