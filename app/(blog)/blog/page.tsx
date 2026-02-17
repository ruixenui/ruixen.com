import { BlogThumbnail } from "@/components/blog/blog-thumbnail";
import { allBlogs } from "content-collections";
import Link from "next/link";

function readingTime(content: string): number {
  return Math.ceil(content.split(/\s+/).length / 200);
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPage() {
  const sorted = [...allBlogs].sort(
    (a, b) =>
      new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime(),
  );

  const featured = sorted.find((b) => b.featured) || sorted[0];
  const rest = sorted.filter((p) => p._meta.path !== featured._meta.path);

  return (
    <section className="mx-auto w-full max-w-5xl px-5 py-16 md:py-24">
      {/* Header */}
      <div className="mb-16">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Writings
        </h1>
        <p className="mt-2 text-muted-foreground">
          Thoughts on design engineering, motion, and craft.
        </p>
      </div>

      {/* Featured */}
      <Link href={`/blog/${featured._meta.path}`} className="group mb-20 block">
        <BlogThumbnail
          title={featured.title}
          tag={featured.tag}
          className="aspect-[2/1] rounded-2xl"
        />
        <div className="mt-5">
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <time dateTime={featured.publishedOn}>
              {formatDate(featured.publishedOn)}
            </time>
            <span aria-hidden>·</span>
            <span>{readingTime(featured.body.raw)} min read</span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight underline-offset-4 group-hover:underline md:text-3xl">
            {featured.title}
          </h2>
          {featured.description && (
            <p className="mt-2 max-w-2xl text-muted-foreground">
              {featured.description}
            </p>
          )}
        </div>
      </Link>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2">
        {rest.map((post) => (
          <Link
            key={post._meta.path}
            href={`/blog/${post._meta.path}`}
            className="group"
          >
            <BlogThumbnail
              title={post.title}
              className="aspect-[16/10] rounded-xl"
            />
            <div className="mt-4">
              <div className="mb-1.5 flex items-center gap-2 text-sm text-muted-foreground">
                <time dateTime={post.publishedOn}>
                  {formatDate(post.publishedOn)}
                </time>
                <span aria-hidden>·</span>
                <span>{readingTime(post.body.raw)} min read</span>
              </div>
              <h3 className="text-lg font-semibold tracking-tight underline-offset-4 group-hover:underline md:text-xl">
                {post.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
