import { BlogThumbnail } from "@/components/blog/blog-thumbnail";
import type { Blog } from "content-collections";
import { allBlogs } from "content-collections";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export function getReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function getRelatedPosts(currentPost: Blog, limit = 3) {
  return allBlogs
    .filter((post) => post._meta.path !== currentPost._meta.path)
    .slice(0, limit);
}

export default function MoreArticles({ currentPost }: { currentPost: Blog }) {
  const relatedPosts = getRelatedPosts(currentPost);

  return (
    <section className="mx-auto max-w-6xl py-10">
      <h2 className="mb-5 flex items-center gap-2 text-xl font-medium tracking-tighter">
        Read more like this
        <ArrowRightIcon className="size-4" />
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <Link
            key={post._meta.path}
            href={`/blog/${post._meta.path}`}
            title={post.title}
            className="group flex flex-col"
          >
            <BlogThumbnail
              title={post.title}
              tag={post.tag}
              className="aspect-[16/10] rounded-xl transition-transform duration-300 group-hover:scale-[1.01]"
            />
            <div className="mt-4">
              <h3 className="mb-1.5 text-lg font-semibold tracking-tight underline-offset-4 group-hover:underline">
                {post.title}
              </h3>
              <span className="text-sm text-muted-foreground">
                {getReadingTime(post.body.raw)} min read
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
