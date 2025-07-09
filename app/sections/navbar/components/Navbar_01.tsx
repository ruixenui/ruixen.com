import { Book, BrainCircuit, Menu, Sunset, Trees, Zap } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: JSX.Element;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  mobileExtraLinks?: {
    name: string;
    url: string;
  }[];
  auth?: {
    login: {
      text: string;
      url: string;
    };
    signup: {
      text: string;
      url: string;
    };
  };
}

export const codeStringNavbar_01 = `import { Book, BrainCircuit, Menu, Sunset, Trees, Zap } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: JSX.Element;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  mobileExtraLinks?: {
    name: string;
    url: string;
  }[];
  auth?: {
    login: {
      text: string;
      url: string;
    };
    signup: {
      text: string;
      url: string;
    };
  };
}

const defaultMenu: MenuItem[] = [
  { title: "Dashboard", url: "/dashboard" },
  {
    title: "Solutions",
    url: "/solutions",
    items: [
      {
        title: "AI Workflows",
        description: "Automate processes with smart AI tools",
        icon: <BrainCircuit className="size-5 shrink-0" />,
        url: "/solutions/ai-workflows",
      },
      {
        title: "Data Insights",
        description: "Turn raw data into powerful insights",
        icon: <Trees className="size-5 shrink-0" />,
        url: "/solutions/data-insights",
      },
      {
        title: "Team Collaboration",
        description: "Connect, share, and collaborate easily",
        icon: <Sunset className="size-5 shrink-0" />,
        url: "/solutions/team-collaboration",
      },
      {
        title: "Integrations",
        description: "Connect your favorite tools in one place",
        icon: <Zap className="size-5 shrink-0" />,
        url: "/solutions/integrations",
      },
    ],
  },
  {
    title: "Developers",
    url: "/developers",
    items: [
      {
        title: "API Reference",
        description: "Explore endpoints and examples",
        icon: <Zap className="size-5 shrink-0" />,
        url: "/developers/api",
      },
      {
        title: "SDKs & Tools",
        description: "Use our SDKs to build faster",
        icon: <Sunset className="size-5 shrink-0" />,
        url: "/developers/tools",
      },
      {
        title: "System Status",
        description: "Live updates on platform health",
        icon: <Trees className="size-5 shrink-0" />,
        url: "/status",
      },
      {
        title: "Docs & Guides",
        description: "Start building with step-by-step docs",
        icon: <Book className="size-5 shrink-0" />,
        url: "/developers/docs",
      },
    ],
  },
  { title: "Pricing", url: "/pricing" },
  { title: "Blog", url: "/blog" },
]

export default function Navbar_01({
  logo = {
    url: "https://ruixen.com",
    src: "/ruixen_dark.png",
    alt: "logo",
    title: "Ruixen.com",
  },
  menu = defaultMenu,
  mobileExtraLinks = [
    { name: "Press", url: "#" },
    { name: "Contact", url: "#" },
    { name: "Imprint", url: "#" },
    { name: "Sitemap", url: "#" },
  ],
  auth = {
    login: { text: "Log in", url: "#" },
    signup: { text: "Sign up", url: "#" },
  },
}: Navbar1Props) {
  const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
      return (
        <NavigationMenuItem key={item.title} className="text-gray-600">
          <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
          <NavigationMenuContent className="shadow-md">
            <ul className="grid w-[400px] gap-3 p-1 md:w-[500px] md:grid-cols-2 lg:w-[600px] text-gray-900">
              {item.items.map((sub) => (
                <li key={sub.title} className="text-gray-600">
                  <NavigationMenuLink asChild>
                    <Link
                      href={sub.url}
                      className="flex items-start gap-4 rounded-md p-3 hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-4 h-4"> {sub.icon}</div>
                      <div>
                        <div className="font-normal text-xs">{sub.title}</div>
                        <p className="text-xs text-gray-500">
                          {sub.description}
                        </p>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      );
    }

    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuLink asChild>
          <Link
            href={item.url}
            className="inline-flex h-10 items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-100 transition-colors rounded-md"
          >
            {item.title}
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  };

  const renderMobileMenuItem = (item: MenuItem) => {
    if (item.items) {
      return (
        <AccordionItem key={item.title} value={item.title}>
          <AccordionTrigger className="py-0 font-semibold hover:no-underline">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="mt-2">
            {item.items.map((subItem) => (
              <Link
                key={subItem.title}
                href={subItem.url}
                className="flex items-start gap-4 p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <div className="w-6 h-6"> {subItem.icon}</div>
                <div>
                  <div className="font-normal text-xs">{subItem.title}</div>
                  <p className="text-xs text-gray-500">
                    {subItem.description}
                  </p>
                </div>
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
      );
    }

    return (
      <Link key={item.title} href={item.url} className="font-semibold">
        {item.title}
      </Link>
    );
  };

  return (
    <section className="py-4">
      <div className="container">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link href={logo.url} className="flex items-center gap-2">
              <Image
                src="/ruixen_dark.png"
                alt={logo.alt}
                width={40}
                height={40}
                className="rounded-full h-10 w-10 block dark:hidden"
              />
              <Image
                src="/ruixen_light.png"
                alt={logo.alt}
                width={40}
                height={40}
                className="rounded-full h-10 w-10 hidden dark:block"
              />
              <span className="text-md font-medium text-gray-900">{logo.title}</span>
            </Link>
            <NavigationMenu className="relative z-50">
              <NavigationMenuList>{menu.map(renderMenuItem)}</NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href={auth.login.url}>{auth.login.text}</Link>
            </Button>
            <Button asChild size="sm">
              <Link href={auth.signup.url}>{auth.signup.text}</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="w-8" alt={logo.alt} />
              <span className="text-lg font-semibold">{logo.title}</span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href={logo.url} className="flex items-center gap-2">
                      <img src={logo.src} className="w-8" alt={logo.alt} />
                      <span className="text-lg font-semibold">
                        {logo.title}
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-6 flex flex-col gap-6">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map(renderMobileMenuItem)}
                  </Accordion>
                  <div className="border-t py-4">
                    <div className="grid grid-cols-2 justify-start">
                      {mobileExtraLinks.map((link, idx) => (
                        <Link
                          key={idx}
                          className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
                          href={link.url}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline">
                      <Link href={auth.login.url}>{auth.login.text}</Link>
                    </Button>
                    <Button asChild>
                      <Link href={auth.signup.url}>{auth.signup.text}</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
}
`;

