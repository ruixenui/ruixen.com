"use client";

import { motion } from "motion/react";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/* ─── Testimonial data ─── */

type Testimonial = {
  name: string;
  handle: string;
  avatar: string;
  avatarUrl?: string;
  text: string;
  tweetUrl?: string;
};

const testimonials: Testimonial[] = [
  {
    name: "xymox",
    handle: "@clxymox",
    avatar: "x",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/458868924876984320/lgte0MOh_normal.jpeg",
    text: "ruixen.com\n⭐ 84 stars\n\nDécouvrez ce projet GitHub intéressant !\n#GitHub",
    tweetUrl: "https://x.com/clxymox/status/2012959714628239712",
  },
  {
    name: "Geek Lite",
    handle: "@QingQ77",
    avatar: "G",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/2004028412730789892/4IFUGOl2_normal.jpg",
    text: "170+ 免费 SHADCN 组件，完全开源。\n\nRuixen UI 组件库界的隐藏宝石，一个现代、灵活、可定制的 React UI 组件库，主打弹簧物理动画和触觉反馈，让网页组件动起来像真实物体。",
    tweetUrl: "https://x.com/QingQ77/status/2024805732055392349",
  },
  {
    name: "jaime",
    handle: "@jaimesolis",
    avatar: "j",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/2016705443394179073/qy6mbrsL_normal.png",
    text: "弹簧动画加触觉反馈这套组合，shadcn生态里确实没几个在做。170+组件免费开源，对比付费ui库划得来。",
    tweetUrl: "https://x.com/jaimesolis/status/2024806728081027132",
  },
  {
    name: "Sandeep",
    handle: "@sandeep_v1404",
    avatar: "S",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1825276966594854912/8Ganmx0p_normal.jpg",
    text: "@ruixen_ui stands out because it feels built with intention, not just styled to look good.",
    tweetUrl: "https://x.com/sandeep_v1404/status/2025562023577457147",
  },
  {
    name: "Simon 何思敏",
    handle: "@HoSieMun",
    avatar: "S",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1966488654089797632/SeN8cXwv_normal.jpg",
    text: "That looks like a fantastic find! The Rising Glow component from Ruixen UI is perfect for adding a high-end feel.",
    tweetUrl: "https://x.com/HoSieMun/status/2008883470991544746",
  },
  {
    name: "Kukil Kashyap Borgohain",
    handle: "@kukil_knp2",
    avatar: "K",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1188858900646248448/l-nitStL_normal.jpg",
    text: "Just checked the site… this is way bigger than I expected.",
    tweetUrl: "https://x.com/kukil_knp2/status/1996562163763401042",
  },
  {
    name: "Rich Manyorock",
    handle: "@Richmanyorock",
    avatar: "R",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/2011465800516030464/T4JLl3t7_normal.jpg",
    text: "This UI looks clean",
    tweetUrl: "https://x.com/Richmanyorock/status/2008537569353757053",
  },
  {
    name: "Mr. Block_0x",
    handle: "@sagaranand1212",
    avatar: "M",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/2036889604213927936/wcibMcIG_normal.jpg",
    text: "Custom colors + particle count\nBuilt for real UI, not demos",
    tweetUrl: "https://x.com/sagaranand1212/status/2008880756781887918",
  },
  {
    name: "Blessing Ella",
    handle: "@blessing_e59788",
    avatar: "B",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1885706037308628993/OjAqr4SF_normal.jpg",
    text: "Clean",
    tweetUrl: "https://x.com/blessing_e59788/status/2008545028202000814",
  },
  {
    name: "na",
    handle: "@pomufgd",
    avatar: "n",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/2013567617651425281/YnlJLJUU_normal.jpg",
    text: "アクセシビリティを重視した、UIライブラリかあ\nあとで試したい",
    tweetUrl: "https://x.com/pomufgd/status/1973951406102159742",
  },
  {
    name: "Byron Jacobs",
    handle: "@byronpixel",
    avatar: "B",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/2009873016377757696/OU5pg0vH_normal.jpg",
    text: "These look incredibly clean and well-considered. The focus on real layouts and clear hierarchy is exactly what developers need. Great work on the open-source release.",
    tweetUrl: "https://x.com/byronpixel/status/2011205376746872871",
  },
  {
    name: "Rahul Krishna",
    handle: "@RahulKrishnaa28",
    avatar: "R",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/2008606249030721536/2S1LpGJa_normal.jpg",
    text: "You can tell the components are well thought out, not just designed to look good but to actually be useful in production.",
  },
];

