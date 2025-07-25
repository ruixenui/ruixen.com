import Button_01, { codeStringButton_01 } from './components/Button_01';
import Button_02, { codeStringButton_02 } from './components/Button_02';
import Button_03, { codeStringButton_03 } from './components/Button_03';
import Button_07, { codeStringButton_07 } from './components/Button_07';

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

export const buttonComponents: ComponentInfo[] = [
    {
      name: 'Button 01',
      component: <Button_01 />,
      description: 'Beautiful animated input component with glowing effects, particle burst on send, and full dark mode support.',
      imageDark: "/components/buttons/dark/button-01.png",
      imageLight: "/components/buttons/light/button-01.png",
      code: codeStringButton_01,
      installCommand: 'npm install @ruixen/ui',
      preview: <Button_01 />
    },
    {
      name: 'Button 02',
      component: <Button_02 />,
      description: 'Modern drag-and-drop image upload component with live preview, progress animation',
      imageDark: "/components/buttons/dark/button-02.png",
      imageLight: "/components/buttons/light/button-02.png",
      code: codeStringButton_02,
      installCommand: 'npm install @ruixen/ui',
      preview: <Button_02 />
    },
    {
      name: 'Button 03',
      component: <Button_03 />,
      description: 'Interactive circular numeric input with animated progress ring, increment/decrement controls',
      imageDark: "/components/buttons/dark/button-03.png",
      imageLight: "/components/buttons/light/button-03.png",
      code: codeStringButton_03,
      installCommand: 'npm install @ruixen/ui',
      preview: <Button_03 />
    },
    {
      name: 'Button 07',
      component: <Button_07 />,
      description: 'Interactive circular numeric input with animated progress ring, increment/decrement controls',
      imageDark: "/components/buttons/dark/button-07.png",
      imageLight: "/components/buttons/light/button-07.png",
      code: codeStringButton_07,
      installCommand: 'npm install @ruixen/ui',
      preview: <Button_07 />
    },
  ];
  