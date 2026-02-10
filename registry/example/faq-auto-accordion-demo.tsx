"use client";

import { FAQAutoAccordion } from "@/registry/ruixenui/faq-auto-accordion";
import type { FAQItem } from "@/registry/ruixenui/faq-auto-accordion";

const items: FAQItem[] = [
  {
    question: "What is the purpose of this platform?",
    answer:
      "Our platform simplifies your workflow and saves hours every week using automation and AI-powered tools designed for modern teams.",
  },
  {
    question: "Is this service available worldwide?",
    answer:
      "Yes, we support users across the globe with localized features, multi-currency billing, and regional compliance.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes, we offer a 7-day refund policy. If you're unsatisfied, contact our support within that time frame for a full refund.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Absolutely! Upgrade or downgrade anytime from your account dashboard. Changes take effect immediately with prorated billing.",
  },
  {
    question: "Does this integrate with other tools?",
    answer:
      "We support integrations with Slack, Notion, Zapier, and many more through our extensive plugin ecosystem.",
  },
  {
    question: "Is there an API available?",
    answer:
      "Our public REST and GraphQL APIs are available for all Pro users. Full documentation lives in the developer portal.",
  },
];

export default function FAQAutoAccordionDemo() {
  return (
    <FAQAutoAccordion
      items={items}
      title="Have questions?"
      subtitle="Everything you need to know."
      className="py-0 md:py-0"
    />
  );
}