const defaultMenu: MenuItem[] = [
  { title: "Dashboard", url: "/dashboard" },
  {
    title: "Solutions",
    url: "/solutions",
    items: [
      {
        title: "AI Workflows",
        description: "Automate processes with smart AI tools",
        icon: <BrainCircuit className="size-5 shrink-0" />,
        url: "/solutions/ai-workflows",
      },
      {
        title: "Data Insights",
        description: "Turn raw data into powerful insights",
        icon: <Trees className="size-5 shrink-0" />,
        url: "/solutions/data-insights",
      },
      {
        title: "Team Collaboration",
        description: "Connect, share, and collaborate easily",
        icon: <Sunset className="size-5 shrink-0" />,
        url: "/solutions/team-collaboration",
      },
      {
        title: "Integrations",
        description: "Connect your favorite tools in one place",
        icon: <Zap className="size-5 shrink-0" />,
        url: "/solutions/integrations",
      },
    ],
  },
  {
    title: "Developers",
    url: "/developers",
    items: [
      {
        title: "API Reference",
        description: "Explore endpoints and examples",
        icon: <Zap className="size-5 shrink-0" />,
        url: "/developers/api",
      },
      {
        title: "SDKs & Tools",
        description: "Use our SDKs to build faster",
        icon: <Sunset className="size-5 shrink-0" />,
        url: "/developers/tools",
      },
      {
        title: "System Status",
        description: "Live updates on platform health",
        icon: <Trees className="size-5 shrink-0" />,
        url: "/status",
      },
      {
        title: "Docs & Guides",
        description: "Start building with step-by-step docs",
        icon: <Book className="size-5 shrink-0" />,
        url: "/developers/docs",
      },
    ],
  },
  { title: "Pricing", url: "/pricing" },
  { title: "Blog", url: "/blog" },
]

