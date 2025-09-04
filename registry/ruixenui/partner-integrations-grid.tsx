"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const integrations = [
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://cdn-icons-png.flaticon.com/512/174/174857.png", // LinkedIn
  "https://cdn-icons-png.flaticon.com/512/2111/2111615.png", // Slack
  "https://cdn-icons-png.flaticon.com/512/174/174872.png", // Spotify
  "https://cdn-icons-png.flaticon.com/512/733/733547.png", // Facebook
  "https://cdn-icons-png.flaticon.com/512/5968/5968381.png", // Stripe
  "https://cdn-icons-png.flaticon.com/512/174/174855.png", // Instagram
  "https://cdn-icons-png.flaticon.com/512/888/888853.png", // Dropbox
  "https://cdn-icons-png.flaticon.com/512/906/906324.png", // Jira
  "https://ruixen.com/ruixen_dark.png",
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  "https://cdn-icons-png.flaticon.com/512/5968/5968705.png", // Square
  "https://cdn-icons-png.flaticon.com/512/732/732218.png", // Shopify
  "https://cdn-icons-png.flaticon.com/512/5968/5968755.png", // Zapier
  "https://cdn-icons-png.flaticon.com/512/5968/5968520.png", // Google Drive
  "https://cdn-icons-png.flaticon.com/512/1384/1384060.png", // YouTube
  "https://cdn-icons-png.flaticon.com/512/5968/5968885.png", // Airtable
  "https://cdn-icons-png.flaticon.com/512/2111/2111370.png", // Discord
];

export default function PartnerIntegrationsGrid() {
  return (
    <section className="max-w-7xl mx-auto my-20 px-6 grid md:grid-cols-2 gap-10 items-center border border-gray-200 dark:border-gray-700 p-6 rounded-3xl">
      {/* Left Side */}
      <div>
        <p className="uppercase text-sm font-semibold text-gray-500 dark:text-gray-400">
          Components
        </p>
        <h2 className="text-7xl font-bold mt-2 mb-4">
          Supercharge your workflow
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Build sleek, responsive interfaces in record time with our carefully
          crafted React and Tailwind CSS components.
        </p>
        <div className="flex gap-4">
          <Button className="bg-black text-white px-5 py-2 rounded-lg font-medium">
            <Link href="https://ruixen.com/components" target="_blank">
              Browse Components
            </Link>
          </Button>
          <Button
            variant="outline"
            className="border border-gray-300 dark:border-gray-600 px-5 py-2 rounded-lg font-medium"
          >
            <Link href="https://ruixen.com" target="_blank">
              View Documentation →
            </Link>
          </Button>
        </div>
      </div>

      {/* Right Side */}
      <div className="grid grid-cols-6 gap-4">
        {integrations.map((url, idx) => (
          <div
            key={idx}
            className="relative w-16 h-16 p-2 bg-white dark:bg-gray-800 shadow-sm border-2 border-gray-200 dark:border-gray-700"
            style={{
              clipPath:
                "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
            }}
          >
            <Image
              src={url}
              alt={`integration-${idx}`}
              fill
              className="object-contain p-1.5"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
