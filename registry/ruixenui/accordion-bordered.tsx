"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface AccordionBorderedItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionBorderedProps {
  items: AccordionBorderedItem[];
  defaultValue?: string;
  className?: string;
}

export default function AccordionBordered({
  items,
  defaultValue,
  className,
}: AccordionBorderedProps) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultValue}
      className={className}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className="border rounded-lg px-4 mb-3 last:mb-0 data-[state=open]:bg-muted/50"
        >
          <AccordionTrigger className="text-left text-[15px] hover:no-underline py-4">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground pb-4">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
