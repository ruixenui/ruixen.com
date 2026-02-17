import { BlogThumbnail } from "@/components/blog/blog-thumbnail";
import MoreArticles, { getReadingTime } from "@/components/blog/more-articles";
import { SidebarCTA } from "@/components/sidebar-cta";
import BlogTableOfContents from "@/components/blog/table-of-contents";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";
import { MDXContent } from "@content-collections/mdx/react";
import { allBlogs } from "content-collections";
import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentProps } from "react";

const components = {
  h1: ({ children, ...props }: ComponentProps<"h1">) => (
    <h1
      className="my-7 mb-5 scroll-m-20 text-3xl font-semibold tracking-tighter first:mt-0"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: ComponentProps<"h2">) => (
    <h2
      id={
        typeof children === "string"
          ? children.toLowerCase().replace(/\s+/g, "-")
          : undefined
      }
      className="my-5 mb-3 scroll-m-20 text-2xl font-semibold tracking-tighter"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentProps<"h3">) => (
    <h3
      className="my-5 mb-3 scroll-m-20 text-lg font-semibold tracking-tighter"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: ComponentProps<"h4">) => (
    <h4
      className="my-5 mb-3 scroll-m-20 text-lg font-semibold tracking-tighter"
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({ children, ...props }: ComponentProps<"p">) => (
    <p className="my-3" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: ComponentProps<"ul">) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ComponentProps<"ol">) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: ComponentProps<"li">) => (
    <li className="" {...props}>
      {children}
    </li>
  ),
  table: ({ children, ...props }: ComponentProps<"table">) => (
    <div className="table-container my-6 w-full overflow-y-auto rounded-lg border border-border">
      <table className="table-container my-0 w-full overflow-hidden" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: ComponentProps<"th">) => (
    <th
      className="text-balance border-r border-border bg-neutral-50 px-6 py-3 text-left font-mono text-sm font-semibold tracking-tight text-secondary-foreground last:border-r-0 dark:bg-neutral-900"
      {...props}
    >
      {children}
    </th>
  ),
  tr: ({ children, ...props }: ComponentProps<"tr">) => (
    <tr
      className="border-b last:border-b-0 odd:bg-background even:bg-background/50"
      {...props}
    >
      {children}
    </tr>
  ),
  td: ({ children, ...props }: ComponentProps<"td">) => (
    <td
      className="border-r border-border px-6 py-4 text-sm text-secondary-foreground last:border-r-0"
      {...props}
    >
      {children}
    </td>
  ),
  pre: ({ children, ...props }: ComponentProps<"pre">) => (
    <pre
      className="flex h-fit items-center justify-start gap-x-2 overflow-x-auto rounded-xl bg-[#161b22] px-5 py-4 font-mono text-sm leading-relaxed"
      {...props}
    >
      {children}
    </pre>
  ),
  code: ({ children, ...props }: ComponentProps<"code">) => {
    const isBlock = "data-language" in props || "data-theme" in props;

    if (isBlock) {
      return <code {...props}>{children}</code>;
    }

    return (
      <code
        className="rounded-md bg-neutral-100 px-1.5 py-0.5 font-mono text-[0.85em] text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
        {...props}
      >
        {children}
      </code>
    );
  },
  img: (props: ComponentProps<"img">) => (
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    <img className="my-2 rounded-xl border border-border" {...props} />
  ),
  a: ({ children, ...props }: ComponentProps<"a">) => {
    const linkText = typeof children === "string" ? children : "Link";
    const autoTitle = props.href ? `Visit ${props.href}` : `Go to ${linkText}`;

    return (
      <a
        className="text-primary underline underline-offset-4"
        title={props.title || autoTitle}
        {...props}
      >
        {children}
      </a>
    );
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const postSlug = Array.isArray(resolvedParams.slug)
    ? resolvedParams.slug[0]
    : resolvedParams.slug;
  const post = allBlogs.find((post) => post._meta.path === postSlug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | ${siteConfig.name}`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: absoluteUrl(`/blog/${postSlug}`),
      images: [
        {
          url: post.image || "",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image || ""],
      creator: "@ruixen_ui",
    },
    alternates: {
      canonical: absoluteUrl(`/blog/${postSlug}`),
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const postSlug = Array.isArray(slug) ? slug[0] : slug;
  const currentIndex = allBlogs.findIndex(
    (post) => post._meta.path === postSlug,
  );
  const post = allBlogs[currentIndex];

  if (!post) {
    notFound();
  }

  // Initialize with empty headings array - they will be populated after render
  const headings: string[] = [];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.publishedOn,
    url: `https://ruixen.com/blog/${postSlug}`,
    author: {
      "@type": "Person",
      name: post.author || "Sri Somanaath",
    },
    publisher: {
      "@type": "Organization",
      name: "Ruixen UI",
      url: "https://ruixen.com",
      logo: {
        "@type": "ImageObject",
        url: "https://ruixen.com/favicon.ico",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ruixen.com/blog/${postSlug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Blog",
        item: "https://ruixen.com/blog",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: post.title,
        item: `https://ruixen.com/blog/${postSlug}`,
      },
    ],
  };

  return (
    <div className="mx-auto mt-5 max-w-6xl px-5 xl:px-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="mb-4">
        <Link
          href="/blog"
          className="flex h-8 w-fit items-center justify-center rounded-full border border-border bg-muted px-4 text-sm text-secondary-foreground"
        >
          <ArrowLeftIcon className="mr-2 size-4" />
          Back to Blog
        </Link>
      </div>
      <article className="mx-auto mt-5 max-w-6xl rounded-xl border border-border">
        <div>
          <div className="relative overflow-hidden rounded-xl p-5 md:p-10">
            <BlogThumbnail
              title={post.title}
              tag={post.tag}
              className="aspect-[16/9] rounded-xl"
              animated
            />
          </div>
          <div className="mx-auto flex flex-col items-center justify-center gap-y-2 border-y border-border p-5">
            <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-y-2">
              <h1 className="text-balance text-center text-3xl font-semibold tracking-tighter md:text-5xl">
                {post.title}
              </h1>
              <p className="text-balance text-center text-secondary-foreground md:text-lg">
                {post.description}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-x-2 border-b border-border p-3 text-sm text-secondary-foreground">
            <span>{getReadingTime(post.body.raw)} min read</span>
            {post.tag && (
              <>
                <span>·</span>
                <span className="rounded-full border border-border bg-primary/5 px-2.5 py-0.5">
                  {post.tag}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-1 lg:grid-cols-7">
          <div className="article-content col-span-5 border-border p-5 lg:border-r lg:p-10">
            <MDXContent code={post.body.code} components={components} />
          </div>
          <div className="sticky top-16 col-span-2 hidden h-fit w-full flex-col items-start justify-start p-5 text-primary lg:flex ">
            <BlogTableOfContents headings={headings} />
            <div className="mt-10 w-full">
              <SidebarCTA />
            </div>
          </div>
        </div>
      </article>
      <MoreArticles currentPost={post} />
    </div>
  );
}
