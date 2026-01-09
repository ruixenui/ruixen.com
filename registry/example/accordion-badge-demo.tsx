import AccordionBadge from "@/registry/ruixenui/accordion-badge";

const items = [
  {
    id: "1",
    title: "New Feature: Dark Mode",
    badge: "New",
    badgeVariant: "default" as const,
    content:
      "We've added a beautiful dark mode that automatically syncs with your system preferences. Toggle it anytime in settings.",
  },
  {
    id: "2",
    title: "API Rate Limits",
    badge: "Important",
    badgeVariant: "destructive" as const,
    content:
      "Free tier users are limited to 100 API calls per minute. Upgrade to pro for unlimited access.",
  },
  {
    id: "3",
    title: "Mobile App",
    badge: "Beta",
    badgeVariant: "secondary" as const,
    content:
      "Our mobile app is now in beta testing. Join the beta program to get early access and provide feedback.",
  },
];

export default function AccordionBadgeDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AccordionBadge items={items} defaultValue="1" />
      </div>
    </div>
  );
}
