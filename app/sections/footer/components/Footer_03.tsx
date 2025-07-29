import Link from "next/link";
import Container from "@/components/ruixen/container";
import Image from "next/image";

export const codeStringFooter_03 = `
import Link from "next/link";
import Container from "@/components/ruixen/container";
import Image from "next/image";

export default function Footer_03() {
  return (
    <footer className="flex flex-col relative items-center justify-center border-t border-foreground/5 pt-16 pb-8 px-6 lg:px-8 w-full max-w-6xl mx-auto lg:pt-32">
      <div className="grid gap-8 xl:grid-cols-3 xl:gap-8 w-full">
        <Container>
          <div className="flex flex-col items-start justify-start md:max-w-[200px]">
            <div className="flex items-center gap-2">
              <Image
                src="/ruixen_dark.png"
                alt="Ruixen Logo"
                width={40}
                height={40}
                className="rounded-full h-10 w-10 block dark:hidden"
              />
              <Image
                src="/ruixen_light.png"
                alt="Ruixen Logo"
                width={40}
                height={40}
                className="rounded-full h-10 w-10 hidden dark:block"
              />
            </div>
            <p className="text-muted-foreground mt-4 text-sm text-start">
              Build better UIs faster with Ruixen – the AI-enhanced component library for modern teams.
            </p>
          </div>
        </Container>

        <div className="grid-cols-2 gap-8 grid mt-16 xl:col-span-2 xl:mt-0">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <Container delay={0.1} className="h-auto">
              <h3 className="text-base font-normal text-foreground">
                Ruixen
              </h3>
              <ul className="mt-4 text-sm text-gray-500 space-y-4">
                <li className="mt-2">
                  <Link href="#" className="link hover:text-foreground transition-all duration-300">
                    Components
                  </Link>
                </li>
                <li className="mt-2">
                  <Link href="#" className="link hover:text-foreground transition-all duration-300">
                    Pricing
                  </Link>
                </li>
                <li className="mt-2">
                  <Link href="#" className="link hover:text-foreground transition-all duration-300">
                    Use Cases
                  </Link>
                </li>
                <li className="mt-2">
                  <Link href="#" className="link hover:text-foreground transition-all duration-300">
                    Language Support
                  </Link>
                </li>
              </ul>
            </Container>
            <Container delay={0.2} className="h-auto">
              <div className="mt-10 md:mt-0 flex flex-col">
                <h3 className="text-base font-normal text-foreground">
                  Solutions
                </h3>
                <ul className="mt-4 text-sm text-gray-500 space-y-4">
                  <li>
                    <Link href="#" className="link hover:text-foreground transition-all duration-300">
                      Developers
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link href="#" className="link hover:text-foreground transition-all duration-300">
                      Design Teams
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link href="#" className="link hover:text-foreground transition-all duration-300">
                      Startups
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link href="#" className="link hover:text-foreground transition-all duration-300">
                      Enterprises
                    </Link>
                  </li>
                </ul>
              </div>
            </Container>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <Container delay={0.3} className="h-auto">
              <h3 className="text-base font-normal text-foreground">
                Resources
              </h3>
              <ul className="mt-4 text-sm text-gray-500 space-y-4">
                <li className="mt-2">
                  <Link href="#" className="link hover:text-foreground transition-all duration-300">
                    Documentation
                  </Link>
                </li>
                <li className="mt-2">
                  <Link href="#" className="link hover:text-foreground transition-all duration-300">
                    Component Guides
                  </Link>
                </li>
                <li className="mt-2">
                  <Link href="#" className="link hover:text-foreground transition-all duration-300">
                    Support Center
                  </Link>
                </li>
              </ul>
            </Container>
            <Container delay={0.4} className="h-auto">
              <div className="mt-10 md:mt-0 flex flex-col">
                <h3 className="text-base font-normal text-foreground">
                  Company
                </h3>
                <ul className="mt-4 text-sm text-gray-500 space-y-4">
                  <li>
                    <Link href="#" className="link hover:text-foreground transition-all duration-300">
                      Our Story
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link href="#" className="link hover:text-foreground transition-all duration-300">
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link href="#" className="link hover:text-foreground transition-all duration-300">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </Container>
          </div>
        </div>
      </div>

      <Container delay={0.5} className="w-full relative mt-12 lg:mt-20">
        <div className="mt-8 md:flex md:items-center justify-center footer w-full">
          <p className="text-sm text-gray-500 mt-8 md:mt-0">
            &copy; {new Date().getFullYear()} Ruixen. Built for UI excellence.
          </p>
        </div>
      </Container>
    </footer>
  );
}
`;

