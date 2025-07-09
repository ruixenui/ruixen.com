import Input_01, { codeStringInput_01 } from './components/Input_01';
import Input_02, { codeStringInput_02 } from './components/Input_02';
import Input_03, { codeStringInput_03 } from './components/Input_03';
import Input_04, { codeStringInput_04 } from './components/Input_04';
import Input_05, { codeStringInput_05 } from './components/Input_05';
import Input_06, { codeStringInput_06 } from './components/Input_06';

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

export const inputComponents: ComponentInfo[] = [
    {
      name: 'Input 01',
      component: <Input_01 />,
      description: 'Beautiful animated input component with glowing effects, particle burst on send, and full dark mode support.',
      imageDark: "/components/inputs/dark/input-01.png",
      imageLight: "/components/inputs/light/input-01.png",
      code: codeStringInput_01,
      installCommand: 'npm install @ruixen/ui',
      preview: <Input_01 />
    },
    {
      name: 'Input 02',
      component: <Input_02 />,
      description: 'Modern drag-and-drop image upload component with live preview, progress animation',
      imageDark: "/components/inputs/dark/input-02.png",
      imageLight: "/components/inputs/light/input-02.png",
      code: codeStringInput_02,
      installCommand: 'npm install @ruixen/ui',
      preview: <Input_02 />
    },
    {
      name: 'Input 03',
      component: <Input_03 />,
      description: 'Interactive circular numeric input with animated progress ring, increment/decrement controls',
      imageDark: "/components/inputs/dark/input-03.png",
      imageLight: "/components/inputs/light/input-03.png",
      code: codeStringInput_03,
      installCommand: 'npm install @ruixen/ui',
      preview: <Input_03 />
    },
    {
      name: 'Input 04',
      component: <Input_04 />,
      description: 'Interactive glowing password input with live strength meter, progress ring, and real-time requirement validation.',
      imageDark: "/components/inputs/dark/input-04.png",
      imageLight: "/components/inputs/light/input-04.png",
      code: codeStringInput_04,
      installCommand: 'npm install @ruixen/ui',
      preview: <Input_04 />
    },
    {
      name: 'Input 05',
      component: <Input_05 />,
      description: 'Interactive glowing password input with live strength meter, progress ring, and real-time requirement validation.',
      imageDark: "/components/inputs/dark/input-05.png",
      imageLight: "/components/inputs/light/input-05.png",
      code: codeStringInput_05,
      installCommand: 'npm install @ruixen/ui',
      preview: <Input_05 />
    },
    {
      name: 'Input 06',
      component: <Input_06 />,
      description: 'A sleek color picker component with opacity control and one-click RGBA copy functionality.',
      imageDark: "/components/inputs/dark/input-06.png",
      imageLight: "/components/inputs/light/input-06.png",
      code: codeStringInput_06,
      installCommand: 'npm install @ruixen/ui',
      preview: <Input_06 />
    },
  ];