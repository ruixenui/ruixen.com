import {
  GitPullRequest,
  LineChart,
  ShieldCheck,
  Sparkles,
  Timer,
  Users,
} from "lucide-react";
import {
  CustomerStoryStack,
  type CustomerStoryCase,
} from "@/registry/ruixenui/customer-story-stack";

const LOGO_CLS =
  "h-7 w-auto [filter:brightness(0)] dark:[filter:brightness(0)_invert(1)] opacity-90";

const cases: CustomerStoryCase[] = [
  {
    id: "bitbucket",
    logo: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/logos/bitbucket.svg" alt="Bitbucket" className={LOGO_CLS} />
    ),
    quote:
      "Our pull-request templates and CI pipelines were duct-taped together for years. Migrating to a unified component system finally let us clear the review queue in days, not weeks.",
    author: {
      name: "Sasha Lee",
      role: "Platform Engineer, Bitbucket",
      avatarUrl: "/avatar-images/avatar-04.jpg",
    },
    metrics: [
      {
        icon: <GitPullRequest />,
        label: "60% faster PR review cycles, every week",
      },
      {
        icon: <Timer />,
        label: "Eight repos onboarded in the first month",
      },
    ],
  },
  {
    id: "gumroad",
    logo: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/logos/gumroad.svg" alt="Gumroad" className={LOGO_CLS} />
    ),
    quote:
      "Creators kept asking why checkout looked different from the dashboard. One library and a weekend later, every surface ships from the same primitives — and the same accessibility floor.",
    author: {
      name: "Mateo Alvarez",
      role: "Senior Designer, Gumroad",
      avatarUrl: "/avatar-images/avatar-05.jpg",
    },
    metrics: [
      {
        icon: <Users />,
        label: "12K creators migrated with zero broken links",
      },
      {
        icon: <ShieldCheck />,
        label: "Nine quarters without an a11y regression",
      },
    ],
  },
  {
    id: "gong",
    logo: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/logos/gong.svg" alt="Gong" className={LOGO_CLS} />
    ),
    quote:
      "The cost of bespoke UI compounded — every team rebuilt their own tables, toasts and modals. We retired thousands of lines of legacy CSS and the designers got their afternoons back.",
    author: {
      name: "Jordan Reyes",
      role: "Engineering Manager, Gong",
      avatarUrl: "/avatar-images/avatar-02.jpg",
    },
    metrics: [
      {
        icon: <Sparkles />,
        label: "3× faster refactors across the platform",
      },
      {
        icon: <LineChart />,
        label: "94% of teams ship the same primitives",
      },
    ],
  },
];

export default function CustomerStoryStackDemo() {
  return (
    <CustomerStoryStack
      cases={cases}
      readMoreLink={{ label: "Read more customer stories", href: "#" }}
    />
  );
}
