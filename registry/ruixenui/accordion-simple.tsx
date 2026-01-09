"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface AccordionSimpleItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionSimpleProps {
  items: AccordionSimpleItem[];
  defaultValue?: string;
  className?: string;
}

export default function AccordionSimple({
  items,
  defaultValue,
  className,
}: AccordionSimpleProps) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultValue}
      className={className}
    >
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger className="text-left text-[15px] hover:no-underline">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
