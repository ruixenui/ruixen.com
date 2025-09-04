"use client";

import FAQAutoAccordion from "../ruixenui/faq-auto-accordion";

const customSections = [
  {
    title: "Getting Started",
    items: [
      {
        id: "start-1",
        question: "How do I create an account?",
        answer: "Simply click the signup button and follow the instructions.",
      },
      {
        id: "start-2",
        question: "Is there a free trial?",
        answer:
          "Yes! We offer a 14-day free trial so you can test all features before committing.",
      },
    ],
  },
  {
    title: "Security",
    items: [
      {
        id: "sec-1",
        question: "How secure is my data?",
        answer:
          "We use enterprise-grade encryption and comply with GDPR standards.",
      },
    ],
  },
];

export default function FAQAutoAccordionDemo() {
  return (
    <main className="min-h-[50vh] dark:bg-black text-gray-900 dark:text-white">
      {/* Custom data */}
      <FAQAutoAccordion
        title="Need Help?"
        description="Find quick answers below, or contact our support anytime."
        sections={customSections}
      />

      {/* Default data (falls back to built-in FAQs) */}
      <FAQAutoAccordion />
    </main>
  );
}
