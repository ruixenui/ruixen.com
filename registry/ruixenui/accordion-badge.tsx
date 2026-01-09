"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export interface AccordionBadgeItem {
  id: string;
  title: string;
  content: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
}

interface AccordionBadgeProps {
  items: AccordionBadgeItem[];
  defaultValue?: string;
  className?: string;
}

export default function AccordionBadge({
  items,
  defaultValue,
  className,
}: AccordionBadgeProps) {
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
            <span className="flex items-center gap-3">
              <span>{item.title}</span>
              {item.badge && (
                <Badge
                  variant={item.badgeVariant || "secondary"}
                  className="text-xs"
                >
                  {item.badge}
                </Badge>
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
