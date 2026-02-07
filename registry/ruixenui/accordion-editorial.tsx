"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export interface AccordionEditorialItem {
  id: string;
  title: string;
  content: string;
}

export interface AccordionEditorialProps {
  items?: AccordionEditorialItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  collapsible?: boolean;
  className?: string;
}

const defaultItems: AccordionEditorialItem[] = [
  {
    id: "clarity",
    title: "Clarity over cleverness",
    content:
      "The best interfaces disappear. Every label, every spacing decision, every transition serves comprehension first. When something feels obvious, that\u2019s the result of invisible design work \u2014 not the absence of it.",
  },
  {
    id: "rhythm",
    title: "Rhythm in repetition",
    content:
      "Consistency isn\u2019t uniformity. A four-pixel grid, a limited type scale, a shared motion curve \u2014 these constraints create a visual rhythm users feel before they notice. The system breathes when the rules are right.",
  },
  {
    id: "restraint",
    title: "The discipline of restraint",
    content:
      "Removing the last unnecessary element is harder than adding the first. Restraint means questioning every border, every shadow, every color that doesn\u2019t earn its place. What remains carries more weight.",
  },
  {
    id: "materiality",
    title: "Digital materiality",
    content:
      "Screens have physics \u2014 not literal, but felt. A button that depresses, a card that lifts, a list that settles. These micro-responses create trust. The interface becomes a surface you can rely on.",
  },
  {
    id: "craft",
    title: "Craft at every scale",
    content:
      "The gap between good and great lives in the details nobody asked for. A hover state that eases perfectly. A loading skeleton that matches the content layout. Craft compounds when nobody is cutting corners.",
  },
];

export default function AccordionEditorial({
  items = defaultItems,
  defaultValue = "restraint",
  value,
  onValueChange,
  collapsible = true,
  className,
}: AccordionEditorialProps) {
  return (
    <div className={cn("mx-auto w-full max-w-xl", className)}>
      <Accordion
        type="single"
        defaultValue={value ? undefined : defaultValue}
        value={value}
        onValueChange={onValueChange}
        collapsible={collapsible}
      >
        {items.map((item) => (
          <AccordionItem
            value={item.id}
            key={item.id}
            className="group/item border-none"
          >
            <AccordionTrigger className="cursor-pointer py-3.5 hover:no-underline [&>svg]:hidden">
              <span className="text-xl tracking-[-0.02em] text-foreground/30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/item:translate-x-px group-hover/item:text-foreground/50 group-data-[state=open]/item:text-foreground/90">
                {item.title}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="border-l border-foreground/[0.08] pb-1 pl-4">
                <p className="text-sm leading-[1.8] text-foreground/50">
                  {item.content}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
