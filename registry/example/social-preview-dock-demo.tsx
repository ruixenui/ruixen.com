import { SocialPreviewDock } from "@/registry/ruixenui/social-preview-dock";

export default function SocialPreviewDockDemo() {
  return (
    <div className="flex min-h-[480px] w-full items-end justify-center px-6 pb-16">
      <SocialPreviewDock
        email="govindalapudisrinath@gmail.com"
        profile={{
          username: "SriSomanaath",
          xHandle: "SriNath693",
          name: "Sri Somanaath",
          headline: "AI Software Engineer",
          location: "Bengaluru, India",
          bio: "Engineer",
          links: {
            github: "https://github.com/SriSomanaath",
            linkedin: "https://www.linkedin.com/in/srisomanaath-g693/",
            x: "https://x.com/SriNath693",
          },
        }}
        /* Art direction per card. Leave this off and the banners run on theme
           tokens instead, following whatever palette the site is using. */
        bannerColors={{
          linkedin: ["#e0f2fe", "#7dd3fc", "#3b82f6", "#1d4ed8"],
          x: ["#fde68a", "#fbbf24", "#fb923c", "#fb7185"],
        }}
      />
    </div>
  );
}
