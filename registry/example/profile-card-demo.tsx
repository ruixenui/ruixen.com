"use client";

import { ProfileCard } from "@/registry/ruixenui/profile-card";

export default function ProfileCardDemo() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 w-full sm:justify-center py-8">
      {/* Full variant */}
      <div className="flex flex-col items-center gap-3 w-[280px] max-w-full">
        <ProfileCard
          variant="full"
          image="/profile-card.jpg"
          name="Mia Tanaka"
          bio="Visual storyteller blending minimalism with bold aesthetics."
          followers={1847}
          posts={124}
        />
        <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-600 tracking-wide">
          variant=&quot;full&quot;
        </span>
      </div>

      {/* Half variant */}
      <div className="flex flex-col items-center gap-3 w-[280px] max-w-full">
        <ProfileCard
          variant="half"
          image="/profile-card.jpg"
          name="Mia Tanaka"
          bio="Visual storyteller blending minimalism with bold aesthetics."
          followers={1847}
          posts={124}
        />
        <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-600 tracking-wide">
          variant=&quot;half&quot;
        </span>
      </div>
    </div>
  );
}
