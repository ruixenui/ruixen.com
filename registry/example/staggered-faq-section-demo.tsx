import StaggeredFAQSection from "../ruixenui/staggered-faq-section";

export default function FAQsDemo() {
  const faqItems = [
    {
      id: "item-1",
      question: "What is Ruixen UI?",
      answer:
        "Ruixen UI is a modern, fully responsive design system that provides pre-built components, utilities, and layouts to help developers build scalable web applications quickly and efficiently.",
    },
    {
      id: "item-2",
      question: "Which platforms does Ruixen UI support?",
      answer:
        "Ruixen UI is built for web applications and works seamlessly with React, Next.js, and other modern JavaScript frameworks. It also supports dark mode and responsive layouts out of the box.",
    },
    {
      id: "item-3",
      question: "Can I customize Ruixen UI components?",
      answer:
        "Yes! All Ruixen UI components are fully customizable via props, CSS classes, and theme configuration. You can easily adapt colors, spacing, typography, and layout to match your brand.",
    },
    {
      id: "item-4",
      question: "Does Ruixen UI provide integration with third-party tools?",
      answer:
        "Absolutely. Ruixen UI includes ready-to-use integrations and patterns for popular tools and services, making it easier to connect your application with analytics, authentication, and workflow platforms.",
    },
    {
      id: "item-5",
      question: "Is there documentation and support available?",
      answer:
        "Yes, Ruixen UI comes with comprehensive documentation, live examples, and tutorials. Additionally, our community and support channels are available to help you implement components and resolve any issues.",
    },
  ];

  return (
    <div className="relative justify-center">
      <StaggeredFAQSection faqItems={faqItems} />
    </div>
  );
}
