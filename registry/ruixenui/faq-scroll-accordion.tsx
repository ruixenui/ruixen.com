"use client";

import * as React from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon?: string;
  iconPosition?: "left" | "right";
}

interface FAQScrollAccordionProps {
  data?: FAQItem[];
  className?: string;
  questionClassName?: string;
  answerClassName?: string;
}

const defaultData: FAQItem[] = [
  {
    id: 1,
    question: "What is Ruixen UI?",
    answer:
      "Ruixen UI is a sleek and modern UI component library built with React and Tailwind CSS, designed to help developers create beautiful, responsive, and accessible web applications faster.",
  },
  {
    id: 2,
    question: "How do I install Ruixen UI?",
    answer:
      "You can install Ruixen UI via your terminal using npm or yarn: `npm install ruixenui` or `yarn add ruixenui`.",
  },
  {
    id: 3,
    question: "Is Ruixen UI open-source?",
    answer:
      "Yes, Ruixen UI is completely open-source and available under the MIT license. You’re free to use it in both personal and commercial projects.",
  },
  {
    id: 4,
    question: "Where can I find the documentation?",
    answer:
      "You can find full documentation, usage examples, and component APIs at our official site: docs.ruixenui.com.",
  },
  {
    id: 5,
    question: "Can I contribute to Ruixen UI?",
    answer:
      "Definitely! Ruixen UI thrives on community support. Visit our GitHub repository to explore contribution guidelines, report issues, or submit pull requests.",
  },
];

export default function FAQScrollAccordion({
  data = defaultData,
  className,
  questionClassName,
  answerClassName,
}: FAQScrollAccordionProps) {
  const [openItem, setOpenItem] = React.useState<string | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const accordionRefs = React.useRef<Map<string, HTMLDivElement>>(new Map());
  const contentRefs = React.useRef<Map<string, HTMLDivElement>>(new Map());

  // Register GSAP plugins
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  // Set up GSAP animations
  useGSAP(() => {
    if (!containerRef.current || data.length === 0) return;

    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${data.length * 200}`,
        scrub: 0.3,
        pin: true,
        markers: false,
      },
    });

    data.forEach((item, index) => {
      const contentRef = contentRefs.current.get(item.id.toString());
      if (contentRef) {
        tl.add(() => {
          setOpenItem(item.id.toString());
        }, index * 2);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [data]);

  const handleAccordionChange = (value: string) => {
    setOpenItem(value === openItem ? null : value);
  };

  return (
    <div
      ref={containerRef}
      className={cn("max-w-4xl mx-auto text-center py-16 h-[300vh]", className)}
    >
      <h2 className="text-3xl font-bold mb-2">
        <Link
          href="https://github.com/ruixenui/ruixen-free-components"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition-colors"
        >
          Frequently Asked Questions
        </Link>
      </h2>
      <p className="text-gray-600 dark:text-gray-200 mb-6">
        Find answers to common questions about our graphic assets, components,
        and licensing.
      </p>

      <Accordion.Root
        type="single"
        collapsible
        value={openItem || ""}
        onValueChange={handleAccordionChange}
      >
        {data.map((item) => (
          <Accordion.Item
            value={item.id.toString()}
            key={item.id}
            className="mb-6"
          >
            <div
              ref={(el) => {
                if (el) accordionRefs.current.set(item.id.toString(), el);
              }}
              data-id={item.id.toString()}
              className="relative"
            >
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center justify-start gap-x-4">
                  <div
                    className={cn(
                      "relative flex items-center space-x-2 rounded-xl p-2 transition-colors",
                      openItem === item.id.toString()
                        ? "bg-primary/20 text-primary"
                        : "bg-muted hover:bg-primary/10",
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

                  <span
                    className={cn(
                      "text-gray-600 dark:text-gray-200",
                      openItem === item.id.toString() && "text-primary",
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
                  ref={(el) => {
                    if (el) contentRefs.current.set(item.id.toString(), el);
                  }}
                  initial="collapsed"
                  animate={
                    openItem === item.id.toString() ? "open" : "collapsed"
                  }
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <div className="flex justify-end ml-7 mt-4 md:ml-16">
                    <div
                      className={cn(
                        "relative max-w-md rounded-2xl px-4 py-2 text-white text-lg !bg-blue-400 dark:!bg-blue-400",
                        answerClassName,
                      )}
                    >
                      {item.answer}
                    </div>
                  </div>
                </motion.div>
              </Accordion.Content>
            </div>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}
