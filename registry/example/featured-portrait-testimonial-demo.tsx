import {
  Activity,
  CircleDashed,
  ClipboardList,
  GitBranch,
  Layers,
  Sparkles,
  TrendingUp,
  Workflow,
  Zap,
} from "lucide-react";
import {
  FeaturedPortraitTestimonial,
  type FeaturedPortraitItem,
} from "@/registry/ruixenui/featured-portrait-testimonial";

const items: FeaturedPortraitItem[] = [
  {
    id: "sahil",
    quote:
      "Ruixen is the first component library that feels truly modern. It's powerful, flexible, and fast to build with. There's nothing like it.",
    author: {
      name: "Sahil Mansuri",
      role: "CEO & Head of Finance",
      avatarUrl: "/avatar-images/avatar-04.jpg",
    },
    portraitUrl: "/avatar-images/avatar-04.jpg",
    portraitBgClassName: "bg-[hsl(245_55%_94%)] dark:bg-[hsl(245_30%_20%)]",
    company: {
      name: "Pipeliner",
      logo: <Workflow />,
    },
    favorites: [
      { icon: <Zap />, label: "Automation" },
      { icon: <ClipboardList />, label: "Productivity" },
      { icon: <GitBranch />, label: "Pipeline" },
    ],
  },
  {
    id: "odessa",
    quote:
      "We shipped a full marketing site and dashboard on Ruixen in two weeks. The primitives compose so well that we never reach for anything else.",
    author: {
      name: "Odessa Mira",
      role: "Head of Design",
      avatarUrl: "/avatar-images/avatar-01.jpg",
    },
    portraitUrl: "/avatar-images/avatar-01.jpg",
    portraitBgClassName: "bg-[hsl(205_70%_94%)] dark:bg-[hsl(205_40%_20%)]",
    company: {
      name: "Altria Group",
      logo: <Layers />,
    },
    favorites: [
      { icon: <Sparkles />, label: "Motion" },
      { icon: <Layers />, label: "Theme tokens" },
      { icon: <Activity />, label: "Realtime" },
    ],
  },
  {
    id: "staci",
    quote:
      "Our team replaced four UI libraries with Ruixen. Every surface — auth, billing, onboarding — finally feels like it was designed by the same hand.",
    author: {
      name: "Staci Okafor",
      role: "VP Engineering",
      avatarUrl: "/avatar-images/avatar-03.jpg",
    },
    portraitUrl: "/avatar-images/avatar-03.jpg",
    portraitBgClassName: "bg-[hsl(150_45%_92%)] dark:bg-[hsl(150_30%_18%)]",
    company: {
      name: "Campbell",
      logo: <CircleDashed />,
    },
    favorites: [
      { icon: <TrendingUp />, label: "Analytics" },
      { icon: <Workflow />, label: "Workflows" },
      { icon: <Activity />, label: "Reporting" },
    ],
  },
  {
    id: "ren",
    quote:
      "The motion details are what won us over. Subtle, intentional, never noisy — every interaction earns its place on screen.",
    author: {
      name: "Ren Takahashi",
      role: "Product Lead",
      avatarUrl: "/avatar-images/avatar-02.jpg",
    },
    portraitUrl: "/avatar-images/avatar-02.jpg",
    portraitBgClassName: "bg-[hsl(40_70%_94%)] dark:bg-[hsl(40_40%_18%)]",
    company: {
      name: "Linework",
      logo: <Sparkles />,
    },
    favorites: [
      { icon: <Zap />, label: "Speed" },
      { icon: <ClipboardList />, label: "Forms" },
      { icon: <GitBranch />, label: "Branching" },
    ],
  },
  {
    id: "amara",
    quote:
      "We get compliments on the dashboard every week now. Customers think we hired an agency — it's just Ruixen and a small product team.",
    author: {
      name: "Amara Sterling",
      role: "Director of Product",
      avatarUrl: "/avatar-images/avatar-05.jpg",
    },
    portraitUrl: "/avatar-images/avatar-05.jpg",
    portraitBgClassName: "bg-[hsl(320_50%_94%)] dark:bg-[hsl(320_30%_18%)]",
    company: {
      name: "Northpath",
      logo: <Activity />,
    },
    favorites: [
      { icon: <Layers />, label: "Components" },
      { icon: <Sparkles />, label: "Polish" },
      { icon: <TrendingUp />, label: "Conversion" },
    ],
  },
];

export default function FeaturedPortraitTestimonialDemo() {
  return (
    <FeaturedPortraitTestimonial
      eyebrow="Testimonials"
      heading="Their favorites feature"
      description="Leverage insights from your business, customer, and product data to drive and enhance your team's performance and success."
      items={items}
    />
  );
}
