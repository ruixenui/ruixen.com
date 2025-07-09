import sectionsMap from "@/app/map";

export function generateStaticParams() {
  return Object.keys(sectionsMap).map((slug) => ({
    slug,
  }));
}
