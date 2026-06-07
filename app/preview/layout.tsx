import type { Metadata } from "next";
import type { ReactNode } from "react";

// Preview routes render the exact same components already documented under
// /docs/components/*, so to Google they are duplicate content with no
// standalone search value (31 such pages, 0 clicks across 90 days of GSC).
// Mark the whole /preview/* route group `noindex` so Google drops the URLs
// it already has and crawl budget flows to real pages instead.
//
// We deliberately keep `follow: true` (so internal-link equity still flows
// out of these pages) and do NOT add /preview to robots.txt — Google must be
// able to crawl the page to SEE this noindex and de-index the existing URLs.
// A robots.txt disallow would freeze them in the index as URL-only entries.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
