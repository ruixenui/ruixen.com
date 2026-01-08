"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ElementType } from "react";

export interface AccordionIconItem {
  id: string;
  icon: ElementType;
  title: string;
  content: string;
}

interface AccordionIconProps {
  items: AccordionIconItem[];
  defaultValue?: string;
  className?: string;
}

export default function AccordionIcon({
  items,
  defaultValue,
  className,
}: AccordionIconProps) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultValue}
      className={className}
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-left text-[15px] hover:no-underline">
              <span className="flex items-center gap-3">
                <Icon className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-data-[state=open]:text-foreground" />
                <span>{item.title}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground ps-8">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
