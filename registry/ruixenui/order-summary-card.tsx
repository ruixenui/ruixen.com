"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface OrderSummaryCardProps {
  items?: {
    label: string;
    count: number;
    cost: number;
  }[];
  deliveryFee?: number;
  serviceCharge?: number;
  coupon?: {
    label: string;
    value: number;
  };
  onPlaceOrder?: () => void;
  currency?: string;
}

const mockItems = [
  {
    label: "AI Pro Membership",
    count: 1,
    cost: 79.99,
  },
];

export default function OrderSummaryCard({
  items = mockItems,
  deliveryFee = 0,
  serviceCharge = 4.99,
  coupon = { label: "NEWUSER", value: 10 },
  currency = "USD",
  onPlaceOrder,
}: OrderSummaryCardProps) {
  const total = items.reduce((sum, item) => sum + item.count * item.cost, 0);
  const netAmount = total + serviceCharge + deliveryFee - (coupon?.value ?? 0);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);

  return (
    <Card
      className={cn(
        "max-w-md w-full p-0 border relative overflow-hidden",
        "bg-white/30 dark:bg-zinc-800/30 backdrop-blur-md",
        "shadow-xl rounded-2xl",
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-zinc-100/10 dark:from-zinc-900/30 dark:to-zinc-800/10 pointer-events-none rounded-2xl z-0" />

      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-2 text-xl font-bold text-zinc-800 dark:text-zinc-100">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          Order Summary
        </CardTitle>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          A clear view of your purchase
        </p>
      </CardHeader>

      <CardContent className="space-y-6 relative z-10 text-zinc-800 dark:text-zinc-100">
        {/* Item List */}
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-sm"
            >
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                  {item.count} × {formatCurrency(item.cost)}
                </p>
              </div>
              <p className="font-semibold">
                {formatCurrency(item.count * item.cost)}
              </p>
            </div>
          ))}
        </div>

        {/* Charges Breakdown */}
        <div className="space-y-2 text-sm border-t border-zinc-300/30 dark:border-white/20 pt-4">
          <div className="flex justify-between">
            <span>Service</span>
            <span>{formatCurrency(serviceCharge)}</span>
          </div>
          {deliveryFee > 0 && (
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>{formatCurrency(deliveryFee)}</span>
            </div>
          )}
          {coupon && (
            <div className="flex justify-between text-green-600 dark:text-green-400 font-semibold">
              <span>Coupon ({coupon.label})</span>
              <span>-{formatCurrency(coupon.value)}</span>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="flex justify-between text-base font-semibold border-t border-zinc-300/30 dark:border-white/20 pt-4">
          <span>Total</span>
          <span>{formatCurrency(netAmount)}</span>
        </div>

        {/* Action Button */}
        <Button
          onClick={onPlaceOrder}
          className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-white/90 transition-all"
        >
          Checkout
        </Button>
      </CardContent>
    </Card>
  );
}
