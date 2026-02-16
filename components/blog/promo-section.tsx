import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Github, StarIcon } from "lucide-react";
import Link from "next/link";

// Server Component - fetches GitHub stars server-side
export default async function PromoSection() {
  let stars = 300; // Default value

  try {
    const response = await fetch(
      "https://api.github.com/repos/ruixenui/ruixen.com",
      {
        headers: process.env.GITHUB_OAUTH_TOKEN
          ? {
              Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
              "Content-Type": "application/json",
            }
          : {},
        next: {
          revalidate: 3600,
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      stars = data.watchers || stars;
    }
  } catch (error) {
    console.error("Error fetching GitHub stars:", error);
  }

  // Format stars number (1.5k, 2.3k, etc.)
  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num.toString();
  };

  return (
    <section
      className="w-full max-w-4xl mx-auto my-10 p-6 rounded-xl bg-indigo-600 text-white flex flex-col items-center gap-4 text-center"
      aria-label="Ruixen UI Components and Blogs"
    >
      <h2 className="text-xl md:text-2xl font-semibold leading-tight">
        Explore 350+ free components and website templates
      </h2>

      <p className="text-base md:text-md max-w-xl">
        Browse beautifully designed React components, Tailwind CSS sections, and
        blog templates. Preview the website or explore the code on GitHub.
      </p>

      <div className="flex flex-col w-full gap-3 mt-4">
        <Button variant="default" asChild className="flex-1 justify-around">
          <Link href="https://ruixen.com" rel="noopener noreferrer">
            Website Preview
            <ArrowRightIcon className="ml-2 size-4" />
          </Link>
        </Button>

        <Link
          href="https://github.com/ruixenui/ruixen.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Star Ruixen UI on GitHub"
          className="flex-1"
        >
          <Button
            variant="outline"
            className="w-full justify-around gap-2 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center">
                <Github className="w-6 h-6" />
              </div>

              <span>Star on GitHub</span>

              <StarIcon className="w-5 h-5 text-yellow-400" />

              <span className="font-semibold tabular-nums">
                {formatNumber(stars)}
              </span>
            </div>
          </Button>
        </Link>
      </div>
    </section>
  );
}
