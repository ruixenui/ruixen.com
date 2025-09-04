"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

interface FAQAutoAccordionProps {
  title?: string;
  description?: React.ReactNode;
  sections?: FAQSection[];
  className?: string;
}

const defaultSections: FAQSection[] = [
  {
    title: "General",
    items: [
      {
        id: "gen-1",
        question: "What is the purpose of this platform?",
        answer:
          "Our platform is designed to simplify your workflow and save you hours every week using automation and AI-powered tools.",
      },
      {
        id: "gen-2",
        question: "Is this service available worldwide?",
        answer:
          "Yes, we support users across the globe. Some regional features may vary.",
      },
    ],
  },
  {
    title: "Billing",
    items: [
      {
        id: "bill-1",
        question: "Do you offer refunds?",
        answer:
          "Yes, we offer a 7-day refund policy. If you're unsatisfied, just contact our support within that time frame.",
      },
      {
        id: "bill-2",
        question: "Can I change my plan later?",
        answer:
          "Absolutely! You can upgrade or downgrade your plan anytime from your account dashboard.",
      },
    ],
  },
  {
    title: "Technical",
    items: [
      {
        id: "tech-1",
        question: "Does this integrate with other tools?",
        answer:
          "Yes! We support integrations with Slack, Notion, Zapier, and many more.",
      },
      {
        id: "tech-2",
        question: "Is there an API available?",
        answer:
          "Yes, our public API is available for all Pro users. Documentation can be found in the developer portal.",
      },
    ],
  },
];

export default function FAQAutoAccordion({
  title = "Have questions?",
  description = (
    <>
      We&apos;re here to help you understand how everything works. If you still
      have doubts, feel free to{" "}
      <a href="/contact" className="underline">
        reach out to our team
      </a>
      .
    </>
  ),
  sections = defaultSections,
  className,
}: FAQAutoAccordionProps) {
  return (
    <div className={`w-full max-w-6xl mx-auto px-4 py-20 ${className || ""}`}>
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Left side */}
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground text-lg">{description}</p>
        </div>

        {/* Right side: sections */}
        <div className="md:w-1/2 space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                {section.title}
              </h3>
              <Accordion type="multiple" className="w-full">
                {section.items.map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
