import CTA_01, { codeStringCTA_01 } from "./components/CTA_01";

type ComponentInfo = {
  name: string;
  component: React.ReactNode;
  description: string;
  imageDark: string;
  imageLight: string;
  code: string;
  installCommand: string;
  preview: React.ReactNode;
};

export const featuredComponents: ComponentInfo[] = [
    {
      name: 'CTA 01',
      component: <CTA_01 />,
      description: 'A minimal, single-open client label with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/sections/cta/dark/cta-01.png",
      imageLight: "/sections/cta/light/cta-01.png",
      code: codeStringCTA_01,
      installCommand: 'npm install @ruixen/ui',
      preview: <CTA_01  />
    }
  ];
  