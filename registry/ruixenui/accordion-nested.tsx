"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface AccordionNestedSubItem {
  id: string;
  title: string;
  content: string;
}

export interface AccordionNestedItem {
  id: string;
  title: string;
  content?: string;
  subItems?: AccordionNestedSubItem[];
}

interface AccordionNestedProps {
  items: AccordionNestedItem[];
  defaultValue?: string;
  className?: string;
}

export default function AccordionNested({
  items,
  defaultValue,
  className,
}: AccordionNestedProps) {
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
          <AccordionContent>
            {item.content && (
              <p className="text-muted-foreground mb-3">{item.content}</p>
            )}
            {item.subItems && item.subItems.length > 0 && (
              <Accordion type="single" collapsible className="ps-4 border-s">
                {item.subItems.map((subItem) => (
                  <AccordionItem key={subItem.id} value={subItem.id}>
                    <AccordionTrigger className="text-left text-sm hover:no-underline py-2">
                      {subItem.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm">
                      {subItem.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
