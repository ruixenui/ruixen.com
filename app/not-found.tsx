import Link from "next/link";

// Deliberately a plain server component with no client hooks, no icon set and
// no UI-kit imports. The deployed build was serving Next's bare
// `<html id="__next_error__">` document for every 404 — a blank white page —
// because this route's client subtree failed to render. A 404 page is the one
// page that must never depend on anything that can break.
export default function NotFound() {
  return (
    <section className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center px-6 py-12">
      <div className="mx-auto flex max-w-sm flex-col items-center text-center">
        <p className="text-muted-foreground text-sm font-medium">404</p>
        <h1 className="mt-3 text-2xl font-semibold md:text-3xl">
          Page not found
        </h1>
        <p className="text-muted-foreground mt-4">
          The page you are looking for doesn&apos;t exist.
        </p>
        <div className="mt-6 flex items-center gap-x-3">
          <Link
            href="/docs/components"
            className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            Browse components
          </Link>
          <Link
            href="/"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Take me home
          </Link>
        </div>
      </div>
    </section>
  );
}
