"use client";

import * as React from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon?: string;
  iconPosition?: "left" | "right";
}

interface FaqAccordionProps {
  data: FAQItem[];
  className?: string;
  timestamp?: string;
  questionClassName?: string;
  answerClassName?: string;
}

export default function FaqAccordion({
  data,
  className,
  timestamp = "Every day, 9:01 AM",
  questionClassName,
  answerClassName,
}: FaqAccordionProps) {
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  return (
    <section className="flex items-center justify-center bg-white dark:bg-black">
      <div className={cn("relative container mx-auto px-4  py-16 md:py-32 flex flex-col md:flex-row gap-10 items-start justify-between border border-gray-200 dark:border-gray-800", className)}>
        {/* LEFT TEXT BLOCK */}
        <div className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-zinc-500" />
        <div className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-zinc-500" />
        <div className="w-full">
          {/* {timestamp && (
            <div className="mb-4 text-sm text-muted-foreground">{timestamp}</div>
          )} */}

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Everything you need to know about Ruixen UI. Can’t find the answer you’re looking for? Feel free to reach out to our team anytime.
          </p>
        </div>

        {/* RIGHT ACCORDION BLOCK */}
        <div className="w-full">
          <Accordion.Root
            type="single"
            collapsible
            value={openItem || ""}
            onValueChange={(value) => setOpenItem(value)}
          >
            {data.map((item) => (
              <Accordion.Item
                value={item.id.toString()}
                key={item.id}
                className="mb-2 "
              >
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-fit pr-2 items-center justify-start gap-x-4 border border-gray-300 dark:border-gray-700 rounded-2xl mb-3">
                    <div
                      className={cn(
                        "relative flex text-2xl items-center space-x-2 rounded-xl p-3 transition-colors",
                        openItem === item.id.toString()
                          ? "bg-primary/20 text-primary"
                          : "bg-muted hover:bg-primary/10",
                        questionClassName
                      )}
                    >
                      {item.icon && (
                        <span
                          className={cn(
                            "absolute bottom-6",
                            item.iconPosition === "right" ? "right-0" : "left-0"
                          )}
                          style={{
                            transform: item.iconPosition === "right"
                              ? "rotate(7deg)"
                              : "rotate(-4deg)",
                          }}
                        >
                          {item.icon}
                        </span>
                      )}
                      <span className="font-medium">{item.question}</span>
                    </div>

                    <span
                      className={cn(
                        "text-muted-foreground",
                        openItem === item.id.toString() && "text-primary"
                      )}
                    >
                      {openItem === item.id.toString() ? (
                        <Minus className="h-5 w-5" />
                      ) : (
                        <Plus className="h-5 w-5" />
                      )}
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content asChild forceMount>
                  <motion.div
                    initial="collapsed"
                    animate={openItem === item.id.toString() ? "open" : "collapsed"}
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-24 mt-1 rounded-3xl border border-gray-200 dark:border-white/20 bg-black backdrop-blur-md shadow-md dark:bg-white dark:border-white/20 shadow-white/20">
                      <div
                        className={cn(
                          "relative max-w-xs px-4 py-2 !text-white dark:!text-black font-medium text-base md:text-lg",
                          answerClassName
                        )}
                      >
                        {item.answer}
                      </div>
                    </div>
                  </motion.div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </section>
  );
}