export default function Navbar_01({
  logo = {
    url: "https://ruixen.com",
    src: "/ruixen_dark.png",
    alt: "logo",
    title: "Ruixen.com",
  },
  menu = defaultMenu,
  mobileExtraLinks = [
    { name: "Press", url: "#" },
    { name: "Contact", url: "#" },
    { name: "Imprint", url: "#" },
    { name: "Sitemap", url: "#" },
  ],
  auth = {
    login: { text: "Log in", url: "#" },
    signup: { text: "Sign up", url: "#" },
  },
}: Navbar1Props) {
  const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
      return (
        <NavigationMenuItem key={item.title} className="text-gray-600">
          <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
          <NavigationMenuContent className="shadow-md">
            <ul className="grid w-[400px] gap-3 p-1 md:w-[500px] md:grid-cols-2 lg:w-[600px] text-gray-900">
              {item.items.map((sub) => (
                <li key={sub.title} className="text-gray-600">
                  <NavigationMenuLink asChild>
                    <Link
                      href={sub.url}
                      className="flex items-start gap-4 rounded-md p-3 hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-4 h-4"> {sub.icon}</div>
                      <div>
                        <div className="font-normal text-xs">{sub.title}</div>
                        <p className="text-xs text-gray-500">
                          {sub.description}
                        </p>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      );
    }

    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuLink asChild>
          <Link
            href={item.url}
            className="inline-flex h-10 items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-100 transition-colors rounded-md"
          >
            {item.title}
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  };

  const renderMobileMenuItem = (item: MenuItem) => {
    if (item.items) {
      return (
        <AccordionItem key={item.title} value={item.title}>
          <AccordionTrigger className="py-0 font-semibold hover:no-underline">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="mt-2">
            {item.items.map((subItem) => (
              <Link
                key={subItem.title}
                href={subItem.url}
                className="flex items-start gap-4 p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <div className="w-6 h-6"> {subItem.icon}</div>
                <div>
                  <div className="font-normal text-xs">{subItem.title}</div>
                  <p className="text-xs text-gray-500">
                    {subItem.description}
                  </p>
                </div>
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
      );
    }

    return (
      <Link key={item.title} href={item.url} className="font-semibold">
        {item.title}
      </Link>
    );
  };

  return (
    <section className="py-4">
      <div className="container">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link href={logo.url} className="flex items-center gap-2">
              <Image
                src="/ruixen_dark.png"
                alt={logo.alt}
                width={40}
                height={40}
                className="rounded-full h-10 w-10 block dark:hidden"
              />
              <Image
                src="/ruixen_light.png"
                alt={logo.alt}
                width={40}
                height={40}
                className="rounded-full h-10 w-10 hidden dark:block"
              />
              <span className="text-md font-medium text-gray-900">{logo.title}</span>
            </Link>
            <NavigationMenu className="relative z-50">
              <NavigationMenuList>{menu.map(renderMenuItem)}</NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href={auth.login.url}>{auth.login.text}</Link>
            </Button>
            <Button asChild size="sm">
              <Link href={auth.signup.url}>{auth.signup.text}</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href={logo.url} className="flex items-center gap-2">
              <Image width={40} height={40} src={logo.src} className="w-8" alt={logo.alt} />
              <span className="text-lg font-semibold">{logo.title}</span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href={logo.url} className="flex items-center gap-2">
                      <Image width={40} height={40} src={logo.src} className="w-8" alt={logo.alt} />
                      <span className="text-lg font-semibold">
                        {logo.title}
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-6 flex flex-col gap-6">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map(renderMobileMenuItem)}
                  </Accordion>
                  <div className="border-t py-4">
                    <div className="grid grid-cols-2 justify-start">
                      {mobileExtraLinks.map((link, idx) => (
                        <Link
                          key={idx}
                          className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
                          href={link.url}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline">
                      <Link href={auth.login.url}>{auth.login.text}</Link>
                    </Button>
                    <Button asChild>
                      <Link href={auth.signup.url}>{auth.signup.text}</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
}
