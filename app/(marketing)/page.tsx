import Hero from "@/components/sections/hero";
import FAQSection from "@/components/sections/faq-section";
import { FAQItem } from "@/components/sections/faq-section";
import WallOfLove from "@/components/sections/wall-of-love";
import VideoShowcaseGrid from "@/components/sections/video-showcase-grid";
import InspirationsSection from "@/components/sections/inspirations-section";

export default function Home() {
  const faqItems: FAQItem[] = [
    {
      id: "installation",
      question: "How do I install Ruixen UI in my project?",
      answer:
        "Run `npm i ruixen-ui` or `yarn add ruixen-ui`, wrap your app with the provider, and start importing components. It works seamlessly with Next.js and React.",
    },
    {
      id: "customization",
      question: "Can I customize components and themes?",
      answer:
        "Yes. Every component supports easy customization through classNames and tokens. You can also extend or override the theme globally.",
    },
    {
      id: "compatibility",
      question: "Does Ruixen UI work with Next.js and TypeScript?",
      answer:
        "Yes. Ruixen UI is built for modern stacks — fully typed with TypeScript and optimized for SSR and App Router in Next.js.",
    },
    {
      id: "updates",
      question: "How often are new components added?",
      answer:
        "We roll out new components and improvements regularly based on developer feedback and trending design patterns.",
    },
    {
      id: "usage",
      question: "Can I use Ruixen UI in commercial projects?",
      answer:
        "Yes. Ruixen UI is free to use in both personal and commercial projects. No license or subscription required.",
    },
    {
      id: "future",
      question: "Is there a Pro version available?",
      answer:
        "Yes! Ruixen Pro is now live at pro.ruixen.com with 50+ premium templates, advanced components, and lifetime updates. The core Ruixen UI library will always remain free and open-source.",
    },
  ];

  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Ruixen UI",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: "https://ruixen.com",
    description:
      "600+ free, open-source React components built with Tailwind CSS, TypeScript & Framer Motion. Supports Tailwind v3 + v4, Radix & Base UI primitives.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "Ruixen UI",
      url: "https://ruixen.com",
    },
    programmingLanguage: ["TypeScript", "React", "JavaScript"],
    license: "https://opensource.org/licenses/MIT",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <Hero />
      {/* <VideoShowcaseGrid /> */}
      <InspirationsSection />
      <WallOfLove />
      <FAQSection faqItems={faqItems} className="py-16 md:py-24" />
    </>
  );
}
