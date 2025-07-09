import DropDown_01, { codeStringDropDown_01 } from "./components/DropDown_01";
import DropDown_02, { codeStringDropDown_02 } from "./components/DropDown_02";

  
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

export const dropdownComponents: ComponentInfo[] = [
    {
      name: 'Dropdown 01',
      component: <DropDown_01 label="Actions" />,
      description: 'A minimal, single-open dropdown with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/components/dropdowns/dark/dropdown-01.png",
      imageLight: "/components/dropdowns/light/dropdown-01.png",
      code: codeStringDropDown_01,
      installCommand: 'npm install @ruixen/ui',
      preview:<DropDown_01 label="Actions" />
    },
    {
      name: 'Dropdown 02',
      component: <DropDown_02 />,
      description: 'A minimal, single-open dropdown with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/components/dropdowns/dark/dropdown-02.png",
      imageLight: "/components/dropdowns/light/dropdown-02.png",
      code: codeStringDropDown_02,
      installCommand: 'npm install @ruixen/ui',
      preview:<DropDown_02 />
    },
  ];
  