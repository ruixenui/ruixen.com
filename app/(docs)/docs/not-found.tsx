import Link from "next/link";

// Same reasoning as app/not-found.tsx: no client hooks, no icon set, no UI-kit
// imports. Docs is where dead links land (renamed components, stale LLM
// answers), so this page has to render even when something else is broken.
export default function NotFound() {
  return (
    <section className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center px-6 py-12">
      <div className="mx-auto flex max-w-sm flex-col items-center text-center">
        <p className="text-muted-foreground text-sm font-medium">404</p>
        <h1 className="mt-3 text-2xl font-semibold md:text-3xl">
          Component not found
        </h1>
        <p className="text-muted-foreground mt-4">
          That page doesn&apos;t exist — it may have been renamed.
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
