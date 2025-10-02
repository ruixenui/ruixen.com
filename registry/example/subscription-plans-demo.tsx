"use client";

import SubscriptionPlans from "../ruixenui/subscription-plans";

export default function SubscriptionDemo() {
  return (
    <main className="p-6">
      {/* Custom Plans */}
      <div>
        <SubscriptionPlans
          plans={[
            {
              title: "Basic Plan",
              price: "$9",
              billing: "per month",
              features: ["Access to 10 UI components", "Community support"],
              button: "Subscribe",
            },
            {
              title: "Premium Plan",
              price: "$29",
              billing: "per month",
              recommended: true,
              features: [
                "All Starter features",
                "Priority support",
                "Access to all templates",
              ],
              button: "Subscribe",
            },
            {
              title: "Team Plan",
              price: "$99",
              billing: "per month",
              features: [
                "Up to 10 team members",
                "Enterprise templates",
                "Dedicated support",
              ],
              button: "Subscribe",
            },
          ]}
        />
      </div>
    </main>
  );
}
