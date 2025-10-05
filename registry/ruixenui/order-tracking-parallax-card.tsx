"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface OrderTrackingParallaxCardProps {
  orderId: string;
  product: string;
  status: "Processing" | "Shipped" | "Out for Delivery" | "Delivered";
  eta: string;
  imageUrl?: string;
  className?: string;
}

export const OrderTrackingParallaxCard = React.forwardRef<
  HTMLDivElement,
  OrderTrackingParallaxCardProps
>(
  (
    {
      orderId,
      product,
      status,
      eta,
      imageUrl = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_truck.png",
      className,
    },
    ref,
  ) => {
    // Motion values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(ySpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const translateZImg = useTransform(ySpring, [-0.5, 0.5], [-40, 40]);
    const translateZContent = useTransform(ySpring, [-0.5, 0.5], [25, -25]);
    const translateZProgress = useTransform(ySpring, [-0.5, 0.5], [35, -35]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / rect.width - 0.5;
      const yPct = mouseY / rect.height - 0.5;
      x.set(xPct);
      y.set(yPct);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    // Progress steps
    const steps = ["Processing", "Shipped", "Out for Delivery", "Delivered"];
    const activeStep = steps.indexOf(status);

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn("relative h-[420px] w-80 rounded-2xl", className)}
      >
        <div
          style={{
            transform: "translateZ(40px)",
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-4 flex flex-col justify-between rounded-xl bg-card hover:shadow-xl p-5 border cursor-pointer"
        >
          {/* Truck Image */}
          <motion.div
            style={{ transform: "translateZ(60px)", translateY: translateZImg }}
            className="relative flex justify-center"
          >
            <img
              src={imageUrl}
              alt="Delivery truck"
              className="pointer-events-none h-28 object-contain"
            />
          </motion.div>

          {/* Order Info */}
          <motion.div
            style={{
              transform: "translateZ(30px)",
              translateY: translateZContent,
            }}
            className="mt-3 text-center"
          >
            <h2 className="text-lg font-bold text-card-foreground">
              Order #{orderId}
            </h2>
            <p className="text-sm text-muted-foreground">{product}</p>
            <span
              className={cn(
                "mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium",
                status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : status === "Out for Delivery"
                    ? "bg-blue-100 text-blue-700"
                    : status === "Shipped"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700",
              )}
            >
              {status}
            </span>
            <p className="mt-2 text-xs text-muted-foreground">ETA: {eta}</p>
          </motion.div>

          {/* Progress Tracker */}
          <motion.div
            style={{
              transform: "translateZ(45px)",
              translateY: translateZProgress,
            }}
            className="mt-4"
          >
            <div className="flex justify-between text-[10px] font-medium text-muted-foreground">
              {steps.map((step, i) => (
                <span
                  key={step}
                  className={cn(
                    "w-full text-center",
                    i === activeStep ? "text-primary font-semibold" : "",
                  )}
                >
                  {step}
                </span>
              ))}
            </div>
            <div className="mt-1 flex w-full justify-between">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 w-full mx-0.5 rounded-full",
                    i <= activeStep ? "bg-primary" : "bg-muted",
                  )}
                ></div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  },
);

OrderTrackingParallaxCard.displayName = "OrderTrackingParallaxCard";
