# pro.ruixen.com — paste-in analytics snippet pack

> The pro.ruixen.com codebase isn't in this repo, so the changes below
> have to be applied there manually. Every snippet is **drop-in** — same
> `lib/events.ts` taxonomy, same env vars, same project key.
>
> Five files, ~30 minutes of work. After this the OSS → Pro funnel is
> complete and revenue is attributable.

---

## 1. `next.config.mjs` — reverse proxy

Add the same rewrites we use on ruixen.com:

```js
const nextConfig = {
  // ... existing config

  skipTrailingSlashRedirect: true,   // required for the proxy

  async rewrites() {
    return [
      // ... existing rewrites
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
};
```

Update CSP (if you have one) to allow `script-src` from
`https://us-assets.i.posthog.com` — the JS bundle is hosted there even
when the ingest is proxied.

---

## 2. `components/posthog-provider.tsx` — same flags as OSS

Match the OSS init verbatim — same project key, same flags. The
`cross_subdomain_cookie: true` is what unlocks identity sharing.

```ts
posthog.init(process.env.NEXT_PUBLIC_POSTHOG_API_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "/ingest",
  ui_host: "https://us.posthog.com",
  capture_pageview: false,            // capture manually for SPA-correct urls
  capture_pageleave: true,
  capture_performance: { web_vitals: true },
  person_profiles: "identified_only",
  persistence: "localStorage+cookie",
  cross_subdomain_cookie: true,
  disable_session_recording: true,
  advanced_disable_decide: true,
});
```

---

## 3. Auth callback — `posthog.identify`

Wherever the user lands after login (Clerk session callback / NextAuth
`/api/auth/callback` / Supabase auth state change), drop in:

```ts
"use client";
import posthog from "posthog-js";

// Run once on first authenticated render
useEffect(() => {
  if (!user) return;
  posthog.identify(user.id, {
    email: user.email,
    plan: user.plan,            // "free" | "pro" | "team"
    signup_at: user.createdAt,
  });
  // Optional: group analytics if Pro has teams/workspaces
  if (user.orgId) posthog.group("organization", user.orgId);
}, [user?.id]);
```

This is **the single most important call on pro.ruixen.com.** It's the
moment the anonymous-but-cookie-linked visitor becomes a Person profile
and their entire ruixen.com pre-history attaches.

---

## 4. Stripe checkout — `pro_checkout_started` (client, just before redirect)

Wherever the "Buy Pro" / "Subscribe" button initiates Stripe:

```ts
import posthog from "posthog-js";

async function startCheckout(plan: PlanId) {
  // Fire BEFORE the redirect — sendBeacon survives the unload.
  posthog.capture("pro_checkout_started", {
    plan,
    source_path: window.location.pathname,
  });

  const distinctId = posthog.get_distinct_id();

  const res = await fetch("/api/checkout", {
    method: "POST",
    body: JSON.stringify({ plan, posthog_distinct_id: distinctId }),
  });
  const { url } = await res.json();
  window.location.href = url;
}
```

And on the server route that creates the Stripe session — **thread the
distinct id into Stripe's `metadata`** so the webhook can route the
revenue event onto the same Person:

```ts
// app/api/checkout/route.ts
const session = await stripe.checkout.sessions.create({
  mode: "subscription",
  line_items: [{ price: priceId, quantity: 1 }],
  success_url: `${origin}/welcome?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${origin}/pricing`,
  metadata: {
    posthog_distinct_id: body.posthog_distinct_id,
    plan,
  },
});
```

---

## 5. Stripe webhook — `pro_purchase_completed` (server, source of truth)

The single non-bypassable revenue capture. Ad blockers can't touch
server-to-server events.

```ts
// app/api/stripe/webhook/route.ts
import { PostHog } from "posthog-node";

const ph = new PostHog(process.env.POSTHOG_KEY!, {
  host: "https://us.i.posthog.com",   // direct — no proxy needed server-side
  flushAt: 1,                          // ship every event immediately
});

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  const raw = await req.text();
  const event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET!);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    ph.capture({
      distinctId: session.metadata?.posthog_distinct_id ?? session.client_reference_id ?? session.customer_email!,
      event: "pro_purchase_completed",
      properties: {
        amount_cents: session.amount_total,
        currency: session.currency,
        plan: session.metadata?.plan,
        stripe_session_id: session.id,
        // Set person properties so PostHog dashboards see "is_paid" on the profile
        $set: {
          is_paid: true,
          plan: session.metadata?.plan,
          lifetime_value: session.amount_total,
        },
      },
    });

    await ph.shutdown();   // wait for the event to ship before returning
  }

  return new Response(null, { status: 200 });
}
```

The two critical bits:
1. `distinctId` falls back to `session.client_reference_id` then
   `customer_email` if `posthog_distinct_id` is missing — so a webhook
   from a customer who somehow lost the cookie still lands somewhere.
2. `flushAt: 1` + `await ph.shutdown()` — Vercel functions exit
   immediately on response; without this, the event gets queued and
   dropped.

---

## 6. (Bonus) Mirror `lib/events.ts` in pro.ruixen.com

The same enum file should exist on both sites so events stay typed and
discoverable. Copy `ruixen.com/lib/events.ts` over to
`pro.ruixen.com/lib/events.ts` verbatim. The `trackEvent` function in
both repos then accepts the same union of names.

---

## Verification (5 min after deploy)

1. Buy a Pro plan with a real (test-mode) card.
2. Open PostHog → Persons → find yourself by email.
3. The single profile timeline should contain, in order:
   - `$pageview` events on `ruixen.com/...`
   - `oss_pro_cta_clicked` (from OSS)
   - `$pageview` on `pro.ruixen.com/pricing`
   - `pro_checkout_started`
   - `$identify` (from auth callback after returning from Stripe)
   - `pro_purchase_completed` (with `$lib: posthog-node`)

If the chain is unbroken on one profile, all five files are correctly
wired. If steps 3+ land on a different profile, the cookie isn't
sharing — check that pro.ruixen.com is truly on `*.ruixen.com` (not a
sibling apex) and that `cross_subdomain_cookie: true` made it into the
init.

---

## Environment variables (both sites — they must match)

```
NEXT_PUBLIC_POSTHOG_API_KEY=phc_…       # SAME key on both sites
NEXT_PUBLIC_POSTHOG_HOST=                # leave EMPTY in prod — uses /ingest proxy
POSTHOG_KEY=phx_…                        # server-side personal key for webhook captures (only pro.ruixen.com)
STRIPE_WEBHOOK_SECRET=whsec_…
```

The OSS site doesn't need `POSTHOG_KEY` — no server-side captures from
there. Only pro.ruixen.com's Stripe webhook needs the personal key.

> **Rotate `phx_…` immediately** if it was ever pasted in chat or email.
> Personal keys carry full project read/write.
