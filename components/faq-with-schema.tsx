import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqWithSchemaProps {
  faqs: FaqItem[];
  heading?: string;
}

/**
 * Renders an MDX-friendly FAQ block plus a schema.org FAQPage JSON-LD
 * script for SERP rich results. Used on Tier 1 category landing pages
 * (/docs/components/hero-sections, /navbars, /pricing-section, etc.)
 * so Google can surface the answers directly as expandable snippets.
 */
export function FaqWithSchema({
  faqs,
  heading = "Frequently asked questions",
}: FaqWithSchemaProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <section className="my-12">
      <h2 className="font-heading scroll-m-20 pb-2 text-2xl font-semibold tracking-tight">
        {heading}
      </h2>
      <Accordion type="single" collapsible className="mt-4">
        {faqs.map((item, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left text-base">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
