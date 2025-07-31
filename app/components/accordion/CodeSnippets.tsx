export const codeStringAccordion_01 = `
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  LayoutList,
  Settings,
  Accessibility,
} from "lucide-react";
import { ElementType } from "react";

type AccordionItemType = {
  icon: ElementType;
  value: string;
  question: string;
  answer: string;
};


const accordionItems: AccordionItemType[] = [
  {
    icon: HelpCircle,
    value: "item-1",
    question: "Is this an accordion component?",
    answer:
      "Yes. This is an accordion component built with Radix UI and styled with Tailwind CSS.",
  },
  {
    icon: LayoutList,
    value: "item-2",
    question: "How do I use this component?",
    answer:
      "You can use this component to organize content in collapsible sections. It's perfect for FAQs, settings panels, or any content that benefits from progressive disclosure.",
  },
  {
    icon: Settings,
    value: "item-3",
    question: "Can I customize the styling?",
    answer:
      "Absolutely! This component uses Tailwind CSS for styling, so you can easily customize the appearance by modifying the class names. The component is also built with accessibility in mind.",
  },
  {
    icon: Accessibility,
    value: "item-4",
    question: "Is it accessible?",
    answer:
      "Yes! This accordion component is built on top of Radix UI's Accordion primitive, which provides full keyboard navigation and proper ARIA attributes for screen readers.",
  },
];

export default function Accordion_01() {
  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-6">
      <Accordion type="single" collapsible className="space-y-3">
        {accordionItems.map(({ icon: Icon, value, question, answer }) => (
          <AccordionItem
            key={value}
            value={value}
            className="group border border-black/10 dark:border-white/10 rounded-md overflow-hidden transition-all duration-300"
          >
            <AccordionTrigger
              className="flex items-center justify-between w-full px-4 py-3 bg-transparent text-left group-data-[state=open]:bg-black/[0.04] dark:group-data-[state=open]:bg-white/[0.05] transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <Icon className="w-5 h-5 transition-colors duration-300 text-black/60 dark:text-white/60 group-data-[state=open]:text-black dark:group-data-[state=open]:text-white" />
                <span className="text-base font-medium text-black dark:text-white">
                  {question}
                </span>
              </div>
              {/* No chevron rotation */}
              <span className="text-xs text-black/40 dark:text-white/40 group-data-[state=open]:text-black dark:group-data-[state=open]:text-white">
                {value.toUpperCase()}
              </span>
            </AccordionTrigger>

            <AccordionContent className="relative px-4 py-3 text-sm text-black dark:text-white border-t border-black/10 dark:border-white/10 before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-black dark:before:bg-white before:opacity-0 group-data-[state=open]:before:opacity-100 transition-all duration-300">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}`;

export const codeStringAccordion_02 = `
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Accordion_02() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Left Column */}
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-4">Have questions?</h2>
          <p className="text-muted-foreground text-lg">
            We're here to help you understand how everything works. If you still have
            doubts, feel free to{" "}
            <a href="/contact" className="underline">
              reach out to our team
            </a>
            .
          </p>
        </div>

        {/* Right Column */}
        <div className="md:w-1/2 space-y-10">
          {/* General Section */}
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              General
            </h3>
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="gen-1">
                <AccordionTrigger>
                  What is the purpose of this platform?
                </AccordionTrigger>
                <AccordionContent>
                  Our platform is designed to simplify your workflow and save you hours every week using automation and AI-powered tools.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="gen-2">
                <AccordionTrigger>
                  Is this service available worldwide?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we support users across the globe. Some regional features may vary.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Billing Section */}
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              Billing
            </h3>
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="bill-1">
                <AccordionTrigger>
                  Do you offer refunds?
                </AccordionTrigger>
                <AccordionContent>
                  <AccordionContent>
  Yes, we offer a 7-day refund policy. If you&apos;re unsatisfied, just contact our support within that time frame.
</AccordionContent>y. If you&apos;re unsatisfied, just contact our support within that time frame.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="bill-2">
                <AccordionTrigger>
                  Can I change my plan later?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely! You can upgrade or downgrade your plan anytime from your account dashboard.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Technical Section */}
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              Technical
            </h3>
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="tech-1">
                <AccordionTrigger>
                  Does this integrate with other tools?
                </AccordionTrigger>
                <AccordionContent>
                  Yes! We support integrations with Slack, Notion, Zapier, and many more.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="tech-2">
                <AccordionTrigger>
                  Is there an API available?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, our public API is available for all Pro users. Documentation can be found in the developer portal.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
`;

export const codeStringAccordion_03 = `
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon?: string;
  iconPosition?: "left" | "right";
}

interface Accordion_03Props {
  data: FAQItem[];
  className?: string;
  questionClassName?: string;
  answerClassName?: string;
}

export default function Accordion_03({
  data = [
    {
      id: 1,
      question: "What is Ruixen UI?",
      answer:
        "Ruixen UI is a sleek and modern UI component library built with React and Tailwind CSS, designed to help developers create beautiful, responsive, and accessible web applications faster."
    },
    {
      id: 2,
      question: "How do I install Ruixen UI?",
      answer:
        "You can install Ruixen UI via your terminal using npm or yarn: \`npm install ruixenui\` or \`yarn add ruixenui\`."
    },
    {
      id: 3,
      question: "Is Ruixen UI open-source?",
      answer:
        "Yes, Ruixen UI is completely open-source and available under the MIT license. You’re free to use it in both personal and commercial projects."
    },
    {
      id: 4,
      question: "Where can I find the documentation?",
      answer:
        "You can find full documentation, usage examples, and component APIs at our official site: docs.ruixenui.com."
    },
    {
      id: 5,
      question: "Can I contribute to Ruixen UI?",
      answer:
        "Definitely! Ruixen UI thrives on community support. Visit our GitHub repository to explore contribution guidelines, report issues, or submit pull requests."
    }
  ],
  className,
  questionClassName,
  answerClassName,
}: Accordion_03Props) {
  const [openItem, setOpenItem] = React.useState<string | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const accordionRefs = React.useRef<Map<string, HTMLDivElement>>(new Map());
  const contentRefs = React.useRef<Map<string, HTMLDivElement>>(new Map());
  
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);
  
  useGSAP(() => {
    if (!containerRef.current || data.length === 0) return;
    
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: \`+=\${data.length * 200}\`,
        scrub: 0.3,
        pin: true,
        markers: false,
      }
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
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [data]);
  
  const handleAccordionChange = (value: string) => {
    setOpenItem(value === openItem ? null : value);
  };

  return (
    <div ref={containerRef} className={cn("max-w-4xl mx-auto text-center py-16 h-[300vh]", className)}>
      <h2 className="text-3xl font-bold mb-2">
        <a 
          href="https://github.com/ruixenui/ruixen-free-components" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition-colors"
        >
          Frequently Asked Questions
        </a>
      </h2>
      <p className="text-gray-600 dark:text-gray-200 mb-6">
        Find answers to common questions about our graphic assets, components, and licensing.
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
                      "text-gray-600 dark:text-gray-200",
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
                  ref={(el) => {
                    if (el) contentRefs.current.set(item.id.toString(), el);
                  }}
                  initial="collapsed"
                  animate={openItem === item.id.toString() ? "open" : "collapsed"}
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
                        answerClassName
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
`;