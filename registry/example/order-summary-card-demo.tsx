"use client";

import OrderSummaryCard from "../ruixenui/order-summary-card";

export default function Demo() {
  return (
    <div className="flex flex-col gap-6 justify-center items-center w-full">
      <OrderSummaryCard
        items={[
          {
            label: "AI Pro Membership",
            count: 1,
            cost: 79.99,
          },
        ]}
        deliveryFee={0}
        serviceCharge={4.99}
        coupon={{ label: "NEWUSER", value: 10 }}
        currency="USD"
        onPlaceOrder={() => {}}
      />
    </div>
  );
}
