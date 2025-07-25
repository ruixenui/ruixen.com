import Popover_01, { codeStringPopover_01 } from './components/Popover_01';
import Popover_02, { codeStringPopover_02 } from './components/Popover_02';

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

export const popoverComponents: ComponentInfo[] = [
    {
      name: 'Popover 01',
      component: <Popover_01 />,
      description: 'Beautiful animated input component with glowing effects, particle burst on send, and full dark mode support.',
      imageDark: "/components/popovers/dark/popover-01.png",
      imageLight: "/components/popovers/light/popover-01.png",
      code: codeStringPopover_01,
      installCommand: 'npm install @ruixen/ui',
      preview: <Popover_01 />
    },
    {
      name: 'Popover 02',
      component: <Popover_02 />,
      description: 'Beautiful animated input component with glowing effects, particle burst on send, and full dark mode support.',
      imageDark: "/components/popovers/dark/popover-02.png",
      imageLight: "/components/popovers/light/popover-02.png",
      code: codeStringPopover_02,
      installCommand: 'npm install @ruixen/ui',
      preview: <Popover_02 />
    }
  ];