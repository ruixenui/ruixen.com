"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X, Clock, Flame, Zap } from "lucide-react";

type CountdownVariant = "default" | "urgent" | "celebration";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface BannerCountdownProps {
  title: string;
  endDate: Date;
  ctaLabel?: string;
  ctaHref?: string;
  variant?: CountdownVariant;
  showDays?: boolean;
  dismissible?: boolean;
  onExpire?: () => void;
  onCtaClick?: () => void;
  onDismiss?: () => void;
  className?: string;
}

const variantStyles = {
  default: "bg-primary text-primary-foreground",
  urgent: "bg-gradient-to-r from-red-600 to-rose-600 text-white",
  celebration:
    "bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white",
};

const digitStyles = {
  default: "bg-primary-foreground/20",
  urgent: "bg-white/20",
  celebration: "bg-white/20",
};

function calculateTimeLeft(endDate: Date): TimeLeft {
  const difference = endDate.getTime() - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function TimeDigit({
  value,
  label,
  variant,
}: {
  value: number;
  label: string;
  variant: CountdownVariant;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span
        className={cn(
          "flex size-10 items-center justify-center rounded-md font-mono text-lg font-bold tabular-nums sm:size-12 sm:text-xl",
          digitStyles[variant],
        )}
      >
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-[10px] uppercase tracking-wide opacity-80">
        {label}
      </span>
    </div>
  );
}

export default function BannerCountdown({
  title,
  endDate,
  ctaLabel = "Shop now",
  ctaHref = "#",
  variant = "default",
  showDays = true,
  dismissible = true,
  onExpire,
  onCtaClick,
  onDismiss,
  className,
}: BannerCountdownProps) {
  const [isVisible, setIsVisible] = React.useState(true);
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft>(() =>
    calculateTimeLeft(endDate),
  );
  const [isExpired, setIsExpired] = React.useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(endDate);
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        setIsExpired(true);
        onExpire?.();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate, onExpire]);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible || isExpired) return null;

  return (
    <div
      className={cn(
        "relative overflow-hidden px-4 py-3",
        variantStyles[variant],
        className,
      )}
    >
      {/* Animated background */}
      {variant === "urgent" && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      )}

      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
        <div className="flex items-center gap-2">
          {variant === "urgent" ? (
            <Flame className="size-5 animate-pulse" />
          ) : (
            <Clock className="size-5" />
          )}
          <span className="font-bold">{title}</span>
        </div>

        <div className="flex items-center gap-2">
          {showDays && timeLeft.days > 0 && (
            <>
              <TimeDigit value={timeLeft.days} label="days" variant={variant} />
              <span className="text-xl font-bold opacity-50">:</span>
            </>
          )}
          <TimeDigit value={timeLeft.hours} label="hrs" variant={variant} />
          <span className="text-xl font-bold opacity-50">:</span>
          <TimeDigit value={timeLeft.minutes} label="min" variant={variant} />
          <span className="text-xl font-bold opacity-50">:</span>
          <TimeDigit value={timeLeft.seconds} label="sec" variant={variant} />
        </div>

        <Button
          size="sm"
          variant="secondary"
          className="bg-white/20 text-inherit hover:bg-white/30"
          onClick={onCtaClick}
          asChild={!!ctaHref}
        >
          {ctaHref ? <a href={ctaHref}>{ctaLabel}</a> : <span>{ctaLabel}</span>}
        </Button>
      </div>

      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 transition-colors hover:bg-white/20"
          aria-label="Dismiss"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}

export { BannerCountdown, type BannerCountdownProps };
