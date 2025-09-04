"use client";

import SubscriptionPlans from "../ruixenui/subscription-plans";

export default function SubscriptionDemo() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          SubscriptionPlans Demo
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Default subscription plans below, plus a custom example.
        </p>
      </div>

      {/* Custom Plans */}
      <div className="mt-20">
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
