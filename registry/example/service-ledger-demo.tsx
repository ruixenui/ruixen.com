import { ServiceLedger } from "@/registry/ruixenui/service-ledger";

const GRADIENT =
  "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/gradients/shade_shiters";

export default function ServiceLedgerDemo() {
  return (
    <ServiceLedger
      title="How we work with you"
      description="Four ways our studio plugs into your roadmap — from a focused sprint to an embedded, long-term partnership."
      entries={[
        {
          code: "01",
          meta: "4–6 weeks",
          title: "Brand foundation sprint",
          description:
            "Discovery, positioning, and a tight brand system that anchors every surface — from the homepage to the next funding deck.",
          items: [
            "Stakeholder and audience interviews",
            "Positioning, voice, and a messaging matrix",
            "Logo system, type stack, and core color tokens",
            "Brand guidelines doc and component library",
          ],
          image: `${GRADIENT}/shade-shifters-01.png`,
          cta: { href: "#", label: "See the playbook" },
        },
        {
          code: "02",
          meta: "8–12 weeks",
          title: "Design system engineering",
          description:
            "A token-driven, accessibility-audited component library your engineers can actually ship with — light and dark out of the box.",
          items: [
            "Foundations: tokens, spacing scale, type ramp",
            "Primitive and composite component coverage",
            "Theming hooks for light, dark, and brand variants",
            "Searchable docs your whole team can use",
          ],
          image: `${GRADIENT}/shade-shifters-02.png`,
        },
        {
          code: "03",
          meta: "12–16 weeks",
          title: "Product build-out",
          description:
            "Full-stack delivery for the first slice of your product — designed, built, instrumented, and live in a quarter.",
          items: [
            "App Router foundation with edge-ready deploys",
            "Auth, billing, and data layer wiring",
            "Analytics, error tracking, and feature flags",
            "A two-week launch checklist and handoff",
          ],
          image: `${GRADIENT}/shade-shifters-03.png`,
          cta: { href: "#", label: "Read a case study" },
        },
        {
          code: "04",
          meta: "Ongoing",
          title: "Growth and optimization",
          description:
            "Embedded design and engineering capacity for the months after launch — landing pages, experiments, and lifecycle UI.",
          items: [
            "Quarterly refreshes and net-new pages",
            "Experiment briefs and A/B test scaffolding",
            "Onboarding, pricing, and upgrade flows",
            "Weekly working sessions with your team",
          ],
          image: `${GRADIENT}/shade-shifters-04.png`,
        },
      ]}
    />
  );
}
