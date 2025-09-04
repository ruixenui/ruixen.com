"use client";

import FAQScrollAccordion from "../ruixenui/faq-scroll-accordion";

const customFAQ = [
  {
    id: 1,
    question: "What is Next.js?",
    answer:
      "Next.js is a React framework for building fast and scalable web applications.",
  },
  {
    id: 2,
    question: "Does it support TypeScript?",
    answer: "Yes, Next.js has built-in support for TypeScript.",
  },
  {
    id: 3,
    question: "Can I deploy Next.js apps easily?",
    answer:
      "Yes, you can deploy on Vercel or any Node.js-compatible hosting platform.",
  },
];

export default function FAQScrollAccordionDemo() {
  return (
    <main className="min-h-[50vh] dark:bg-black text-gray-900 dark:text-white">
      <section className="py-20">
        {/* Using custom data */}
        {/* <FAQScrollAccordion data={customFAQ} />
        <div className="mt-20" /> */}

        {/* Using default data */}
        <FAQScrollAccordion />
      </section>
    </main>
  );
}
