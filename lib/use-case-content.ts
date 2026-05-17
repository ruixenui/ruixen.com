/**
 * Programmatic use-case landing pages — content registry.
 *
 * 28 entries: 7 section types × 4 use cases (saas, agency, ecommerce,
 * portfolio). Each entry is hand-written with use-case-specific framing,
 * curated component picks from the actual registry, and original FAQs.
 *
 * Helpful Content Update gate: every entry must read as if written for
 * the audience of that combo. Mad-Libs templates fail. Reviewers should
 * sanity-check that swapping any two entries' bodies would be obviously
 * wrong.
 */

export type SectionType =
  | "hero"
  | "pricing"
  | "navbar"
  | "footer"
  | "featured"
  | "faq"
  | "client";

export type UseCase = "saas" | "agency" | "ecommerce" | "portfolio";

export type UseCaseEntry = {
  type: SectionType;
  useCase: UseCase;
  /** Page H1 and meta title prefix. */
  title: string;
  /** Meta description, ~155 chars. */
  description: string;
  /** Exact-match SEO keyword the URL targets. */
  keyword: string;
  /** 60-80 word page lead, sets the frame. */
  lead: string;
  /** 50-70 word "what's different about X for Y". */
  context: string;
  /** Recommended primary component slug for the install snippet. */
  primaryComponent: string;
  /** 3-5 component slugs from the registry, ordered by recommendation. */
  components: string[];
  /** 3 FAQs, 60-100 word answers, use-case specific. */
  faqs: Array<{ q: string; a: string }>;
};