export default function Footer_03() {
  return (
    <footer className="flex flex-col relative items-center justify-center border-t border-foreground/5 pt-16 pb-8 px-6 lg:px-8 w-full max-w-6xl mx-auto lg:pt-32">
      <div className="grid gap-8 xl:grid-cols-3 xl:gap-8 w-full">
        <Container>
          <div className="flex flex-col items-start justify-start md:max-w-[200px]">
            <div className="flex items-center gap-2">
              <Image
                src="/ruixen_dark.png"
                alt="Ruixen Logo"
                width={40}
                height={40}
                className="rounded-full h-10 w-10 block dark:hidden"
              />
              <Image
                src="/ruixen_light.png"
                alt="Ruixen Logo"
                width={40}
                height={40}
                className="rounded-full h-10 w-10 hidden dark:block"
              />
            </div>
            <p className="text-muted-foreground mt-4 text-sm text-start">
              Build better UIs faster with Ruixen – the AI-enhanced component library for modern teams.
            </p>
          </div>
        </Container>

        <div className="grid-cols-2 gap-8 grid mt-16 xl:col-span-2 xl:mt-0">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <Container delay={0.1} className="h-auto">
              <h3 className="text-base font-normal text-foreground">
                Ruixen
              </h3>
              <ul className="mt-4 text-sm text-gray-500 space-y-4">
                <li className="mt-2">
                  <Link href="#" className="link hover:text-foreground transition-all duration-300">
                    Components
                  </Link>
                </li>
                <li className="mt-2">
                  <Link href="#" className="link hover:text-foreground transition-all duration-300">
                    Pricing
                  </Link>
                </li>
                <li className="mt-2">
                  <Link href="#" className="link hover:text-foreground transition-all duration-300">
                    Use Cases
                  </Link>
                </li>
                <li className="mt-2">
                  <Link href="#" className="link hover:text-foreground transition-all duration-300">
                    Language Support
                  </Link>
                </li>
              </ul>
            </Container>
            <Container delay={0.2} className="h-auto">
              <div className="mt-10 md:mt-0 flex flex-col">
                <h3 className="text-base font-normal text-foreground">
                  Solutions
                </h3>
                <ul className="mt-4 text-sm text-gray-500 space-y-4">
                  <li>
                    <Link href="#" className="link hover:text-foreground transition-all duration-300">
                      Developers
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link href="#" className="link hover:text-foreground transition-all duration-300">
                      Design Teams
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link href="#" className="link hover:text-foreground transition-all duration-300">
                      Startups
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link href="#" className="link hover:text-foreground transition-all duration-300">
                      Enterprises
                    </Link>
                  </li>
                </ul>
              </div>
            </Container>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <Container delay={0.3} className="h-auto">
              <h3 className="text-base font-normal text-foreground">
                Resources
              </h3>
              <ul className="mt-4 text-sm text-gray-500 space-y-4">
                <li className="mt-2">
                  <Link href="#" className="link hover:text-foreground transition-all duration-300">
                    Documentation
                  </Link>
                </li>
                <li className="mt-2">
                  <Link href="#" className="link hover:text-foreground transition-all duration-300">
                    Component Guides
                  </Link>
                </li>
                <li className="mt-2">
                  <Link href="#" className="link hover:text-foreground transition-all duration-300">
                    Support Center
                  </Link>
                </li>
              </ul>
            </Container>
            <Container delay={0.4} className="h-auto">
              <div className="mt-10 md:mt-0 flex flex-col">
                <h3 className="text-base font-normal text-foreground">
                  Company
                </h3>
                <ul className="mt-4 text-sm text-gray-500 space-y-4">
                  <li>
                    <Link href="#" className="link hover:text-foreground transition-all duration-300">
                      Our Story
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link href="#" className="link hover:text-foreground transition-all duration-300">
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link href="#" className="link hover:text-foreground transition-all duration-300">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </Container>
          </div>
        </div>
      </div>

      <Container delay={0.5} className="w-full relative mt-12 lg:mt-20">
        <div className="mt-8 md:flex md:items-center justify-center footer w-full">
          <p className="text-sm text-gray-500 mt-8 md:mt-0">
            &copy; {new Date().getFullYear()} Ruixen. Built for UI excellence.
          </p>
        </div>
      </Container>
    </footer>
  );
}
