"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";


export const codeStringTestimonials_01 = `
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
    text: "We built an entire SaaS dashboard with Ruixen UI. The layout utilities, form controls, and grid system made everything seamless.",
    image: "https://github.com/shadcn.png",
    name: "Zainab Hussain",
    role: "Project Manager",
  },
  {
    text: "Ruixen UI's component architecture is clean and flexible. Even our junior devs were able to ship production-ready features quickly.",
    image: "https://github.com/shadcn.png",
    name: "Aliza Khan",
    role: "Business Analyst",
  },
  {
    text: "Every section we built with Ruixen looked polished out of the box. The hero sections and pricing components made our landing page pop.",
    image: "https://github.com/shadcn.png",
    name: "Farhan Siddiqui",
    role: "Marketing Director",
  },
  {
    text: "From design to deployment, Ruixen UI was the secret weapon in our toolkit. Our team loves working with these modern components.",
    image: "https://github.com/shadcn.png",
    name: "Sana Sheikh",
    role: "Sales Manager",
  },
];

export default function Testimonials_01() {
  const column1 = testimonials.filter((_, i) => i % 2 === 0);
  const column2 = testimonials.filter((_, i) => i % 2 !== 0);

  const renderColumn = (data: typeof testimonials, duration: number) => (
    <motion.div
      animate={{ translateY: "-50%" }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
      className="flex flex-col gap-6 pb-6"
    >
      {[...Array(2)].map((_, idx) => (
        <React.Fragment key={idx}>
          {data.map(({ text, image, name, role }, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-gray-300 dark:border-gray-700 shadow-lg bg-background shadow-primary/10 w-full max-w-sm"
            >
              <div className="text-sm leading-relaxed text-muted-foreground">{text}</div>
              <div className="flex items-center gap-3 mt-5">
                <img
                  width={40}
                  height={40}
                  src={image}
                  alt={name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <div className="font-medium">{name}</div>
                  <div className="text-xs opacity-60">{role}</div>
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </motion.div>
  );

  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="text-center lg:text-left max-w-xl mx-auto">
            <Image
              src="/ruixen_dark.png"
              alt="Illustration"
              width={80}
              height={80}
              className="mx-auto lg:mx-0 mb-6 dark:hidden block"
            />
            <Image
              src="/ruixen_light.png"
              alt="Illustration"
              width={80}
              height={80}
              className="mx-auto lg:mx-0 mb-6 hidden dark:block"
            />
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              What our users say
            </h2>
            <p className="mt-4 text-muted-foreground text-base sm:text-lg">
              See how our platform transforms businesses through real stories.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 max-h-[580px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
            <div className="w-full sm:w-1/2">{renderColumn(column1, 18)}</div>
            <div className="w-full sm:w-1/2">{renderColumn(column2, 20)}</div>
          </div>

        </div>
      </div>
    </section>
  );
};`;

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
    text: "We built an entire SaaS dashboard with Ruixen UI. The layout utilities, form controls, and grid system made everything seamless.",
    image: "https://github.com/shadcn.png",
    name: "Zainab Hussain",
    role: "Project Manager",
  },
  {
    text: "Ruixen UI's component architecture is clean and flexible. Even our junior devs were able to ship production-ready features quickly.",
    image: "https://github.com/shadcn.png",
    name: "Aliza Khan",
    role: "Business Analyst",
  },
  {
    text: "Every section we built with Ruixen looked polished out of the box. The hero sections and pricing components made our landing page pop.",
    image: "https://github.com/shadcn.png",
    name: "Farhan Siddiqui",
    role: "Marketing Director",
  },
  {
    text: "From design to deployment, Ruixen UI was the secret weapon in our toolkit. Our team loves working with these modern components.",
    image: "https://github.com/shadcn.png",
    name: "Sana Sheikh",
    role: "Sales Manager",
  },
];

export default function Testimonials_01() {
  const column1 = testimonials.filter((_, i) => i % 2 === 0);
  const column2 = testimonials.filter((_, i) => i % 2 !== 0);

  const renderColumn = (data: typeof testimonials, duration: number) => (
    <motion.div
      animate={{ translateY: "-50%" }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
      className="flex flex-col gap-6 pb-6"
    >
      {[...Array(2)].map((_, idx) => (
        <React.Fragment key={idx}>
          {data.map(({ text, image, name, role }, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-gray-300 dark:border-gray-700 shadow-lg bg-background shadow-primary/10 w-full max-w-sm"
            >
              <div className="text-sm leading-relaxed text-muted-foreground">{text}</div>
              <div className="flex items-center gap-3 mt-5">
                <Image
                  width={40}
                  height={40}
                  src={image}
                  alt={name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <div className="font-medium">{name}</div>
                  <div className="text-xs opacity-60">{role}</div>
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </motion.div>
  );

  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="text-center lg:text-left max-w-xl mx-auto">
            <Image
              src="/ruixen_dark.png"
              alt="Illustration"
              width={80}
              height={80}
              className="mx-auto lg:mx-0 mb-6 dark:hidden block"
            />
            <Image
              src="/ruixen_light.png"
              alt="Illustration"
              width={80}
              height={80}
              className="mx-auto lg:mx-0 mb-6 hidden dark:block"
            />
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              What our users say
            </h2>
            <p className="mt-4 text-muted-foreground text-base sm:text-lg">
              See how our platform transforms businesses through real stories.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 max-h-[580px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
            <div className="w-full sm:w-1/2">{renderColumn(column1, 18)}</div>
            <div className="w-full sm:w-1/2">{renderColumn(column2, 20)}</div>
          </div>

        </div>
      </div>
    </section>
  );
};
