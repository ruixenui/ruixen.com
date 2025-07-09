import Pricing_01, { codeStringPricing_01 } from "./components/Pricing_01";
import Pricing_02, { codeStringPricing_02 } from "./components/Pricing_02";

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

export const pricingComponents: ComponentInfo[] = [
    {
      name: 'Pricing 01',
      component: <Pricing_01 />,
      description: 'A minimal, single-open client label with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/sections/pricing/dark/pricing-01.png",
      imageLight: "/sections/pricing/light/pricing-01.png",
      code: codeStringPricing_01,
      installCommand: 'npm install @ruixen/ui',
      preview: <Pricing_01  />
    },
    {
      name: 'Pricing 02',
      component: <Pricing_02 />,
      description: 'A minimal, single-open client label with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/sections/pricing/dark/pricing-02.png",
      imageLight: "/sections/pricing/light/pricing-02.png",
      code: codeStringPricing_02,
      installCommand: 'npm install @ruixen/ui',
      preview: <Pricing_02  />
    }
  ];
  