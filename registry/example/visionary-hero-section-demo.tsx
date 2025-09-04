"use client";

import VisionaryHeroSection from "@/registry/ruixenui/visionary-hero-section";

export default function DemoPage() {
  return (
    <VisionaryHeroSection
      title="Build Stunning Web Experiences"
      description="Empower your team with design systems that accelerate development and inspire creativity."
      buttons={[
        { label: "Get Started", href: "/start", variant: "default" },
        { label: "Book a Demo", href: "/demo", variant: "gradient" },
      ]}
      images={[
        {
          src: "https://tailark.com/_next/image?url=%2Fmail2.png&w=3840&q=75",
          alt: "App screen dark",
          dark: true,
        },
        {
          src: "https://tailark.com/_next/image?url=%2Fmail2-light.png&w=3840&q=75",
          alt: "App screen light",
          dark: false,
        },
      ]}
      brands={[
        { name: "loops", logo: "https://assets.rapidui.dev/brands/loops.svg" },
        { name: "pwc", logo: "https://assets.rapidui.dev/brands/pwc.svg" },
        {
          name: "resend",
          logo: "https://assets.rapidui.dev/brands/resend.svg",
        },
        { name: "udio", logo: "https://assets.rapidui.dev/brands/udio.svg" },
        { name: "krea", logo: "https://assets.rapidui.dev/brands/krea.svg" },
        {
          name: "gopuff",
          logo: "https://assets.rapidui.dev/brands/gopuff.svg",
        },
      ]}
    />
  );
}
