"use client";

import CardCarouselHero from "../ruixenui/card-carousel-hero";

export default function DemoPage() {
  return (
    <CardCarouselHero
      category="Next-Gen UI Library"
      title="Create Stunning Interfaces"
      subtitle="Build beautiful, responsive components with our comprehensive design system."
      cards={[
        { src: "/cards/card1.jpg", alt: "Card 1" },
        { src: "/cards/card2.jpg", alt: "Card 2" },
        { src: "/cards/card3.jpg", alt: "Card 3" },
        { src: "/cards/card4.jpg", alt: "Card 4" },
      ]}
    />
  );
}
