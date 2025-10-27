import Hero from "@/components/sections/hero";
import Testimonials from "@/components/sections/testimonials";
import VideoTestimonials from "@/components/sections/video-testimonials";
import FAQSection from "@/components/sections/faq-section";
import { FAQItem } from "@/components/sections/faq-section";

export default function Home() {
  const faqItems: FAQItem[] = [
    {
      id: "installation",
      question: "How do I install Ruixen UI in a Next.js project?",
      answer:
        "Install the package, add the provider, and import components on demand. Tree-shaking keeps bundles small. See the quickstart in our docs for step-by-step commands.",
    },
    {
      id: "theming",
      question: "Does Ruixen UI support dark mode and custom themes?",
      answer:
        "Yes. Toggle light/dark out of the box and extend brand tokens (colors, fonts, radius) via a single theme config. No app-wide refactors required.",
    },
    {
      id: "a11y",
      question: "What accessibility features are built in?",
      answer:
        "Components ship with ARIA attributes, focus management, keyboard navigation, and reduced-motion support so your UI is usable by everyone.",
    },
    {
      id: "performance",
      question: "How does Ruixen UI keep performance high?",
      answer:
        "We favor zero-runtime styles where possible, lean dependencies, and memoized patterns. Most components are tree-shakeable and SSR-friendly.",
    },
    {
      id: "licensing",
      question: "Is Ruixen UI free for commercial use?",
      answer:
        "A permissive license covers most use cases. For priority support and private components, upgrade to our Pro plan.",
    },
    {
      id: "integration",
      question: "Will it work with my existing stack?",
      answer:
        "Yes. Ruixen UI plays well with Next.js, React Query/TanStack, React Hook Form, Zod, and common charting/auth libraries.",
    },
  ];

  return (
    <>
      <Hero />
      <FAQSection faqItems={faqItems} className="py-16 md:py-24" />
      {/* <Testimonials /> */}
      {/* <VideoTestimonials /> */}
    </>
  );
}
