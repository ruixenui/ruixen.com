"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export const codeStringDialog_02 = `"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function Dialog_02() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Let's Get Started",
      description: "Kick off your experience with a brief introduction to our toolkit.",
    },
    {
      title: "Designed For Flexibility",
      description: "Drag, drop, and build with fully customizable components.",
    },
    {
      title: "Scalable Codebase",
      description: "Every block is built to be reusable and scalable with your projects.",
    },
    {
      title: "Join Our Community",
      description: "Get help, share ideas, and grow with developers worldwide.",
    },
  ];

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  return (
    <Dialog onOpenChange={(open) => open && setStep(0)}>
      <DialogTrigger asChild>
        <Button variant="outline">Start Tour</Button>
      </DialogTrigger>

      <DialogContent
        className={cn(
          "max-w-3xl p-0 overflow-hidden rounded-xl border shadow-2xl",
          "bg-white text-black",
          "dark:bg-black dark:text-white dark:border-neutral-800",
          "data-[state=open]:animate-none data-[state=closed]:animate-none"
        )}
      >
        <div className="flex flex-col md:flex-row w-full h-full">
          {/* Sidebar */}
          <div className="w-full md:w-1/3 p-6 border-r border-gray-200 dark:border-neutral-800">
            <div className="flex flex-col gap-3">
              <Image
                src="https://raw.githubusercontent.com/ruixenui/RUIXEN_ASSESTS/refs/heads/main/component_assests/ruixen_ui_logo_dark.png"
                alt="Logo"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full border-4 border-gray-200 dark:border-neutral-800"
                unoptimized
              />
              <h2 className="text-lg font-medium">Origin UI Onboarding</h2>
              <p className="text-sm opacity-80">
                Explore our features step-by-step to get the best out of your experience.
              </p>
              <div className="flex flex-col gap-3 mt-6">
                {steps.map((s, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-2 text-sm transition",
                      index === step
                        ? "font-semibold"
                        : "opacity-60 hover:opacity-100"
                    )}
                  >
                    {index < step ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-black dark:bg-white/40" />
                    )}
                    <span className="font-normal">{s.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3 p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <DialogHeader>
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={steps[step].title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="text-2xl font-medium"
                  >
                    {steps[step].title}
                  </motion.h2>
                </AnimatePresence>

                <div className="min-h-[60px]">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={steps[step].description}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="text-gray-600 dark:text-gray-400 text-base opacity-90"
                    >
                      {steps[step].description}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </DialogHeader>

              {/* Image */}
              <div className="w-full h-60 bg-gray-100 dark:bg-neutral-900 rounded-lg flex items-center justify-center">
                <img
                  src="https://raw.githubusercontent.com/ruixenui/RUIXEN_ASSESTS/refs/heads/main/component_assests/tour.png"
                  alt="Step Visual"
                  className="h-full object-contain rounded-lg border-4 border-gray-200 dark:border-neutral-800"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-between items-center">
              <DialogClose asChild>
                <Button variant="outline">Skip</Button>
              </DialogClose>

              {step < steps.length - 1 ? (
                <Button variant="outline" onClick={next}>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <DialogClose asChild>
                  <Button variant="outline">Finish</Button>
                </DialogClose>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
`;

export default function Dialog_02() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Let's Get Started",
      description: "Kick off your experience with a brief introduction to our toolkit.",
    },
    {
      title: "Designed For Flexibility",
      description: "Drag, drop, and build with fully customizable components.",
    },
    {
      title: "Scalable Codebase",
      description: "Every block is built to be reusable and scalable with your projects.",
    },
    {
      title: "Join Our Community",
      description: "Get help, share ideas, and grow with developers worldwide.",
    },
  ];

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  return (
    <Dialog onOpenChange={(open) => open && setStep(0)}>
      <DialogTrigger asChild>
        <Button variant="outline">Start Tour</Button>
      </DialogTrigger>

      <DialogContent
        className={cn(
          "max-w-3xl p-0 overflow-hidden rounded-xl border shadow-2xl",
          "bg-white text-black",
          "dark:bg-black dark:text-white dark:border-neutral-800",
          "data-[state=open]:animate-none data-[state=closed]:animate-none"
        )}
      >
        <div className="flex flex-col md:flex-row w-full h-full">
          {/* Sidebar */}
          <div className="w-full md:w-1/3 p-6 border-r border-gray-200 dark:border-neutral-800">
            <div className="flex flex-col gap-3">
              <Image
                src="https://raw.githubusercontent.com/ruixenui/RUIXEN_ASSESTS/refs/heads/main/component_assests/ruixen_ui_logo_dark.png"
                alt="Logo"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full border-4 border-gray-200 dark:border-neutral-800"
                unoptimized
              />
              <h2 className="text-lg font-medium">Origin UI Onboarding</h2>
              <p className="text-sm opacity-80">
                Explore our features step-by-step to get the best out of your experience.
              </p>
              <div className="flex flex-col gap-3 mt-6">
                {steps.map((s, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-2 text-sm transition",
                      index === step
                        ? "font-semibold"
                        : "opacity-60 hover:opacity-100"
                    )}
                  >
                    {index < step ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-black dark:bg-white/40" />
                    )}
                    <span className="font-normal">{s.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3 p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <DialogHeader>
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={steps[step].title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="text-2xl font-medium"
                  >
                    {steps[step].title}
                  </motion.h2>
                </AnimatePresence>

                <div className="min-h-[60px]">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={steps[step].description}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="text-gray-600 dark:text-gray-400 text-base opacity-90"
                    >
                      {steps[step].description}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </DialogHeader>

              {/* Image */}
              <div className="w-full h-60 bg-gray-100 dark:bg-neutral-900 rounded-lg flex items-center justify-center">
                <Image
                  src="https://raw.githubusercontent.com/ruixenui/RUIXEN_ASSESTS/refs/heads/main/component_assests/tour.png"
                  alt="Step Visual"
                  width={500} // Adjust width based on design
                  height={500} // Adjust height based on design
                  className="h-full object-contain rounded-lg border-4 border-gray-200 dark:border-neutral-800"
                />

              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-between items-center">
              <DialogClose asChild>
                <Button variant="outline">Skip</Button>
              </DialogClose>

              {step < steps.length - 1 ? (
                <Button variant="outline" onClick={next}>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <DialogClose asChild>
                  <Button variant="outline">Finish</Button>
                </DialogClose>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
