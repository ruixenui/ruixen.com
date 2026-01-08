"use client";

import BannerCountdown from "@/registry/ruixenui/banner-countdown";

// Helper to create a date that's X hours from now
const getEndDate = (hoursFromNow: number) => {
  return new Date(Date.now() + hoursFromNow * 60 * 60 * 1000);
};

export default function BannerCountdownDemo() {
  return (
    <div className="flex min-h-[450px] w-full flex-col gap-4 p-4">
      <BannerCountdown
        variant="default"
        title="Flash Sale ends in"
        endDate={getEndDate(2)}
        ctaLabel="Shop now"
        ctaHref="#"
        showDays={false}
      />

      <BannerCountdown
        variant="urgent"
        title="Last chance! Sale ends in"
        endDate={getEndDate(0.5)}
        ctaLabel="Buy now"
        ctaHref="#"
        showDays={false}
      />

      <BannerCountdown
        variant="celebration"
        title="Product launch in"
        endDate={getEndDate(72)}
        ctaLabel="Get notified"
        ctaHref="#"
        showDays={true}
      />
    </div>
  );
}
