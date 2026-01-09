"use client";

import BannerPromo from "@/registry/ruixenui/banner-promo";

export default function BannerPromoDemo() {
  return (
    <div className="flex min-h-[400px] w-full flex-col gap-4 p-4">
      <BannerPromo
        variant="default"
        badge="Limited Time"
        title="Get 30% off"
        description="on all annual plans. Use code: SAVE30"
        ctaLabel="Claim offer"
        ctaHref="#"
      />

      <BannerPromo
        variant="festive"
        badge="Holiday Sale"
        title="Up to 50% off!"
        description="Shop our biggest sale of the year."
        ctaLabel="Shop now"
        ctaHref="#"
      />

      <BannerPromo
        variant="gradient"
        badge="New"
        title="Free shipping"
        description="on orders over $50"
        ctaLabel="Start shopping"
        ctaHref="#"
      />

      <BannerPromo
        variant="minimal"
        title="Members get early access"
        description="to new arrivals and exclusive deals."
        ctaLabel="Join free"
        ctaHref="#"
      />
    </div>
  );
}
