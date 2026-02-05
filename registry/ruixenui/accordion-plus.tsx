"use client";

import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface AccordionPlusItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionPlusProps {
  items: AccordionPlusItem[];
  defaultValue?: string;
  className?: string;
}

export default function AccordionPlus({
  items,
  defaultValue,
  className,
}: AccordionPlusProps) {
  const [openItem, setOpenItem] = useState<string | undefined>(defaultValue);

  return (
    <div className={className}>
      {items.map((item) => {
        const isOpen = openItem === item.id;
        return (
          <div key={item.id} className="border-b last:border-b-0">
            <h3 className="flex">
              <button
                type="button"
                onClick={() => setOpenItem(isOpen ? undefined : item.id)}
                className="flex flex-1 items-center justify-between py-4 text-left text-[15px] font-medium transition-all hover:underline"
              >
                {item.title}
                {isOpen ? (
                  <Minus className="h-4 w-4 shrink-0 text-muted-foreground" />
                ) : (
                  <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />
                )}
              </button>
            </h3>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-200 ease-in-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="pb-4 text-sm text-muted-foreground">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
