import Navbar_01, { codeStringNavbar_01 } from "./components/Navbar_01";

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

export const navbarComponents: ComponentInfo[] = [
    {
      name: 'Navbar 01',
      component: <Navbar_01 />,
      description: 'A minimal, single-open client label with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/sections/navbar/dark/navbar-01.png",
      imageLight: "/sections/navbar/light/navbar-01.png",
      code: codeStringNavbar_01,
      installCommand: 'npm install @ruixen/ui',
      preview: <Navbar_01  />
    }
  ];
  