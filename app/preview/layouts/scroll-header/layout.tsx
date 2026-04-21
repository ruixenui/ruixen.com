import type { Metadata } from "next";
import { ScrollHeader } from "@/components/layouts/scroll-header/scroll-header";

export const metadata: Metadata = {
  title: "Animated Header — Ruixen Layouts",
  description:
    "A scroll-aware header with fluid animated tab transitions. Inspired by modern product-site navigation patterns.",
};

export default function ScrollHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollHeader />
      {children}
    </>
  );
}
