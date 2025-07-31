"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  LayoutList,
  Settings,
  Accessibility,
} from "lucide-react";
import { ElementType } from "react";

type AccordionItemType = {
  icon: ElementType;
  value: string;
  question: string;
  answer: string;
};

const accordionItems: AccordionItemType[] = [
  {
    icon: HelpCircle,
    value: "item-1",
    question: "Is this an accordion component?",
    answer:
      "Yes. This is an accordion component built with Radix UI and styled with Tailwind CSS.",
  },
  {
    icon: LayoutList,
    value: "item-2",
    question: "How do I use this component?",
    answer:
      "You can use this component to organize content in collapsible sections. It's perfect for FAQs, settings panels, or any content that benefits from progressive disclosure.",
  },
  {
    icon: Settings,
    value: "item-3",
    question: "Can I customize the styling?",
    answer:
      "Absolutely! This component uses Tailwind CSS for styling, so you can easily customize the appearance by modifying the class names. The component is also built with accessibility in mind.",
  },
  {
    icon: Accessibility,
    value: "item-4",
    question: "Is it accessible?",
    answer:
      "Yes! This accordion component is built on top of Radix UI's Accordion primitive, which provides full keyboard navigation and proper ARIA attributes for screen readers.",
  },
];

export default function Accordion_01() {
  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-6">
      <Accordion type="single" collapsible className="space-y-3">
        {accordionItems.map(({ icon: Icon, value, question, answer }) => (
          <AccordionItem
            key={value}
            value={value}
            className="group border border-gray-200 dark:border-gray-600 rounded-md overflow-hidden transition-all duration-300"
          >
            <AccordionTrigger
              className="flex items-center justify-between w-full px-4 py-3 bg-transparent text-left group-data-[state=open]:bg-black/[0.04] dark:group-data-[state=open]:bg-white/[0.05] transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <Icon className="w-5 h-5 transition-colors duration-300 text-black/60 dark:text-white/60 group-data-[state=open]:text-black dark:group-data-[state=open]:text-white" />
                <span className="text-base font-medium text-black dark:text-white">
                  {question}
                </span>
              </div>
              {/* No chevron rotation */}
              <span className="text-xs text-black/40 dark:text-white/40 group-data-[state=open]:text-black dark:group-data-[state=open]:text-white">
                {value.toUpperCase()}
              </span>
            </AccordionTrigger>
            <AccordionContent className="relative px-4 py-3 text-sm text-black dark:text-white border-t border-gray-200 dark:border-gray-600 before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-black dark:before:bg-white before:opacity-0 group-data-[state=open]:before:opacity-100 transition-all duration-300">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
