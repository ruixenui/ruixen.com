"use client";

import { FAQScrollAccordion } from "@/registry/ruixenui/faq-scroll-accordion";
import type { FAQItem } from "@/registry/ruixenui/faq-scroll-accordion";

const items: FAQItem[] = [
  {
    question: "What is Ruixen UI?",
    answer:
      "A curated collection of beautifully designed, production-ready components built with React and Tailwind CSS. Every component is crafted with animation-first thinking and zero unnecessary dependencies.",
  },
  {
    question: "How do I install components?",
    answer:
      "Use the shadcn CLI to add any component directly into your project. Each component lives in your codebase — no node_modules, full ownership, complete customization.",
  },
  {
    question: "Is it open-source?",
    answer:
      "Yes, fully open-source under the MIT license. Use it in personal projects, commercial products, client work — no restrictions.",
  },
  {
    question: "Do components work with dark mode?",
    answer:
      "Every component uses CSS custom properties and theme tokens. They adapt to light and dark modes automatically with no extra configuration.",
  },
  {
    question: "Can I customize the animations?",
    answer:
      "Absolutely. All transitions use standard CSS properties — timing, easing, and duration are easy to adjust. No animation library lock-in.",
  },
];

export default function FAQScrollAccordionDemo() {
  return (
    <FAQScrollAccordion
      items={items}
      title="Frequently asked questions"
      subtitle="Everything you need to know."
      className="py-0 md:py-0"
    />
  );
}
