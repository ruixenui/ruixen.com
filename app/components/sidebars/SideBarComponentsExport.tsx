import dynamic from 'next/dynamic';
import { codeStringSideBar_01 } from "./components/SideBar_01";

// Dynamically import the component with no SSR
const SideBar_01 = dynamic(() => import('./components/SideBar_01'), {
  ssr: false
});

type ComponentInfo = {
  name: string;
  component: React.ReactNode;
  description: string;
  imageDark: string;
  imageLight: string;
  code: string;
  installCommand: string;
  preview?: React.ReactNode;
};

// Create a wrapper component to ensure proper rendering
const SideBar01Wrapper = () => {
  if (typeof window === 'undefined') return null; // Don't render on server
  return <SideBar_01 />;
};

export const sideBarComponents: ComponentInfo[] = [
  {
    name: 'Sidebar 01',
    component: <SideBar01Wrapper />,
    description: 'A minimal, single-open dropdown with icons and smooth transitions, ideal for clean, focused navigation',
    imageDark: "/components/sidebars/dark/sidebar-01.png",
    imageLight: "/components/sidebars/light/sidebar-01.png",
    code: codeStringSideBar_01,
    installCommand: 'npm install @ruixen/ui',
    preview: <SideBar01Wrapper />
  }
];
