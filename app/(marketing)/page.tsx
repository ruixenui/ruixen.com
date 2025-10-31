import Hero from "@/components/sections/hero";
import Testimonials from "@/components/sections/testimonials";
import VideoTestimonials from "@/components/sections/video-testimonials";
import FAQSection from "@/components/sections/faq-section";
import { FAQItem } from "@/components/sections/faq-section";

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
      id: "issues",
      question: "I found a bug — where can I report it?",
      answer:
        "You can open an issue on our GitHub repository or contact us directly. We actively fix and ship updates quickly.",
    },
    {
      id: "usage",
      question: "Can I use Ruixen UI in commercial projects?",
      answer:
        "Yes. Ruixen UI is free to use in both personal and commercial projects. No license or subscription required.",
    },
    {
      id: "future",
      question: "Is a Pro version or premium components planned?",
      answer:
        "Yes. A Pro version with advanced templates, layouts, and design systems is planned for the future — but the core Ruixen UI library will always remain free. We’ll also keep adding more open-source components and content regularly.",
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
