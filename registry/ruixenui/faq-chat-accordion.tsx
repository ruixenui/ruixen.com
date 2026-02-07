"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon?: string;
  iconPosition?: "left" | "right";
}

interface FaqChatAccordionProps {
  data?: FAQItem[];
  className?: string;
  timestamp?: string;
  questionClassName?: string;
  answerClassName?: string;
}

const defaultData: FAQItem[] = [
  {
    id: 1,
    question: "How late does the internet close?",
    answer: "The internet doesn't close. It's available 24/7.",
    icon: "❤️",
    iconPosition: "right",
  },
  {
    id: 2,
    question: "Do I need a license to browse this website?",
    answer: "No, you don't need a license to browse this website.",
  },
  {
    id: 3,
    question: "What flavour are the cookies?",
    answer:
      "Our cookies are digital, not edible. They're used for website functionality.",
  },
  {
    id: 4,
    question: "Can I get lost here?",
    answer: "Yes, but we do have a return policy.",
    icon: "⭐",
    iconPosition: "left",
  },
  {
    id: 5,
    question: "What if I click the wrong button?",
    answer: "Don't worry, you can always go back or refresh the page.",
  },
];

export default function FaqChatAccordion({
  data = defaultData,
  className,
  timestamp = "Every day, 9:01 AM",
  questionClassName,
  answerClassName,
}: FaqChatAccordionProps) {
  return (
    <div className={cn("p-4", className)}>
      {timestamp && (
        <div className="mb-4 text-sm text-muted-foreground">{timestamp}</div>
      )}

      <Accordion type="single" collapsible>
        {data.map((item) => (
          <AccordionItem
            value={item.id.toString()}
            key={item.id}
            className="group/faq mb-2 border-none"
          >
            <AccordionTrigger className="justify-start gap-x-4 p-0 hover:no-underline [&>svg]:hidden">
              <div
                className={cn(
                  "relative flex items-center space-x-2 rounded-xl p-2 transition-colors",
                  "bg-muted hover:bg-primary/10 group-data-[state=open]/faq:bg-primary/20 group-data-[state=open]/faq:text-primary",
                  questionClassName,
                )}
              >
                {item.icon && (
                  <span
                    className={cn(
                      "absolute bottom-6",
                      item.iconPosition === "right" ? "right-0" : "left-0",
                    )}
                    style={{
                      transform:
                        item.iconPosition === "right"
                          ? "rotate(7deg)"
                          : "rotate(-4deg)",
                    }}
                  >
                    {item.icon}
                  </span>
                )}
                <span className="font-medium">{item.question}</span>
              </div>

              <span className="text-muted-foreground group-data-[state=open]/faq:text-primary">
                <Plus className="block h-5 w-5 group-data-[state=open]/faq:hidden" />
                <Minus className="hidden h-5 w-5 group-data-[state=open]/faq:block" />
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="ml-7 mt-1 md:ml-16">
                <div
                  className={cn(
                    "relative max-w-xs rounded-2xl bg-primary px-4 py-2 text-primary-foreground",
                    answerClassName,
                  )}
                >
                  {item.answer}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