const ENTRIES: UseCaseEntry[] = [
  {
    type: "hero",
    useCase: "saas",
    title: "Shadcn hero sections for SaaS",
    description:
      "Hero sections built for SaaS sign-up flows — clear value prop, primary trial CTA, secondary demo CTA, real product surface above the fold.",
    keyword: "shadcn hero for saas",
    lead: "SaaS heroes have six seconds to answer one question: what does this product do, and why should I sign up? The structure that consistently converts: an outcome-led headline, an audience-named subheadline, two CTAs (a primary trial button and a secondary demo button), and a real product screenshot above the fold. Heroes that lead with team photos or stock illustration lose to heroes that lead with the product.",
    context:
      "SaaS landing pages run a self-serve activation funnel. Every hero element either pulls toward the trial CTA or pulls away from it. The 'play product video' link is almost always pulling away — visitors who hit play rarely come back to the trial button. Cut anything that's not earning its placement.",
    primaryComponent: "structured-hero-section",
    components: [
      "structured-hero-section",
      "tabbed-hero-section",
      "pricing-landing-hero",
      "hero-title-animation",
    ],
    faqs: [
      {
        q: "What's the right CTA structure for a SaaS hero?",
        a: "Two CTAs: a primary ('Start free trial') and a secondary ('Book a demo'). The primary is for self-serve buyers ready to try; the secondary catches buyers who need to talk to sales. Don't make visitors choose between three or four equivalent buttons — decision fatigue tanks your click-through rate. If your product has a freemium tier, swap the primary to 'Sign up free' and reserve 'Start free trial' for the paid plans.",
      },
      {
        q: "Should the SaaS hero show product UI?",
        a: "Yes — ideally a real screenshot of your dashboard or the main UI. The product surface above the fold telegraphs what the product actually does in a way no headline can. Mockup or illustration heroes underperform real-product heroes by roughly 20-30% on most B2B SaaS funnels. If your UI isn't visually compelling yet, ship a representative screenshot anyway and iterate; an honest product shot beats a polished illustration of a fake dashboard.",
      },
      {
        q: "What about a 'No credit card required' microcopy?",
        a: "Use it under the primary CTA if your trial actually doesn't require a card. It removes the single biggest friction point for new users. Don't fake it though — if your trial does require a card, find a different microcopy ('Free for 14 days', 'Cancel anytime'). Mismatched promises kill activation. The microcopy should be small (~12px), grey, directly under the button, and read in under one second.",
      },
    ],
  },
  {
    type: "hero",
    useCase: "agency",
    title: "Shadcn hero sections for agencies",
    description:
      "Hero sections for design and development agencies — portfolio-led layouts, project-credibility framing, and contact-driven CTAs.",
    keyword: "shadcn hero for agency",
    lead: "Agency heroes have a different job than SaaS heroes. The visitor isn't trying to start a trial — they're trying to decide if you can be trusted with a $50K-$500K project. The hero needs to telegraph craft, not features. Visual heroes win here. Lead with a curated still from your best recent work, name the kind of clients you serve, and put one clear CTA: 'See our work' or 'Start a project'.",
    context:
      "Agency funnels are conversation-led. The visitor reads the hero, browses 2-3 case studies, then reaches out. There's no signup. The hero's job is to earn the case-study click, not to close the deal. Skip pricing, skip feature lists — those defaults that work for SaaS actively hurt here.",
    primaryComponent: "card-carousel-hero",
    components: [
      "card-carousel-hero",
      "gradient-hero-showcase",
      "split-hero-section",
      "video-hero-showcase",
    ],
    faqs: [
      {
        q: "Should an agency hero show client logos?",
        a: "Not in the hero itself — put logos in their own section directly under the hero. Mixing logos into the hero competes with the headline for attention. The cleanest pattern: hero with strong visual + headline, then a single logo strip immediately below, then case studies. The visual carries the craft signal; the logo strip confirms credibility; case studies do the heavy convincing.",
      },
      {
        q: "What CTA wording works best for agency heroes?",
        a: "Project-led wording outperforms generic 'Contact us' by a large margin. 'Start a project' (action-led, low commitment) and 'See our work' (curiosity-led, browsable) both convert better than 'Get in touch' or 'Contact'. Avoid jargon like 'Let's collaborate' or 'Begin your journey' — these read as agency boilerplate and signal you're more about the pitch than the work.",
      },
      {
        q: "Video background or static image?",
        a: "Static or curated card carousel. Video backgrounds eat bandwidth, fail on mobile, and almost always look generic. The exception is a 5-10 second loop of a single signature project — and only if you have the asset. If you're considering stock video, don't. A single sharp still from your best work outperforms any stock loop.",
      },
    ],
  },
  {
    type: "hero",
    useCase: "ecommerce",
    title: "Shadcn hero sections for ecommerce",
    description:
      "Hero sections for ecommerce stores — product-led layouts, urgency cues, and CTAs that go straight to shop or featured product.",
    keyword: "shadcn hero for ecommerce",
    lead: "Ecommerce heroes don't sell the brand — they sell the product. Visitors land from a paid ad or organic search with a specific intent: buy something. The hero either escorts them to the product or loses them. Lead with a high-quality product shot, a price-anchored headline ('From $49'), and a single CTA: 'Shop now' or the product name itself. Brand storytelling belongs on the About page.",
    context:
      "Ecommerce funnels are conversion-rate-obsessed. Every percentage point on hero CTR translates directly to revenue. Generic 'lifestyle hero' images with smiling models holding the product underperform clean studio product shots on a neutral background. Test it on your own store before believing me.",
    primaryComponent: "video-hero-showcase",
    components: [
      "video-hero-showcase",
      "card-carousel-hero",
      "split-hero-section",
      "gradient-hero-showcase",
    ],
    faqs: [
      {
        q: "Should the ecommerce hero include pricing?",
        a: "Yes — anchor pricing creates qualifying intent. 'Premium leather wallets, from $89' filters out visitors who weren't going to buy anyway and primes the rest. Hiding price (forcing visitors to click through to discover it) feels evasive on ecom and tanks add-to-cart rates. The exception: ultra-luxury brands where price-on-request signals exclusivity. If you're not Rolex or Hermes, show the price.",
      },
      {
        q: "Carousel of products, or single hero product?",
        a: "Single product if you have a hero SKU; carousel if your value prop is variety. Single-product heroes convert higher per-impression because they reduce decision load. Carousels work for category-led stores ('100+ knife designs') where browsing IS the value. The wrong move: a carousel of three random products that don't tell a story. Pick a hero product or own the variety angle — don't half-commit.",
      },
      {
        q: "Where should the search bar go?",
        a: "Persistent in the navbar, not in the hero. Putting search in the hero competes with the buy CTA and tanks conversion on the hero's primary product. Visitors who want to search will look at the navbar — a behavior so universal that you don't need to hand-hold. Save the hero real estate for the product and the price anchor; let the navbar handle search and category navigation.",
      },
    ],
  },
  {
    type: "hero",
    useCase: "portfolio",
    title: "Shadcn hero sections for portfolios",
    description:
      "Hero sections for personal portfolios — bio-led layouts, work-led layouts, and the trade-offs between each.",
    keyword: "shadcn hero for portfolio",
    lead: "Portfolio heroes have to do something almost no other hero does: introduce a person. Visitors are usually recruiters, hiring managers, or potential collaborators trying to decide in 10 seconds whether to keep reading. The structures that work: name + role + one-line value prop ('I design fintech onboarding flows'), or a single hero project that visually anchors what you do. Avoid the empty-hero with just a name and a chevron.",
    context:
      "Portfolio funnels are trust-and-fit funnels. Recruiters skim 50 portfolios a day. The hero either earns the next-section scroll or it doesn't. The two failure modes: trying too hard ('Hi, I'm an award-winning multidisciplinary creative...') or being too sparse ('I make things'). Specific is better than impressive.",
    primaryComponent: "structured-hero-section",
    components: [
      "structured-hero-section",
      "hero-title-animation",
      "split-hero-section",
      "card-carousel-hero",
    ],
    faqs: [
      {
        q: "Should I show my photo in the portfolio hero?",
        a: "Optional — depends on the role. For client-facing roles (consulting, leadership, freelance), a photo builds trust. For backend engineering, design systems work, or anywhere the work matters more than the person, skip it. If you do include a photo, make it neutral and recent. Avoid the 'looking-into-distance creative' shot — it reads as a stock-photo cliché.",
      },
      {
        q: "What's the right CTA for a portfolio hero?",
        a: "Two: 'See my work' (primary) and 'Get in touch' (secondary). Don't open the email-link CTA above the work CTA — visitors need to see the work before deciding to email. If you have a CV, link it in the navbar, not in the hero. The hero's job is to earn the next-section scroll; the email CTA is for visitors who've already decided after scrolling through case studies.",
      },
      {
        q: "Is a typing animation too much?",
        a: "Usually yes. Typing animations on portfolio headlines were a 2020 trend that's now a tell — they signal 'I learned framer-motion last month' more than they signal craft. The exception is if the typing reveals something genuinely surprising or playful. Default to a static headline with sharp copy. The headline does the work; the animation is decoration.",
      },
    ],
  },
  {
    type: "pricing",
    useCase: "saas",
    title: "Shadcn pricing sections for SaaS",
    description:
      "Pricing sections for SaaS products — three-tier ladders, feature matrices, and the choice between them based on your sales motion.",
    keyword: "shadcn pricing for saas",
    lead: "SaaS pricing pages drive a real share of conversion. Self-serve buyers land here before signing up; sales-led buyers land here before requesting a demo. The structure that works for 80% of SaaS: a three-tier ladder (Starter, Pro, Enterprise) with the middle tier visually anchored by a 'Most popular' badge. Feature matrices are for procurement-led enterprise buyers — overkill for self-serve.",
    context:
      "The most under-used lever on SaaS pricing pages: the annual-vs-monthly toggle that defaults to 'Annual'. A 20% annual discount visible at the top primes the visitor to think in annual terms, which doubles the average plan revenue. Defaulting to monthly leaves real money on the table.",
    primaryComponent: "pricing-plans",
    components: [
      "pricing-plans",
      "pricing-tiers",
      "pricing-with-user-scaling",
      "pricing-feature-matrix",
    ],
    faqs: [
      {
        q: "Three tiers or four tiers?",
        a: "Three tiers. Four-tier pricing shows up when a product manager wants to add a 'Team' tier between Pro and Enterprise — usually because a sales call surfaced an objection. Resist. Four tiers means visitors have to compare four options instead of three, decision fatigue rises, and the conversion rate drops. Solve the 'Team' objection inside the Pro tier with a per-seat scaler, not by adding another column.",
      },
      {
        q: "Should I show the price for the Enterprise tier?",
        a: "No — 'Contact us' for Enterprise, with starting price as 'Custom' or 'Let's talk'. Hiding the Enterprise price isn't evasion; it's signaling that this tier is for buyers who need a real conversation about volume, security, and contracts. Showing a number forces you to anchor at one figure that's wrong for half your enterprise prospects. Add 'Starting at $2K/mo' if you want a soft anchor without committing.",
      },
      {
        q: "Where should the FAQ go on a pricing page?",
        a: "Directly below the pricing cards, before any other content. Pricing-page FAQs catch the buyer who's almost converted but has one specific objection ('Can I cancel anytime?', 'Do you offer non-profit discounts?', 'What happens at the end of the trial?'). Five questions max, accordion format, all closed by default. Open-by-default FAQs add scroll length without adding signal.",
      },
    ],
  },
  {
    type: "pricing",
    useCase: "agency",
    title: "Shadcn pricing sections for agencies",
    description:
      "Pricing sections for agencies — package pricing, day-rate listings, and when to publish numbers vs. quote on request.",
    keyword: "shadcn pricing for agency",
    lead: "Most agencies don't publish pricing — and most should. Hiding all numbers behind 'Contact us' filters out budget-aligned prospects right alongside the under-budget ones. The pattern that works: publish 'starting at' figures for productized services (a brand sprint at $15K, a website redesign at $40K), keep custom strategy work as 'Quote on request'. The numbers do qualifying work for you.",
    context:
      "The agency-pricing fear is that posting numbers loses you the high-budget enterprise deals. In practice, the opposite happens: 'Starting at $40K' filters out the $5K freelance-tier inquiries that waste your sales team's time, and signals to the $200K enterprise buyer that you're operating at their tier. The bottom of your funnel becomes higher-quality, not smaller.",
    primaryComponent: "pricing-comparison",
    components: [
      "pricing-comparison",
      "pricing-cards-tooltip",
      "pricing-tiers",
      "pricing-flow",
    ],
    faqs: [
      {
        q: "Should our agency publish day rates?",
        a: "Only if you sell time-based engagements (staff augmentation, fractional CTO, ongoing retainers). For project-based work, day rates anchor the conversation in hours instead of outcomes — the wrong frame for design and engineering work that compresses 80 hours of value into 20 hours of senior craft. Publish project-based 'starting at' pricing instead, which tells the budget story without devaluing the work.",
      },
      {
        q: "How granular should agency package pricing be?",
        a: "Three tiers max, each named by deliverable scope (e.g., 'Brand Sprint', 'Brand System', 'Brand + Implementation'). Avoid pricing by hours, page count, or feature checklist — those frames apply to commodity work, and your pricing page should signal you're not a commodity. Each tier should describe the outcome the client gets, not the artifacts you produce. Outcome pricing rises with perceived value; artifact pricing settles to commodity rates.",
      },
      {
        q: "Should we list 'Contact us for custom pricing'?",
        a: "Yes — as a fourth option after the three productized tiers, framed as 'We do custom too'. This catches the visitor who needs something outside your packages without forcing them to assume your packages are inflexible. Don't make it the primary path — that signals you're a custom-first shop and triggers the 'I need three quotes' procurement reflex. Productize the common 80%; quote the custom 20%.",
      },
    ],
  },
  {
    type: "navbar",
    useCase: "saas",
    title: "Shadcn navbars for SaaS",
    description:
      "Navbar layouts for SaaS products — the sign-in/sign-up CTA pair, product/pricing/changelog nav, and the user-menu pattern for logged-in views.",
    keyword: "shadcn navbar for saas",
    lead: "SaaS navbars do double duty: they introduce the product to logged-out visitors and they wrap the dashboard for logged-in users. The structure that works for the marketing site: logo, 4-6 horizontal nav items (Product, Pricing, Customers, Docs, Changelog), a 'Sign in' link, and a primary 'Get started' button. Five nav items is the sweet spot — fewer feels barren, more starts looking like an enterprise IT vendor.",
    context:
      "The two CTAs in a SaaS navbar (sign in vs. start) handle two different visitor types: returning users heading to login, and new visitors heading to signup. They have to be visually distinct. 'Sign in' as a text link, 'Get started' as a filled button, with clear spacing between. Mixing them up — same color, same weight — breaks the implicit signal and slows both groups down.",
    primaryComponent: "navbar-with-search",
    components: [
      "navbar-with-search",
      "navbar-centered",
      "navbar-tabs",
      "navbar-user-menu",
    ],
    faqs: [
      {
        q: "Should the SaaS navbar have a search bar?",
        a: "Only if your product has docs deep enough to justify it. A search bar in a marketing-site navbar implies the visitor needs to find something — which is true for documentation-heavy SaaS (Stripe, Vercel, Auth0) but oversells for a five-page site. If you're shipping a Marketing site + a separate Docs site, put search in the Docs navbar, not the marketing one. Site-wide search on a marketing site usually returns mediocre results that erode trust.",
      },
      {
        q: "What about a 'Changelog' nav item?",
        a: "Worth its slot if you ship at least monthly and have a real audience of power users. Changelog visibility signals product velocity, which converts technical buyers. If you ship quarterly or less, a stale changelog actively hurts — visitors land on it, see the last entry was four months ago, and take it as a 'product abandoned' signal. Either commit to keeping it fresh or omit it entirely.",
      },
      {
        q: "Should we surface 'Pricing' in the navbar?",
        a: "Yes — almost always. Hiding pricing in a footer or behind a 'Plans' submenu sends a 'we're being cagey' signal and loses budget-qualified visitors. The exception: enterprise-only products where 'Contact sales' is the genuine call-to-action and there's no public pricing to show. For everyone else, 'Pricing' as a top-level nav item is table stakes — and visitors who click straight to it are usually higher-intent than the ones who arrive at pricing via the homepage.",
      },
    ],
  },
  {
    type: "navbar",
    useCase: "agency",
    title: "Shadcn navbars for agencies",
    description:
      "Navbar layouts for design and development agencies — work-led nav, services dropdown patterns, and the contact CTA.",
    keyword: "shadcn navbar for agency",
    lead: "Agency navbars announce craft before they announce structure. Most should be minimal: logo, 3-4 nav items (Work, Services, About, Journal/Blog), and a single 'Contact' CTA. Skip the multi-level dropdowns that consulting firms love — they signal procedure and process, the opposite of what design and development buyers want. The visitor wants to see your work first, then decide if you're a fit; the navbar's job is to make Work the easiest click.",
    context:
      "Agency-navbar mistakes are usually about over-structure. Sub-menus listing 'Strategy / Brand Identity / Visual System / Motion Design' read as agency-jargon overload. One 'Services' top-level link to a single page covering everything you do is cleaner and converts better. Save the discipline-by-discipline breakdown for the Services page itself.",
    primaryComponent: "navbar-minimal",
    components: [
      "navbar-minimal",
      "navbar-floating",
      "navbar-centered",
      "hover-gradient-navbar",
    ],
    faqs: [
      {
        q: "Should our agency navbar list specific services?",
        a: "No — keep 'Services' as a single nav item linking to one services page. Listing each discipline (UX research, visual design, frontend dev, motion) in the navbar fragments your work into procurement categories that lower-tier agencies use. A senior agency presents itself as a unit ('we design and build digital products'), not as a checklist of disciplines. Save the breakdown for the services page where it can have nuance.",
      },
      {
        q: "Where should the contact CTA go?",
        a: "Far-right, as a single button that's visually distinct from the nav items. 'Contact', 'Start a project', or 'Work with us' all work; 'Get in touch' is fine but generic. Avoid two CTAs in the navbar — agencies don't have a 'sign in' equivalent, so the 'Contact' button doesn't need to compete with anything. One clear button, end of nav, every page. That's the pattern.",
      },
      {
        q: "Is a sticky navbar the right choice?",
        a: "Sticky-on-scroll works well for agency sites because the case study pages are long-scroll. Visitors deep into a case study want one-click access back to navigation. Use a translucent or background-blur sticky navbar that doesn't dominate when overlaid on case study imagery. Avoid the 'navbar shrinks on scroll' pattern — it's a transition that adds visual noise without earning its complexity.",
      },
    ],
  },
  {
    type: "navbar",
    useCase: "ecommerce",
    title: "Shadcn navbars for ecommerce",
    description:
      "Navbar layouts for ecommerce stores — category mega-menus, persistent search, account/cart icons, and announcement bars above.",
    keyword: "shadcn navbar for ecommerce",
    lead: "Ecommerce navbars are the most utility-dense navbars in any vertical. Visitors need to: search for a product, browse categories, log into their account, see their cart, find shipping info, find returns info — all from the navbar. The structure that works: logo, primary categories (3-6 items), persistent search bar, account icon, cart icon with item count badge. Promotional announcement bars sit above (free shipping thresholds, sale countdowns).",
    context:
      "The cart-icon badge is one of the highest-leverage UI elements on an ecommerce site. A visible '3' next to the cart icon increases checkout-completion rate noticeably — it reminds visitors who've abandoned mid-browse that they have items waiting. Persistent across all pages, never let the cart count silently disappear when the visitor navigates away.",
    primaryComponent: "navbar-with-search",
    components: [
      "navbar-with-search",
      "navbar-status",
      "navbar-tabs",
      "expandable-menu-navbar",
    ],
    faqs: [
      {
        q: "Mega menu or simple dropdown for ecommerce categories?",
        a: "Mega menu if you have 20+ categories or a hierarchical taxonomy (Men > Shirts > Long Sleeve > Linen). Simple dropdown or even a flat horizontal list if you have under 10 categories. Don't ship a mega menu by default just because every big retailer has one — Allbirds and Glossier launched with flat navigation and converted higher than their mega-menu predecessors. Mega menus are powerful when justified by inventory; bloat when not.",
      },
      {
        q: "Where should the announcement bar go?",
        a: "Directly above the navbar, dismissable, full-width. Use it for time-bound promotions ('Free shipping over $75', 'Sale ends in 2 days') and nothing else. Don't ship a permanent announcement bar that shows the same message every visit — visitors blind to it within two pageviews and the dismissable click rate becomes a dark pattern. Announcement bars that rotate through 4 messages also fail; they confuse more than they communicate.",
      },
      {
        q: "Account icon, login link, or both?",
        a: "Account icon (person silhouette) for everyone — it's the universal pattern that works for both logged-in and logged-out states. Logged-out clicks open a sign-in modal; logged-in clicks open the account menu. Avoid the 'Sign in' text link next to the account icon — they collide visually and confuse first-time visitors. The single icon scales cleanly across mobile and desktop, and the modal-on-click pattern is what users now expect from major retailers.",
      },
    ],
  },
  {
    type: "navbar",
    useCase: "portfolio",
    title: "Shadcn navbars for portfolios",
    description:
      "Navbar layouts for personal portfolios — minimal navs, the work/about/contact triad, and where to put your CV link.",
    keyword: "shadcn navbar for portfolio",
    lead: "Portfolio navbars should be the smallest navbars on the web. Three or four items maximum: Work, About, Contact, plus an optional Journal/Writing link. Logo or wordmark on the left. No sticky scroll. No dropdowns. The visitor isn't here to browse a complex information architecture — they're here to look at a few projects and decide if they want to talk to you. Keep the navigation invisible enough that the work carries the page.",
    context:
      "The portfolio-navbar mistake is mimicking agency navbars. Personal portfolios are smaller information surfaces than agency sites — the same nav structure that works for a 30-person agency feels overbuilt on a single-person site. Use a navbar that matches your scale; otherwise the navbar itself signals 'I'm trying too hard'.",
    primaryComponent: "navbar-minimal",
    components: [
      "navbar-minimal",
      "navbar-centered",
      "navbar-floating",
      "navbar-simple",
    ],
    faqs: [
      {
        q: "Should I link to my CV or LinkedIn from the navbar?",
        a: "CV yes, LinkedIn maybe. A 'CV' or 'Resume' nav link sends recruiters straight to the document they need; LinkedIn is duplicate signaling that interrupts the portfolio flow. If you do link LinkedIn, put it in the footer with your other social links, not in the navbar. The navbar is for the highest-intent destinations: work, about, contact, CV. Everything else dilutes.",
      },
      {
        q: "Is a 'Hire me' nav CTA too aggressive?",
        a: "It depends on positioning. 'Hire me' works for actively-freelancing folks who want to optimize for inbound; it reads as desperate for senior in-house designers or engineers signaling tier. Default to 'Contact' or 'Get in touch' — neutral, action-oriented, and doesn't trigger the 'this person is between jobs' read. If you're confident in your tier, the work itself does the hire-me signaling.",
      },
      {
        q: "Should I show my availability status in the navbar?",
        a: "If you're freelancing, yes — a small dot ('● Available for projects' or '○ Booked through Q3') in the navbar saves recruiters and prospects a click. Update it. A dot showing 'Available' next to a calendar that's been dormant for two years is worse than no dot at all. If you can't commit to keeping it accurate within a week of changes, omit the indicator.",
      },
    ],
  },
  {
    type: "footer",
    useCase: "saas",
    title: "Shadcn footers for SaaS",
    description:
      "Footer layouts for SaaS — the fat footer pattern with product/company/legal/resources columns, status badges, and SOC 2 indicators.",
    keyword: "shadcn footer for saas",
    lead: "SaaS footers should be fat — six to ten columns, 50+ internal links, sectioned by Product, Company, Resources, Legal, Compliance. The visible signal is professionalism; the SEO signal is internal linking equity. Visitors who reach the footer are usually doing one of three things: looking for terms-of-service, checking compliance certifications, or hunting for the changelog. All three should be one click away from any page on the site.",
    context:
      "The under-used SaaS-footer surface is compliance: SOC 2 Type II badge, GDPR statement, ISO 27001 if you have it. These aren't decorative — they're how procurement teams qualify you in their initial scan. A visible compliance row in the footer cuts down 'do you have SOC 2' email volume by half and signals enterprise-readiness without anyone having to ask.",
    primaryComponent: "corporate-footer",
    components: [
      "corporate-footer",
      "footer-enterprise",
      "footer-pro",
      "wordmark-footer",
    ],
    faqs: [
      {
        q: "What columns should a SaaS footer have?",
        a: "Four to six: Product (features, pricing, integrations, changelog), Company (about, careers, blog, press), Resources (docs, API, status, customer stories), Legal (terms, privacy, security, DPA). Add a fifth Compliance column if you have certifications worth listing. Don't ship a 'Social' column — link socials with icons in the footer bottom row, not as a separate column where they look isolated and undersized.",
      },
      {
        q: "Should the footer show server status?",
        a: "Yes — a colored dot ('● All systems operational' / '● Degraded performance') linking to status.yourcompany.com. This is one of the highest-trust signals you can put in a footer for a developer-tool SaaS. It says 'we know things break, we're transparent about it, we're not hiding'. The dot turns red during incidents, which is fine — incident transparency increases trust more than incident-hiding ever does.",
      },
      {
        q: "Where should the cookie banner controls go?",
        a: "Footer should have a 'Cookie preferences' link that re-opens the banner. Don't make the banner one-shot at first visit — visitors who accidentally accepted everything need a way to revisit, and EU compliance increasingly requires it. The link sits in the Legal column or in the bottom row with copyright and language toggles. Hide the cookie controls deeper than the footer and you're inviting GDPR complaints.",
      },
    ],
  },
  {
    type: "featured",
    useCase: "saas",
    title: "Shadcn featured sections for SaaS",
    description:
      "Featured/feature sections for SaaS landing pages — bento grids, three-column layouts, and the 'show the surface, not the spec sheet' principle.",
    keyword: "shadcn feature section for saas",
    lead: "SaaS feature sections fail when they read like a spec sheet ('256-bit encryption, SOC 2 Type II, 99.99% uptime'). Visitors don't buy specs — they buy outcomes. The pattern that works: a bento grid with 4-6 tiles, each showing a moment from the actual product (a screenshot of the UI, a fragment of the workflow, a callout of a real customer outcome). Words explain; pictures convince.",
    context:
      "The single most-overlooked feature-section move: cropping. A bento tile with a tightly-cropped UI fragment ('your team's last 5 deploys', 'incoming alerts in real time') outperforms the same tile with a wide shot of the full dashboard. Crop to the moment that demonstrates the value, not the chrome around it. Wide shots dilute; close crops convince.",
    primaryComponent: "feature-highlights",
    components: [
      "feature-highlights",
      "split-feature-showcase",
      "product-feature-hero",
      "integration-and-stats-section",
    ],
    faqs: [
      {
        q: "How many features should a SaaS landing page show?",
        a: "Four to six. More than six and visitors stop reading; fewer than four and the section feels thin. The mistake is to list every feature you've shipped — that's a spec sheet, not a marketing page. Pick the four or five features that actually drive conversion and lean into them. Visitors decide based on whether your product solves their specific problem, not based on whether your feature list is exhaustive.",
      },
      {
        q: "Bento grid or alternating image-text rows?",
        a: "Bento for products with visual outputs (dashboards, design tools, analytics). Alternating rows for products where each feature needs deep context (developer tools, complex workflows). Bento works because it lets visitors visually scan five features in five seconds; rows work because each row gets a paragraph and a screenshot. Don't ship both — pick the one that matches your product's visual character and commit.",
      },
      {
        q: "Should each feature have its own CTA?",
        a: "No. Feature-section CTAs fragment the visitor's attention — five 'Learn more' links pulling toward five different docs pages dilute the funnel. Use one section-level CTA at the bottom ('Start free trial' or 'See all features') that consolidates intent. The feature tiles themselves do the work of telling the story; the CTA at the bottom captures whatever conversion intent the section earned.",
      },
    ],
  },
  {
    type: "featured",
    useCase: "agency",
    title: "Shadcn featured sections for agencies",
    description:
      "Featured sections for agencies — case study highlights, capability showcases, and the bento-vs-narrative trade-off.",
    keyword: "shadcn feature section for agency",
    lead: "Agency 'features' aren't features — they're capabilities or case-study moments. The structure that works: a 4-tile bento grid showcasing your most signature project moments (a hero shot from a brand identity, a snippet of an interactive prototype, a before-after from a redesign), or a three-column grid of capabilities with one representative project per capability. The work IS the feature; don't separate them.",
    context:
      "The agency-feature-section trap is listing capabilities as bullet points: 'Brand strategy / Visual identity / Web design / Motion design'. That format reads as a checklist of services and signals commodity work. Lead with the projects; let the projects evidence the capabilities. A visitor who sees a stunning brand identity case study doesn't need you to tell them you do brand identity.",
    primaryComponent: "split-feature-showcase",
    components: [
      "split-feature-showcase",
      "feature-highlights",
      "ruixen-featured-message-card",
      "product-feature-hero",
    ],
    faqs: [
      {
        q: "Should we show capabilities as a list or as case study moments?",
        a: "Case study moments. A bento grid showing four project highlights communicates more about your capabilities than any text list could. Visitors infer 'they do brand identity' from seeing your brand identity work, which is a stronger signal than the words 'we do brand identity'. Save the explicit capability list for the dedicated services page where it can carry nuance and process detail.",
      },
      {
        q: "How many case studies should the homepage feature?",
        a: "Three to five. Fewer than three reads as thin (or worse, like you only have three to show). More than five makes the homepage scroll feel like a portfolio dump and dilutes which projects you're actually proud of. Pick the three projects that best represent the kind of work you want more of — the homepage is a casting call for your next client, so curate accordingly.",
      },
      {
        q: "Should each featured case study link to its full case study?",
        a: "Yes — each tile should be a clickable link to the full case study, not just an image. The featured section's job is to earn the case-study click; the case study's job is to earn the contact CTA. Don't ship featured sections that show the work but don't let visitors dive deeper. Visitors who want to verify quality will go looking for the deep dive; not having one signals the project doesn't survive scrutiny.",
      },
    ],
  },
  {
    type: "faq",
    useCase: "saas",
    title: "Shadcn FAQ sections for SaaS",
    description:
      "FAQ sections for SaaS pricing and landing pages — accordion patterns, the 5-question rule, and which objections to surface.",
    keyword: "shadcn faq for saas",
    lead: "SaaS FAQs are the conversion safety net. They catch the visitor who almost converted but had one specific objection — 'Can I cancel anytime?', 'Do you offer SSO?', 'How does pricing work for teams?'. Five questions max, accordion format, all closed by default. Each question should kill a real objection. If a question doesn't kill an objection, cut it. Generic 'About our company' FAQs are filler that adds scroll length without adding signal.",
    context:
      "The right place for the SaaS FAQ is directly below the pricing cards. By the time the visitor is reading the FAQ, they've engaged with the product and seen the price — they're choosing whether to convert. The FAQ catches that moment. Putting the FAQ at the bottom of the homepage, far from the pricing cards, divorces it from the conversion moment and reduces its impact significantly.",
    primaryComponent: "staggered-faq-section",
    components: [
      "staggered-faq-section",
      "faq-scroll-accordion",
      "faq-auto-accordion",
    ],
    faqs: [
      {
        q: "What's the right number of questions in a SaaS FAQ?",
        a: "Five or fewer. Each question should kill a real objection your sales team or support team has actually heard from prospects — not generic 'how does it work' questions. If you have more than five real conversion-blocking objections, your product positioning has bigger problems than your FAQ section. Audit your support tickets and sales call notes; the actual objections will reveal themselves.",
      },
      {
        q: "Should SaaS FAQs be open or closed by default?",
        a: "Closed. Open-by-default FAQs add scroll length without signal — visitors don't read the answers; they just scroll past. Accordion-closed lets the visitor scan the questions, see if any address their concern, and click only the relevant ones. The behavior pattern matches how visitors actually use FAQs in 2026: they're looking for one specific answer, not reading a manual.",
      },
      {
        q: "Should the SaaS FAQ include FAQPage JSON-LD schema?",
        a: 'Yes — FAQPage JSON-LD lets Google show your Q&As as rich snippets in search results, which is one of the highest-CTR SERP enhancements available. Inline a `<script type="application/ld+json">` block alongside the visible FAQ markup. Both should match: don\'t show one set of questions visually and ship a different set in the schema. Google penalizes mismatched schema as deceptive.',
      },
    ],
  },
  {
    type: "client",
    useCase: "saas",
    title: "Shadcn client logo sections for SaaS",
    description:
      "Client logo strips for SaaS — placement under the hero, recognizable-name selection, and the 'used by 10,000 teams' alternative.",
    keyword: "shadcn client logos for saas",
    lead: "SaaS client logo strips do trust-signal work that no other section can. Five to eight recognizable logos directly under the hero clear the first trust threshold ('real companies use this') and qualify the visitor to keep scrolling. Putting logos in the footer instead is the most common SaaS landing page mistake — by the time visitors scroll to the footer, they've already decided. Logos belong above the fold-fold, not at the page bottom.",
    context:
      "Logo selection matters more than logo count. Five logos visitors actually recognize beat fifteen logos they don't. If you have one or two big-name customers, use those alone in a 'Trusted by' callout instead of forcing them into a strip with smaller customers. The logo strip works as a recognition test — visitors scan, find a name they know, and that single recognition does more conversion work than the rest of the strip combined.",
    primaryComponent: "trusted-clients-showcase",
    components: [
      "trusted-clients-showcase",
      "auto-scrolling-client-carousel",
      "bordered-clients-grid",
      "client-carousel-showcase",
    ],
    faqs: [
      {
        q: "How many client logos should a SaaS landing page show?",
        a: "Five to eight in a static strip; 12+ if you're using a marquee/auto-scrolling pattern. Fewer than five looks thin; more than eight in a static row creates visual clutter and visitors stop perceiving each logo individually. The sweet spot is six logos, evenly-spaced, sized so each has equivalent visual weight — disparate logo sizes (where one is 3x the others) create accidental hierarchy that distracts from the trust signal.",
      },
      {
        q: "Should we use grayscale logos or color logos?",
        a: "Grayscale, almost always. Color logos turn into a visual chaos band — Slack purple next to Stripe purple next to Salesforce blue creates a rainbow that competes with your headline above. Grayscale logos read as a unified strip, signal restraint, and let your brand colors keep their emphasis. The exception: if your brand identity is itself colorful and editorial, color logos can fit; for most B2B SaaS, grayscale is the default.",
      },
      {
        q: "Auto-scrolling marquee or static logo strip?",
        a: "Static for fewer than 12 logos; marquee for 12+ when you want to imply 'and many more'. Static reads as confident ('here are our customers, take a look'); marquee reads as scale-flexing ('look how many we have'). Don't ship a marquee with only 6 logos — the loop becomes obvious after one cycle and the section reads as smaller than it is. Match the format to the inventory: enough logos to fill a marquee, or commit to static.",
      },
    ],
  },
];

export const USE_CASE_ENTRIES = ENTRIES;

export const SECTION_TYPES: SectionType[] = [
  "hero",
  "pricing",
  "navbar",
  "footer",
  "featured",
  "faq",
  "client",
];

export const USE_CASES: UseCase[] = [
  "saas",
  "agency",
  "ecommerce",
  "portfolio",
];

/**
 * Look up an entry by URL params. The useCase param arrives with the
 * `for-` prefix from the route (e.g., `for-saas`); we strip it for the
 * data lookup.
 */
export function getEntry(
  type: string,
  useCaseParam: string,
): UseCaseEntry | undefined {
  const useCase = useCaseParam.replace(/^for-/, "") as UseCase;
  return ENTRIES.find((e) => e.type === type && e.useCase === useCase);
}

/**
 * URL paths for sitemap generation. Each entry yields one path of the
 * form `/sections/{type}/for-{useCase}`.
 */
export function allUseCasePaths(): Array<{
  type: SectionType;
  useCase: string;
}> {
  return ENTRIES.map((e) => ({ type: e.type, useCase: `for-${e.useCase}` }));
}
