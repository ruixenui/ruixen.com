"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const notifications = [
  {
    title: "Welcome to the app!",
    message: "Let's get started by completing your profile.",
    time: "Just now",
  },
  {
    title: "Your plan is active",
    message: "You're now on the Pro plan.",
    time: "5 minutes ago",
  },
  {
    title: "Try Ruixen!",
    message: "Explore powerful UI tools for modern apps.",
    time: "Today",
    cta: {
      text: "@ruixen",
      href: "https://ruixen.com/?utm_source=21stdev&utm_medium=popover&utm_campaign=ruixen",
    },
  },
  {
    title: "Invite your team",
    message: "You can add up to 10 team members for free.",
    time: "1 day ago",
  },
];

export const codeStringPopover_02 = `
"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";

const notifications = [
  {
    title: "Welcome to the app!",
    message: "Let's get started by completing your profile.",
    time: "Just now",
  },
  {
    title: "Your plan is active",
    message: "You're now on the Pro plan.",
    time: "5 minutes ago",
  },
  {
    title: "Try Ruixen!",
    message: "Explore powerful UI tools for modern apps.",
    time: "Today",
    cta: {
      text: "@ruixen",
      href: "https://ruixen.com/?utm_source=21stdev&utm_medium=popover&utm_campaign=ruixen",
    },
  },
  {
    title: "Invite your team",
    message: "You can add up to 10 team members for free.",
    time: "1 day ago",
  },
];

export default function Popover_02() {
  const [step, setStep] = useState(0);
  const maxSteps = notifications.length;

  const next = () => setStep((prev) => Math.min(prev + 1, maxSteps - 1));
  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  const current = notifications[step];

  return (
    <div className="flex justify-center h-screen items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Bell size={16} className="mr-2" />
            Notifications
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="w-[350px] border border-gray-200 dark:border-gray-800 p-0"
        >
          <ScrollArea className="max-h-80 p-4">
            <div className="space-y-3">
              <div>
                <p className="font-medium text-sm text-gray-800 dark:text-gray-100">
                  {current.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {current.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{current.time}</p>
                {current.cta && (
                  <Link
                    href={current.cta.href}
                    target="_blank"
                    className="text-blue-600 text-sm hover:underline mt-2 inline-block"
                  >
                    {current.cta.text}
                  </Link>
                )}
              </div>
            </div>
          </ScrollArea>

          <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 px-4 py-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={back}
              disabled={step === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <span className="text-xs text-muted-foreground">
              {step + 1} / {maxSteps}
            </span>
            <Button
              size="sm"
              variant="ghost"
              onClick={next}
              disabled={step === maxSteps - 1}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
`

export default function Popover_02() {
  const [step, setStep] = useState(0);
  const maxSteps = notifications.length;

  const next = () => setStep((prev) => Math.min(prev + 1, maxSteps - 1));
  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  const current = notifications[step];

  return (
    <div className="flex justify-center h-screen items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Bell size={16} className="mr-2" />
            Notifications
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="w-[350px] border border-gray-200 dark:border-gray-800 p-0"
        >
          <ScrollArea className="max-h-80 p-4">
            <div className="space-y-3">
              <div>
                <p className="font-medium text-sm text-gray-800 dark:text-gray-100">
                  {current.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {current.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{current.time}</p>
                {current.cta && (
                  <Link
                    href={current.cta.href}
                    target="_blank"
                    className="text-blue-600 text-sm hover:underline mt-2 inline-block"
                  >
                    {current.cta.text}
                  </Link>
                )}
              </div>
            </div>
          </ScrollArea>

          <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 px-4 py-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={back}
              disabled={step === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <span className="text-xs text-muted-foreground">
              {step + 1} / {maxSteps}
            </span>
            <Button
              size="sm"
              variant="ghost"
              onClick={next}
              disabled={step === maxSteps - 1}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
