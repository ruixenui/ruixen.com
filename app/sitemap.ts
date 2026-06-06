import { allBlogs, allDocs, allPages } from "content-collections";
import type { MetadataRoute } from "next";
import { headers } from "next/headers";

import { allUseCasePaths } from "@/lib/use-case-content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const domain = headersList.get("host") as string;
  const protocol = "https";

  return [
    {
      url: `${protocol}://${domain}`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${protocol}://${domain}/pricing`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${protocol}://${domain}/templates`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${protocol}://${domain}/tailwind-v3-shadcn`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${protocol}://${domain}/base-ui-shadcn`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${protocol}://${domain}/tools/tw-v3-to-v4`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${protocol}://${domain}/tools/theme-generator`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${protocol}://${domain}/generator/glass-morphism`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${protocol}://${domain}/generator/css-generator`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${protocol}://${domain}/generator/shadow-generator`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${protocol}://${domain}/gradients`,
      lastModified: new Date(),
      priority: 0.8,
    },
    ...allUseCasePaths().map(({ type, useCase }) => ({
      url: `${protocol}://${domain}/sections/${type}/${useCase}`,
      lastModified: new Date(),
      priority: 0.7,
    })),
    ...allPages.map((post) => ({
      url: `${protocol}://${domain}/${post.slugAsParams}`,
      lastModified: new Date(),
    })),
    ...allDocs.map((post) => ({
      url: `${protocol}://${domain}/docs/${post.slugAsParams}`,
      lastModified: post.date,
    })),
    ...allBlogs.map((post) => ({
      url: `${protocol}://${domain}/blog/${post.slugAsParams}`,
      lastModified: post.publishedOn,
    })),
  ];
}
