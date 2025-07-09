"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const codeStringTestimonials_02 = `"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const testimonials = [
  {
    text: "Ruixen UI helped us build a stunning website in days, not weeks. The components are beautifully designed and easy to integrate.",
    image: "https://github.com/shadcn.png",
    name: "Briana Patton",
    role: "Operations Manager",
  },
  {
    text: "The developer experience with Ruixen UI is top-notch. Clean code, responsive components, and clear documentation made onboarding effortless.",
    image: "https://github.com/shadcn.png",
    name: "Bilal Ahmed",
    role: "IT Manager",
  },
  {
    text: "Thanks to Ruixen, our product pages look premium and convert better. The reusable UI blocks saved us hundreds of hours.",
    image: "https://github.com/shadcn.png",
    name: "Saman Malik",
    role: "Customer Support Lead",
  },
  {
    text: "Ruixen UI gave our startup a professional front-end without hiring a designer. The dark mode support and accessibility are just perfect.",
    image: "https://github.com/shadcn.png",
    name: "Omar Raza",
    role: "CEO",
  },
  {
    text: "We built and shipped faster using Ruixen UI components. Every component is polished and responsive by default.",
    image: "https://github.com/shadcn.png",
    name: "Aliza Khan",
    role: "Product Designer",
  },
  {
    text: "Ruixen UI's consistent design system brought harmony to our frontend. Developers and designers now work better together.",
    image: "https://github.com/shadcn.png",
    name: "Farhan Siddiqui",
    role: "Frontend Engineer",
  },
];

const DURATION = 3000;

export default function Testimonial_02() {
  const [index, setIndex] = useState(0);
  const total = Math.ceil(testimonials.length / 2);
  const [progress, setProgress] = useState(0);
  
  const interval = setInterval(() => {
    setIndex((prev) => {
      const nextIndex = (prev + 1) % total;
      setProgress(((nextIndex + 1) / total) * 100);
      return nextIndex;
    });
  }, DURATION);
  

  const visibleTestimonials = testimonials.slice(index * 2, index * 2 + 2);

  return (
    <section className="relative overflow-hidden py-20 bg-background text-foreground">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-start px-4 gap-10">
        <div className="">
          <h2 className="text-4xl font-bold leading-snug">What our users say</h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 text-base max-w-sm">
            Discover how Ruixen UI helped teams design, develop, and ship faster.
          </p>
        </div>

        <div className="space-y-3">
          {visibleTestimonials.map((t, i) => (
            <Card
              key={i}
              className={\`p-6 sm:p-8 shadow-md rounded-none transform \${
                i % 2 === 0 ? "rotate-1" : "-rotate-1"
              } origin-top-right\`}
            >
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{t.text}</p>
              <div className="flex items-start justify-start mt-6 gap-3">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div className="text-left">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm opacity-60">{t.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="relative flex mt-6 text-xs text-muted-foreground max-w-6xl mx-auto px-4">
        <div className="absolute top-0 right-0 w-full px-4 z-20">
            <Progress value={progress} className="w-[6rem] h-1" />
        </div>
        <div className="absolute top-3 left-0 w-full px-4 z-20">
            {index + 1}/{total}
        </div>
      </div>
    </section>
  );
}
`;


const testimonials = [
  {
    text: "Ruixen UI helped us build a stunning website in days, not weeks. The components are beautifully designed and easy to integrate.",
    image: "https://github.com/shadcn.png",
    name: "Briana Patton",
    role: "Operations Manager",
  },
  {
    text: "The developer experience with Ruixen UI is top-notch. Clean code, responsive components, and clear documentation made onboarding effortless.",
    image: "https://github.com/shadcn.png",
    name: "Bilal Ahmed",
    role: "IT Manager",
  },
  {
    text: "Thanks to Ruixen, our product pages look premium and convert better. The reusable UI blocks saved us hundreds of hours.",
    image: "https://github.com/shadcn.png",
    name: "Saman Malik",
    role: "Customer Support Lead",
  },
  {
    text: "Ruixen UI gave our startup a professional front-end without hiring a designer. The dark mode support and accessibility are just perfect.",
    image: "https://github.com/shadcn.png",
    name: "Omar Raza",
    role: "CEO",
  },
  {
    text: "We built and shipped faster using Ruixen UI components. Every component is polished and responsive by default.",
    image: "https://github.com/shadcn.png",
    name: "Aliza Khan",
    role: "Product Designer",
  },
  {
    text: "Ruixen UI's consistent design system brought harmony to our frontend. Developers and designers now work better together.",
    image: "https://github.com/shadcn.png",
    name: "Farhan Siddiqui",
    role: "Frontend Engineer",
  },
];

const DURATION = 3000;

export default function Testimonial_02() {
  const [index, setIndex] = useState(0);
  const total = Math.ceil(testimonials.length / 2);
  const [progress, setProgress] = useState(0);
  
  const interval = setInterval(() => {
    setIndex((prev) => {
      const nextIndex = (prev + 1) % total;
      setProgress(((nextIndex + 1) / total) * 100);
      return nextIndex;
    });
  }, DURATION);
  

  const visibleTestimonials = testimonials.slice(index * 2, index * 2 + 2);

  return (
    <section className="relative overflow-hidden py-20 bg-background text-foreground">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-start px-4 gap-10">
        <div className="">
          <h2 className="text-4xl font-bold leading-snug">What our users say</h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 text-base max-w-sm">
            Discover how Ruixen UI helped teams design, develop, and ship faster.
          </p>
        </div>

        <div className="space-y-3">
          {visibleTestimonials.map((t, i) => (
            <Card
              key={i}
              className={`p-6 sm:p-8 shadow-md rounded-none transform ${
                i % 2 === 0 ? "rotate-1" : "-rotate-1"
              } origin-top-right`}
            >
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{t.text}</p>
              <div className="flex items-start justify-start mt-6 gap-3">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div className="text-left">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm opacity-60">{t.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="relative flex mt-6 text-xs text-muted-foreground max-w-6xl mx-auto px-4">
        <div className="absolute top-0 right-0 w-full px-4 z-20">
            <Progress value={progress} className="w-[6rem] h-1" />
        </div>
        <div className="absolute top-3 left-0 w-full px-4 z-20">
            {index + 1}/{total}
        </div>
      </div>
    </section>
  );
}
