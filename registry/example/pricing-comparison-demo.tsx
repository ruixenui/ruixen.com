"use client";

import { MoveRight, PhoneCall } from "lucide-react";
import PricingComparison from "../ruixenui/pricing-comparison";

export default function PricingDemo() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          PricingComparison Demo
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Default plans below, plus a custom example.
        </p>
      </div>

      {/* Custom Pricing Comparison */}
      <div className="mt-20">
        <PricingComparison
          plans={[
            {
              name: "Custom Starter",
              price: "$29",
              description: "Ideal for hobby projects",
              cta: "Get Started",
              icon: <MoveRight className="w-4 h-4" />,
              buttonVariant: "default",
              features: {
                sso: true,
                twoFA: false,
                encryption: true,
                auditLogs: false,
                ai: false,
                backups: false,
                versioning: false,
                templates: true,
                integrations: false,
                members: "3 members",
                multiplayer: false,
                roles: false,
                support: false,
                orchestration: false,
                deployment: false,
                monitoring: false,
                apiAccess: false,
              },
            },
            {
              name: "Pro",
              price: "$79",
              description: "Best for growing teams",
              cta: "Subscribe",
              icon: <MoveRight className="w-4 h-4" />,
              buttonVariant: "default",
              features: {
                sso: true,
                twoFA: true,
                encryption: true,
                auditLogs: true,
                ai: true,
                backups: true,
                versioning: true,
                templates: true,
                integrations: true,
                members: "20 members",
                multiplayer: true,
                roles: true,
                support: true,
                orchestration: true,
                deployment: true,
                monitoring: true,
                apiAccess: true,
              },
            },
          ]}
          categories={[
            {
              title: "Custom Security",
              items: [
                { key: "sso", label: "SSO" },
                { key: "twoFA", label: "2FA" },
              ],
            },
            {
              title: "Custom Productivity",
              items: [
                { key: "ai", label: "AI Assistant" },
                { key: "templates", label: "Templates" },
              ],
            },
          ]}
        />
      </div>
    </main>
  );
}
