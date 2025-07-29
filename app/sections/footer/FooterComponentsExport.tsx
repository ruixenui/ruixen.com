import Footer_01, { codeStringFooter_01 } from "./components/Footer_01";
import Footer_02, { codeStringFooter_02 } from "./components/Footer_02";
import Footer_03, { codeStringFooter_03 } from "./components/Footer_03";

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

export const footerComponents: ComponentInfo[] = [
    {
      name: 'Footer 01',
      component: <Footer_01 />,
      description: 'A minimal, single-open client label with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/sections/footer/dark/footer-01.png",
      imageLight: "/sections/footer/light/footer-01.png",
      code: codeStringFooter_01,
      installCommand: 'npm install @ruixen/ui',
      preview: <Footer_01  />
    },
    {
      name: 'Footer 02',
      component: <Footer_02 />,
      description: 'A minimal, single-open client label with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/sections/footer/dark/footer-02.png",
      imageLight: "/sections/footer/light/footer-02.png",
      code: codeStringFooter_02,
      installCommand: 'npm install @ruixen/ui',
      preview: <Footer_02  />
    },
    {
      name: 'Footer 03',
      component: <Footer_03 />,
      description: 'A minimal, single-open client label with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/sections/footer/dark/footer-03.png",
      imageLight: "/sections/footer/light/footer-03.png",
      code: codeStringFooter_03,
      installCommand: 'npm install @ruixen/ui',
      preview: <Footer_03  />
    }
  ];
  