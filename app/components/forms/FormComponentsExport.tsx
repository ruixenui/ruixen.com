import Form_01, { codeStringForm_01 } from "./components/Form_01";
import Form_02, { codeStringForm_02 } from "./components/Form_02";

  
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

export const formComponents: ComponentInfo[] = [
    {
      name: 'Form 01',
      component: <Form_01 />,
      description: 'A minimal, single-open dropdown with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/components/forms/dark/form-01.png",
      imageLight: "/components/forms/light/form-01.png",
      code: codeStringForm_01,
      installCommand: 'npm install @ruixen/ui',
      preview:<Form_01 />
    },
    {
      name: 'Form 02',
      component: <Form_02 />,
      description: 'A minimal, single-open dropdown with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/components/forms/dark/form-02.png",
      imageLight: "/components/forms/light/form-02.png",
      code: codeStringForm_02,
      installCommand: 'npm install @ruixen/ui',
      preview:<Form_02 />
    }
  ];
