"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

export default function FeatureHighlights({ features }: any) {
  return (
    <div className="flex flex-col w-full max-w-xl mx-auto border rounded-xl shadow-sm bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-700 p-4">
      <Accordion type="single" collapsible className="w-full">
        {features.map((feature: any) => (
          <AccordionItem
            key={feature.id}
            value={feature.id}
            className="border-b border-gray-200 dark:border-neutral-700"
          >
            <AccordionTrigger className="flex items-center gap-3 py-3 text-left">
              <Image
                src={feature.image}
                alt={feature.title}
                width={28}
                height={28}
                className="rounded-md"
              />
              <span className="flex-1 font-medium">{feature.title}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({feature.count})
              </span>
            </AccordionTrigger>

            <AccordionContent className="px-2 pb-4 pt-2 space-y-3">
              {/* Big Image when expanded */}
              <div className="w-full flex justify-center">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={500}
                  height={300}
                  className="rounded-lg shadow-md object-cover"
                />
              </div>
              {/* Text below the image */}
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                {feature.description}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
