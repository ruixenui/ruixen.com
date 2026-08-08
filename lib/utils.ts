import { siteConfig } from "@/config/site";
import clsx, { ClassValue } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function humanize(name: string): string {
  return name
    .replace(/-/g, " ")
    .replace(/([A-Z])/g, " $1")
    .trim()
    .split(/\s+/)
    .map((word) => word[0].toUpperCase() + word.substring(1).toLowerCase())
    .join(" ");
}

export const truncate = (str: string | null, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length - 3)}...`;
};

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

/**
 * Capitalizes first letters of words in string.
 * @param {string} str String to be modified
 * @param {boolean=false} lower Whether all other letters should be lowercased
 * @return {string}
 * @see https://stackoverflow.com/questions/2332811/capitalize-words-in-string/7592235#7592235
 * @usage
 *   capitalize('fix this string');     // -> 'Fix This String'
 *   capitalize('javaSCrIPT');          // -> 'JavaSCrIPT'
 *   capitalize('javaSCrIPT', true);    // -> 'Javascript'
 */
export const capitalize = (str: string, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase(),
  );

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// Every caller of this is building a PUBLIC absolute URL — canonical tags,
// og:url, JSON-LD @id, sitemap entries. Those must always be the live origin,
// never whatever the build box had in NEXT_PUBLIC_APP_URL. That env var is
// `http://localhost:3000` in .env for local dev, and because the same file is
// used on the VPS the production build shipped ~209 docs pages + every blog
// post canonicalising to http://localhost:3000 — invisible to Google.
// siteConfig.url is a constant, so a missing/wrong build env can't break SEO.
export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path}`;
}

export function constructMetadata({
  title = "Ruixen UI - Modern React + Tailwind CSS components & Templates",
  description = "Ruixen UI is a curated collection of the best landing page components built using React + Tailwind CSS + Motion",
  image = absoluteUrl("/og"),
  ...props
}: {
  title?: string;
  description?: string;
  image?: string;
  [key: string]: Metadata[keyof Metadata];
}): Metadata {
  return {
    title,
    description,
    keywords: [
      "React",
      "Tailwind CSS",
      "Motion",
      "Landing Page",
      "Components",
      "Next.js",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@ruixen_ui",
    },
    icons: "/favicon.ico",
    metadataBase: new URL("https://ruixen.com"),
    authors: [
      {
        name: "Srinath",
        url: "https://twitter.com/ruixen_ui",
      },
    ],
    creator: "Ruixen UI",
    ...props,
  };
}
