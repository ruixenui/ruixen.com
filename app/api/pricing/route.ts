import { NextResponse } from "next/server";

// Revalidate the Pro price once per hour. Keeps ruixen.com → pro.ruixen.com
// price consistency without coupling OSS deploys to Pro pricing changes.
export const revalidate = 3600;

const FALLBACK = {
  amountCents: 5900,
  display: "$59",
  currency: "USD",
};

export async function GET() {
  try {
    const res = await fetch("https://pro.ruixen.com/api/v1/membership/plans", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    const data = await res.json();
    const plan = data.plans?.[0];
    return NextResponse.json({
      amountCents: plan?.price_usd_cents ?? FALLBACK.amountCents,
      display: plan?.price_display ?? FALLBACK.display,
      currency: data.currency ?? FALLBACK.currency,
    });
  } catch {
    // Never fail the OSS site if Pro is down — serve the last-known truth.
    return NextResponse.json(FALLBACK);
  }
}
