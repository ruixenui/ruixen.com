"use client";

import { useState } from "react";
import { ChevronDown, Palette, Code, Rocket } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const personas = [
  {
    title: "Designers",
    description: "Create beautiful UIs using Ruixen’s consistent and flexible components.",
    image: "/images/designer.png",
    bgColor: "bg-gray-100",
    extras: [
      { icon: <Palette className="w-7 h-7 p-1  border rounded-full text-gray-600 dark:text-white" />, label: "Figma-ready UI Kits" },
      { icon: <Code className="w-7 h-7 p-1  border rounded-full text-gray-600 dark:text-white" />, label: "Design Tokens Support" },
    ],
  },
  {
    title: "Developers",
    description: "Build fast with Ruixen’s React + Tailwind UI library and CLI tools.",
    image: "/images/developer.png",
    bgColor: "bg-gray-100",
    extras: [
      { icon: <Code className="w-7 h-7 p-1  border rounded-full text-gray-600 dark:text-white" />, label: "Customizable Components" },
      { icon: <Rocket className="w-7 h-7 p-1  border rounded-full text-gray-600 dark:text-white" />, label: "Developer CLI & Scaffolding" },
    ],
  },
  {
    title: "Founders",
    description: "Ship MVPs quickly using Ruixen’s ready-to-use templates and layouts.",
    image: "/images/founder.png",
    bgColor: "bg-gray-100",
    extras: [
      { icon: <Rocket className="w-7 h-7 p-1  border rounded-full text-gray-600 dark:text-white" />, label: "MVP-ready Templates" },
      { icon: <Palette className="w-7 h-7 p-1  border rounded-full text-gray-600 dark:text-white" />, label: "Prebuilt Landing Pages" },
    ],
  },
];


export default function WhosOnRuixen() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="py-12">
      <div className="container mx-auto p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
          {personas.map((persona, index) => (
            <div
              key={index}
              className="flex flex-col items-start rounded-xl"
            >
              <div className="flex items-start gap-8">
                <div className={`w-12 h-12 flex-shrink-0 rounded-full -ml-2 ${persona.bgColor} flex items-center justify-center`}>
                  <Image
                    src="/ruixen_dark.png"
                    alt="Ruixen Logo"
                    width={40}
                    height={40}
                    className="rounded-full h-8 w-8 block dark:hidden"
                  />
                  <Image
                    src="/ruixen_light.png"
                    alt="Ruixen Logo"
                    width={40}
                    height={40}
                    className="rounded-full h-8 w-8 hidden dark:block"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{persona.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">{persona.description}</p>
                </div>
              </div>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-500 ease-in-out w-full",
                  showMore ? "max-h-96 mt-4" : "max-h-0"
                )}
              >
                <ul className="space-y-3 pt-2 ml-3">
                  {persona.extras.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-800 dark:text-white">
                      <span className="text-gray-600 dark:text-gray-300">{item.icon}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="mb-8">
            <Button
              variant="outline"
              className="flex items-center gap-2 border-none rounded-xl hover:bg-white dark:hover:bg-black"
              onClick={() => setShowMore(!showMore)}
            >
              <ChevronDown
                size={16}
                className={cn("transition-transform duration-300", {
                  "rotate-180": showMore,
                })}
              />
              {showMore ? "See less" : "See more"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
