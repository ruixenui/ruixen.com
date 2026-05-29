import { allDocs } from "content-collections";

/**
 * Clean-markdown endpoint for AI / LLM crawlers.
 *
 * `next.config.mjs` rewrites `/docs/:path*.md` → `/llm/:path*` so a
 * request like `/docs/components/sales-ai-hero.md` lands here. We look
 * up the matching content-collection doc and return its raw MDX body as
 * `text/markdown` — no shell, no JS, no chrome. Easy for ChatGPT,
 * Perplexity, Claude, and Google AI Overviews to ingest.
 *
 * Cached aggressively at the CDN since docs are content-addressed by
 * slug; on each new build the cache busts naturally.
 */
export const dynamic = "force-static";

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return allDocs
    .filter((doc) => doc.published !== false)
    .map((doc) => ({ slug: doc.slugAsParams.split("/") }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug: parts } = await params;
  const slug = parts.join("/");
  const doc = allDocs.find(
    (d) => d.slugAsParams === slug && d.published !== false,
  );

  if (!doc) {
    return new Response("Not found", { status: 404 });
  }

  // Front-matter style header so the LLM has the canonical title + URL
  // attached to the body. Helps citations land on the right page.
  // Use `!= null` filter (not `Boolean`) so empty-string spacers survive.
  const header =
    [
      `# ${doc.title}`,
      "",
      doc.description ? `> ${doc.description}` : null,
      "",
      `Source: https://ruixen.com/docs/${doc.slugAsParams}`,
      doc.date ? `Updated: ${doc.date}` : null,
      "",
      "---",
      "",
    ]
      .filter((line): line is string => line !== null)
      .join("\n") + "\n";

  const body = doc.body.raw;

  return new Response(header + body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
