import Featured_01, { codeStringFeatured_01 } from "./components/Featured_01";
import Featured_02, { codeStringFeatured_02 } from "./components/Featured_02";

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
      name: 'Featured 01',
      component: <Featured_01 />,
      description: 'A minimal, single-open client label with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/sections/featured-sections/dark/featured-section-01.png",
      imageLight: "/sections/featured-sections/light/featured-section-01.png",
      code: codeStringFeatured_01,
      installCommand: 'npm install @ruixen/ui',
      preview: <Featured_01  />
    },
    {
      name: 'Featured 02',
      component: <Featured_02 />,
      description: 'A minimal, single-open client label with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/sections/featured-sections/dark/featured-section-02.png",
      imageLight: "/sections/featured-sections/light/featured-section-02.png",
      code: codeStringFeatured_02,
      installCommand: 'npm install @ruixen/ui',
      preview: <Featured_02  />
    }
  ];
  