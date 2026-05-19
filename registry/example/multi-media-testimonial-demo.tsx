import {
  MultiMediaTestimonial,
  type Testimonial,
} from "@/registry/ruixenui/multi-media-testimonial";

const VIDEOS = [
  "/testimonial-dummy-videos/From KlickPin CF Fresh bathroom storage solutions that look expensive while staying practical realistic and beginner friendly for anyone planning a beautiful - Pin-221802350393240411.mp4",
  "/testimonial-dummy-videos/From KlickPin CF Love these clever engagement party ideas you’ll want to recreate this weekend that balance trend comfort and everyday function — bookmark this - Pin-633387443746645.mp4",
  "/testimonial-dummy-videos/From KlickPin CF Prayerful worship room inspiration with charm and useful ideas on a budget for peaceful hearts 🙏 - Pin-1090715603511964319.mp4",
  "/testimonial-dummy-videos/From KlickPin CF Try Smart self-care Sunday ideas that are trending right now across Pinterest boards with simple details that elevate the final look - Pin-234679830576801496.mp4",
].map(encodeURI);

const testimonials: Testimonial[] = [
  {
    name: "Priya Raman",
    profile: "/avatar-images/avatar-01.jpg",
    title: "Replaced our in-house UI in a weekend",
    designation: "Engineering Lead, Coinflect",
    content:
      "We had a stale Tailwind kit nobody wanted to touch. Two engineers swapped it out in a single sprint with zero design QA pushback.",
    mediaUrl: VIDEOS[0],
  },
  {
    name: "Daniel Park",
    profile: "/avatar-images/avatar-02.jpg",
    title: "Themeable from day one",
    designation: "Product Manager, Ternary",
    content:
      "The shadcn token surface meant our brand palette landed everywhere without a single override.",
  },
  {
    name: "Elena Voss",
    profile: "/avatar-images/avatar-03.jpg",
    title: "The audit team had nothing to flag",
    designation: "Head of Design Engineering, Percy",
    content:
      "Visual regressions used to surface every release. Tokenized components mean our diffs only flag actual change — not theme drift.",
  },
  {
    name: "Mateo Rivera",
    profile: "/avatar-images/avatar-04.jpg",
    title: "Onboarding cut from a week to a day",
    designation: "Staff Engineer, Hexline",
    content:
      "New hires used to bounce off our forms. Now they ship usable screens on day one.",
    mediaUrl: VIDEOS[1],
  },
  {
    name: "Sana Iqbal",
    profile: "/avatar-images/avatar-05.jpg",
    title: "Better than our paid kit",
    designation: "Senior Frontend, Quanta",
    content:
      "We were paying for a closed-source library that shipped half-broken. Ruixen replaced it without anyone noticing — except billing.",
  },
  {
    name: "Tomás Becker",
    profile: "/avatar-images/avatar-01.jpg",
    title: "The component variety is unreal",
    designation: "Founding Engineer, Loomstack",
    content:
      "Hero sections, pricing tables, dashboards — every block I needed for our marketing site was already in the registry.",
    thumbnail: "/testimonial-images/testimonial-02.webp",
  },
  {
    name: "Hannah Liu",
    profile: "/avatar-images/avatar-02.jpg",
    title: "A11y wasn't an afterthought",
    designation: "Accessibility Lead, Northway",
    content:
      "Keyboard focus, ARIA states, contrast — all dialed in before we even touched it. Saved us a full audit pass.",
  },
  {
    name: "Karim El-Hadid",
    profile: "/avatar-images/avatar-03.jpg",
    title: "Dark mode that doesn't look broken",
    designation: "Design Engineer, Phaserail",
    content:
      "Most kits give you a dark mode by inverting backgrounds and praying. This one actually thought about contrast and depth.",
    mediaUrl: VIDEOS[2],
  },
  {
    name: "Riya Menon",
    profile: "/avatar-images/avatar-04.jpg",
    title: "Drop-in. Literally drop-in.",
    designation: "Indie Hacker",
    content:
      "Pasted the install command, restarted dev, my landing page was 60% done.",
  },
  {
    name: "Lior Stern",
    profile: "/avatar-images/avatar-05.jpg",
    title: "Spring physics actually feel right",
    designation: "Senior UI Engineer, Folium",
    content:
      "I've seen a lot of motion kits try to ship 'organic' easing. This one nails the weight and recovery without you tuning anything.",
  },
  {
    name: "Yuki Tanaka",
    profile: "/avatar-images/avatar-01.jpg",
    title: "Cleanest registry I've shipped against",
    designation: "Tech Lead, Akari Labs",
    content:
      "Versioned JSON, predictable file targets, no vendored deps. CI loves it.",
    mediaUrl: VIDEOS[3],
  },
  {
    name: "Asha Brennan",
    profile: "/avatar-images/avatar-02.jpg",
    title: "TypeScript types just work",
    designation: "Engineering Manager, Edgewell",
    content:
      "Strict mode on, zero `any` leaks. The component props are exactly what you'd guess from reading the JSX.",
  },
  {
    name: "Avani Sharma",
    profile: "/avatar-images/avatar-03.jpg",
    title: "Saved a Friday I'd written off",
    designation: "Senior Engineer, Lattice",
    content: "Two hours from `npx shadcn add` to a dashboard I'd ship.",
  },
  {
    name: "Jakob Lindqvist",
    profile: "/avatar-images/avatar-04.jpg",
    title: "First kit I haven't wanted to rip out",
    designation: "Solo Founder, Helva",
    content:
      "Every other library I've shipped against had something I needed to override on day three. This one I trust.",
  },
  {
    name: "Mei Watanabe",
    profile: "/avatar-images/avatar-05.jpg",
    title: "Opinionated in the right places",
    designation: "Design Lead, Northsail",
    content: "The defaults stop me from making bad calls. That's the value.",
  },
  {
    name: "Noah Bergman",
    profile: "/avatar-images/avatar-01.jpg",
    title: "Cut my CSS in half",
    designation: "Frontend Architect, Vellum",
    content:
      "Half my Tailwind utility soup vanished after one PR. The reviewer thought I'd run a minifier.",
  },
  {
    name: "Aditi Kulkarni",
    profile: "/avatar-images/avatar-02.jpg",
    title: "Lighthouse went up because I deleted code",
    designation: "Engineering Manager, Pylon",
    content: "Less JS shipped, fewer images optimised badly. CLS dropped to 0.",
  },
  {
    name: "Felix Achterberg",
    profile: "/avatar-images/avatar-03.jpg",
    title: "Themes don't fight Tailwind",
    designation: "Product Engineer, Bramble",
    content: "Tokens through CSS vars, utilities on top. The two stop arguing.",
  },
  {
    name: "Ines Ribeiro",
    profile: "/avatar-images/avatar-04.jpg",
    title: "The empty states alone",
    designation: "Staff Designer, Cumulus",
    content: "Worth the swap for those alone. Everything else is a bonus.",
  },
  {
    name: "Tom Ó Briain",
    profile: "/avatar-images/avatar-05.jpg",
    title: "PR diffs are readable again",
    designation: "Tech Lead, Aurix",
    content: "That's the whole pitch. Anything else is gravy.",
  },
];

export default function MultiMediaTestimonialDemo() {
  return (
    <MultiMediaTestimonial
      eyebrow="Wall of love"
      heading={
        <>
          Engineers love
          <br />
          shipping with Ruixen
        </>
      }
      description="Our clients keep coming back because we go beyond clean design to deliver real results."
      items={testimonials}
    />
  );
}