/* ─── Layout: which cells are testimonials vs empty ─── */

// 4 columns × varying rows.  `null` = empty "+" card, number = testimonial index
const columns: (number | null)[][] = [
  [0, 4, 8, null],
  [1, 5, 9, null],
  [null, 2, 6, 10],
  [3, 7, 11, null],
];

/* ─── Twitter share intent ─── */

const TWITTER_SHARE_TEXT = encodeURIComponent(
  "I tried @ruixen_ui and [share what you built or liked] — check it out at ruixen.com",
);
const TWITTER_INTENT_URL = `https://twitter.com/intent/tweet?text=${TWITTER_SHARE_TEXT}`;

/* ─── X logo (inline SVG to avoid dependency) ─── */

function XLogo({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ─── Card Components ─── */

function TestimonialCard({ t }: { t: Testimonial }) {
  const xIcon = (
    <XLogo className="h-4 w-4 shrink-0 text-muted-foreground/50 transition-colors group-hover/xlink:text-foreground/70" />
  );

  return (
    <div className="rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur-sm">
      {/* Header */}
      <div className="mb-3 flex items-center gap-3">
        {t.avatarUrl ? (
          <Image
            src={t.avatarUrl}
            alt={t.name}
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full object-cover"
            unoptimized
          />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
            {t.avatar}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-semibold text-foreground">
              {t.name}
            </span>
            {t.tweetUrl && (
              <svg
                className="h-4 w-4 shrink-0 text-blue-500"
                viewBox="0 0 22 22"
                fill="currentColor"
              >
                <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.855-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.636.433 1.221.878 1.69.47.446 1.055.752 1.69.883.635.13 1.294.083 1.902-.143.271.586.702 1.084 1.24 1.438.54.354 1.167.551 1.813.568.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.225 1.261.272 1.894.14.634-.131 1.218-.437 1.69-.882.445-.47.749-1.055.878-1.69.13-.634.075-1.294-.148-1.9.586-.272 1.084-.702 1.438-1.241.354-.54.551-1.169.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
              </svg>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{t.handle}</p>
        </div>
        {t.tweetUrl ? (
          <Link
            href={t.tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/xlink"
          >
            {xIcon}
          </Link>
        ) : (
          xIcon
        )}
      </div>
      {/* Body */}
      <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/80">
        {t.text}
      </p>
    </div>
  );
}

function EmptyCard() {
  return (
    <Link
      href={TWITTER_INTENT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-28 items-center justify-center rounded-2xl border border-dashed border-border/40 transition-colors duration-200 hover:border-foreground/20 hover:bg-muted/30"
    >
      <Plus className="h-6 w-6 text-muted-foreground/30 transition-colors duration-200 group-hover:text-foreground/40" />
    </Link>
  );
}

/* ─── Main Component ─── */

export default function WallOfLove() {
  return (
    <section className="w-full bg-background py-24 px-4 sm:px-6 md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Wall of{" "}
            <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent">
              Love
            </span>
          </h2>
          <p className="mt-3 text-muted-foreground text-base md:text-lg">
            Here&apos;s what people are saying about Ruixen UI.
          </p>
        </motion.div>

        {/* Masonry grid — 4 columns on lg, 3 on md, 2 on sm, 1 on xs */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4">
              {col.map((cell, rowIdx) => (
                <motion.div
                  key={`${colIdx}-${rowIdx}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.35,
                    delay: colIdx * 0.06 + rowIdx * 0.04,
                  }}
                >
                  {cell !== null ? (
                    <TestimonialCard t={testimonials[cell]!} />
                  ) : (
                    <EmptyCard />
                  )}
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
