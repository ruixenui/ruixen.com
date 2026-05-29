import { FloatingCardsHero } from "@/registry/ruixenui/floating-cards-hero";

export default function FloatingCardsHeroDemo() {
  return (
    <FloatingCardsHero
      announcement="New! Pro blocks just dropped in the registry"
      announcementHref="#"
      title={
        <>Ship modern UIs. Without rebuilding every component from scratch.</>
      }
      description="Ruixen UI gives you 200+ shadcn-style components and full-page blocks you can paste into any React project. Themed by your tokens. Accessible by default."
      primaryAction={{ href: "#", label: "Browse the registry" }}
      secondaryAction={{ href: "/docs", label: "View docs" }}
    />
  );
}
