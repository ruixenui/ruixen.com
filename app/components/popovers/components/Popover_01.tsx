"use client";

import { useState } from "react";
import { Heart, Diamond, Club, Spade, LucideIcon, LinkIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import Link from "next/link";

const tourSteps: {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  link?: string;
}[] = [
  {
    icon: Heart,
    title: "Heart",
    description: "Your new workspace — manage projects, settings, and activity.",
    color: "text-red-500",
  },
  {
    icon: Diamond,
    title: "Diamond",
    description: "Use the toolbar to create, invite, and configure settings.",
    color: "text-blue-500",
  },
  {
    icon: Club,
    title: "Club",
    description: "Access support and documentation from the top right corner.",
    color: "text-green-500",
  },
  {
    icon: Spade,
    title: "Spade",
    description: "Use ⌘K to open the command palette anytime.",
    color: "text-purple-500",
  },
  {
    icon: LinkIcon,
    title: "@ruixen",
    description: "Crafting top-tier UI components with elegance.",
    color: "text-purple-500",
    link: "https://ruixen.com/?utm_source=21stdev&utm_medium=popover&utm_campaign=ruixen",
  },
];
export const codeStringPopover_01 = `"use client";

import { useState } from "react";
import { Heart, Diamond, Club, Spade, LucideIcon, LinkIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import Link from "next/link";

const tourSteps: {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  link?: string;
}[] = [
  {
    icon: Heart,
    title: "Heart",
    description: "Your new workspace — manage projects, settings, and activity.",
    color: "text-red-500",
  },
  {
    icon: Diamond,
    title: "Diamond",
    description: "Use the toolbar to create, invite, and configure settings.",
    color: "text-blue-500",
  },
  {
    icon: Club,
    title: "Club",
    description: "Access support and documentation from the top right corner.",
    color: "text-green-500",
  },
  {
    icon: Spade,
    title: "Spade",
    description: "Use ⌘K to open the command palette anytime.",
    color: "text-purple-500",
  },
  {
    icon: LinkIcon,
    title: "@ruixen",
    description: "Crafting top-tier UI components with elegance.",
    color: "text-purple-500",
    link: "https://ruixen.com/?utm_source=21stdev&utm_medium=popover&utm_campaign=ruixen",
  },
];

export default function Popover_01() {
  const [step, setStep] = useState(0);
  const [isTourActive, setIsTourActive] = useState(false);

  const next = () => {
    if (step < tourSteps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      setIsTourActive(false); // End the tour
    }
  };

  const startTour = () => {
    setStep(0);
    setIsTourActive(true);
  };

  const current = tourSteps[step];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[60vh] px-4">
      <AnimatePresence mode="wait">
        {isTourActive && (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-300 dark:border-white/20 rounded-2xl shadow-lg p-6 w-full max-w-sm text-center space-y-4"
          >
            <div className="flex items-center justify-center">
              <current.icon
                size={40}
                className={clsx("drop-shadow-md", current.color)}
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {current.title}
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {current.description}
            </p>
            {current.link && (
              <Link
                href={current.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline text-blue-600 hover:text-blue-800 transition-colors"
              >
                Visit Ruixen ↗
              </Link>
            )}
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-2">
              <span>
                Step {step + 1} of {tourSteps.length}
              </span>
              <button
                onClick={next}
                className="hover:underline text-blue-600 dark:text-white"
              >
                {step === tourSteps.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={startTour}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute bottom-10 text-black dark:text-white font-medium bg-white dark:bg-black px-6 py-2 border border-gray-200 dark:border-gray-800 rounded-full shadow-xl hover:brightness-110 transition"
      >
        Start Tour 🚀
      </motion.button>
    </div>
  );
}
`;

export default function Popover_01() {
  const [step, setStep] = useState(0);
  const [isTourActive, setIsTourActive] = useState(false);

  const next = () => {
    if (step < tourSteps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      setIsTourActive(false); // End the tour
    }
  };

  const startTour = () => {
    setStep(0);
    setIsTourActive(true);
  };

  const current = tourSteps[step];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[60vh] px-4">
      <AnimatePresence mode="wait">
        {isTourActive && (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-300 dark:border-white/20 rounded-2xl shadow-lg p-6 w-full max-w-sm text-center space-y-4"
          >
            <div className="flex items-center justify-center">
              <current.icon
                size={40}
                className={clsx("drop-shadow-md", current.color)}
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {current.title}
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {current.description}
            </p>
            {current.link && (
              <Link
                href={current.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline text-blue-600 hover:text-blue-800 transition-colors"
              >
                Visit Ruixen ↗
              </Link>
            )}
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-2">
              <span>
                Step {step + 1} of {tourSteps.length}
              </span>
              <button
                onClick={next}
                className="hover:underline text-blue-600 dark:text-white"
              >
                {step === tourSteps.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={startTour}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute bottom-10 text-black dark:text-white font-medium bg-white dark:bg-black px-6 py-2 border border-gray-200 dark:border-gray-800 rounded-full shadow-xl hover:brightness-110 transition"
      >
        Start Tour 🚀
      </motion.button>
    </div>
  );
}
