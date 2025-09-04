"use client";

import CompactAccordion, {
  CompactAccordionItem,
} from "../ruixenui/compact-accordion";
import { HelpCircle, LayoutList, Settings, Accessibility } from "lucide-react";

const demoItems: CompactAccordionItem[] = [
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

export default function CompactAccordionDemo() {
  return <CompactAccordion items={demoItems} />;
}
