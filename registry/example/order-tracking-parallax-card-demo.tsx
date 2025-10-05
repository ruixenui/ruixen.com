"use client";

import * as React from "react";
import { OrderTrackingParallaxCard } from "@/registry/ruixenui/order-tracking-parallax-card";

export default function OrderTrackingParallaxDemo() {
  return (
    <OrderTrackingParallaxCard
      orderId="4582"
      product="Wireless Headphones"
      status="Out for Delivery"
      eta="Tomorrow, 7 PM"
    />
  );
}
