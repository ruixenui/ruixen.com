import {
  ScrollPortraitWall,
  type Speaker,
} from "@/registry/ruixenui/scroll-portrait-wall";

// 5 avatars on the CDN, cycled across the speakers.
const speakers: Speaker[] = [
  { name: "Naomi Adeyemi", role: "Keynote · Design Systems" },
  { name: "Hugo Marchetti", role: "Principal Engineer, Vercel" },
  { name: "Priya Nair", role: "Head of AI, Loomstack" },
  { name: "Sebastian Cole", role: "Creative Director" },
  { name: "Mei-Ling Zhao", role: "Staff Designer, Linear" },
  { name: "Idris Calloway", role: "Founder, Northwind" },
  { name: "Clara Boström", role: "VP Product, Figma" },
  { name: "Rafael Ortega", role: "Motion Lead" },
  { name: "Hannah Whitfield", role: "DX Engineer, Stripe" },
  { name: "Yusuf Demir", role: "Research, DeepMind" },
].map((s, i) => ({
  ...s,
  src: `https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/avatar-images/avatar-${String((i % 5) + 1).padStart(2, "0")}.jpg`,
}));

export default function ScrollPortraitWallDemo() {
  return (
    <ScrollPortraitWall
      title="The Lineup"
      hint="scroll to meet the lineup"
      date="Sep 18, 2026"
      speakers={speakers}
      showCaptions={false}
    />
  );
}
