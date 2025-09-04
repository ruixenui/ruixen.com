"use client";

import { useEffect, useState } from "react";
import { TicketPercent, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const saleEndDate = new Date(
  Date.now() + 9 * 60 * 60 * 1000 + 45 * 60 * 1000 + 24 * 1000,
);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export default function FlashSaleBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const diff = saleEndDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        isExpired: false,
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible || timeLeft.isExpired) return null;

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4 p-2 border rounded-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      {/* Left: Sale Info */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
        <TicketPercent className="text-black/70 dark:text-white/70" size={24} />
        <div className="flex flex-col gap-1">
          <p className="text-md font-medium text-black dark:text-white">
            🔥 Flash Sale: Black Friday Special!
          </p>
          <p className="text-xs text-black/60 dark:text-white/60">
            Get up to 70% off on all products. Limited stock available. Don’t
            miss this exclusive deal!
          </p>
        </div>
      </div>

      {/* Right: Button + Close */}
      <div className="flex items-center gap-2">
        {/* Center: Timer */}
        <div className="flex items-center gap-2 font-mono text-center">
          {timeLeft.days > 0 && (
            <div className="flex flex-col items-center justify-center px-3 py-2 rounded">
              <span className="text-md font-bold">
                {formatNumber(timeLeft.days)}
              </span>
              <span className="text-xs text-black/50 dark:text-white/50">
                Days
              </span>
            </div>
          )}
          <div className="flex flex-col items-center justify-center px-3 py-2 rounded">
            <span className="text-md font-bold">
              {formatNumber(timeLeft.hours)}
            </span>
            <span className="text-xs text-black/50 dark:text-white/50">
              Hours
            </span>
          </div>
          <div className="flex flex-col items-center justify-center px-3 py-2 rounded">
            <span className="text-md font-bold">
              {formatNumber(timeLeft.minutes)}
            </span>
            <span className="text-xs text-black/50 dark:text-white/50">
              Minutes
            </span>
          </div>
          <div className="flex flex-col items-center justify-center px-3 py-2 rounded">
            <span className="text-md font-bold">
              {formatNumber(timeLeft.seconds)}
            </span>
            <span className="text-xs text-black/50 dark:text-white/50">
              Seconds
            </span>
          </div>
        </div>
        <Button
          size="sm"
          className="whitespace-nowrap bg-black text-white dark:bg-white dark:text-black hover:opacity-90"
        >
          Shop Now
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          aria-label="Close banner"
          className="p-1 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
        >
          <XIcon size={16} />
        </Button>
      </div>
    </div>
  );
}
