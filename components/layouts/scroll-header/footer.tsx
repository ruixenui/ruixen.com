import Link from "next/link";
import { Button } from "@/components/ui/button";

const footerLinks = [
  { label: "Next.js", href: "https://nextjs.org/" },
  { label: "Tailwind CSS", href: "https://tailwindcss.com/" },
  { label: "Shadcn/ui", href: "https://ui.shadcn.com/" },
  { label: "Motion", href: "https://motion.dev/" },
];

export function ScrollHeaderFooter() {
  return (
    <footer className="flex flex-col items-center gap-6 border-t border-border py-6">
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Scroll-aware navigation with fluid tab transitions. ✨
      </p>
      <ul className="flex items-center justify-center">
        {footerLinks.map((link) => (
          <li key={link.href}>
            <Button
              variant="link"
              asChild
              className="scroll-m-20 text-xl font-semibold tracking-tight"
            >
              <Link target="_blank" href={link.href}>
                {link.label}
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </footer>
  );
}
