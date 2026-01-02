import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Supporters - Ruixen UI",
  description: "Thank you to all our GitHub stargazers who support Ruixen UI",
};

interface Stargazer {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  type: string;
}

async function getStargazers(): Promise<Stargazer[]> {
  try {
    const allStargazers: Stargazer[] = [];
    let page = 1;
    const perPage = 1000; // GitHub API max per page (default is 30)

    // Fetch all pages of stargazers to handle pagination
    while (true) {
      const response = await fetch(
        `https://api.github.com/repos/ruixenui/ruixen.com/stargazers?per_page=${perPage}&page=${page}`,
        {
          headers: process.env.GITHUB_OAUTH_TOKEN
            ? {
                Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
                "Content-Type": "application/json",
              }
            : {},
          next: {
            revalidate: 3600, // Revalidate every hour
          },
        },
      );

      if (!response.ok) {
        break;
      }

      const data: Stargazer[] = await response.json();

      if (data.length === 0) {
        break; // No more stargazers
      }

      allStargazers.push(...data);

      // If we got less than perPage, we've reached the last page
      if (data.length < perPage) {
        break;
      }

      page++;
    }

    return allStargazers;
  } catch (error) {
    console.error("Error fetching stargazers:", error);
    return [];
  }
}

export default async function SupportersPage() {
  const stargazers = await getStargazers();

  return (
    <div className="container max-w-6xl py-12 md:py-16 lg:py-20">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">
          Our Supporters
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-6">
          Heartfelt thanks to all {stargazers.length} amazing people who starred
          Ruixen UI on GitHub
        </p>

        {/* Call to action */}
        <div className="mt-4 p-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 max-w-xl">
          <p className="text-sm text-muted-foreground mb-4">
            Want to see your avatar here? Star us on GitHub and join our
            community of supporters!
          </p>
          <Link
            href="https://github.com/ruixenui/ruixen.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <svg className="size-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Star on GitHub
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        {stargazers.map((stargazer) => (
          <Link
            key={stargazer.id}
            href={stargazer.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative hover:z-10"
            title={stargazer.login}
          >
            <div className="relative size-12 md:size-14 lg:size-16 rounded-full overflow-hidden ring-2 ring-border transition-all duration-200 hover:ring-4 hover:ring-primary hover:scale-110">
              <Image
                src={stargazer.avatar_url}
                alt={`${stargazer.login}'s avatar`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 48px, (max-width: 1024px) 56px, 64px"
              />
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 pointer-events-none">
              <span className="text-xs font-medium bg-popover text-popover-foreground px-2 py-1 rounded-md shadow-md border">
                {stargazer.login}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {stargazers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No stargazers found. Please try again later.
          </p>
        </div>
      )}
    </div>
  );
}
