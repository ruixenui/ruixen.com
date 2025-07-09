import Profile_01, { codeStringProfile_01 } from "./components/Profile_01";
import Profile_02, { codeStringProfile_02 } from "./components/Profile_02";
import Profile_03, { codeStringProfile_03 } from "./components/Profile_03";

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

export const profileComponents: ComponentInfo[] = [
    {
      name: 'Profile 01',
      component: <Profile_01 />,
      description: 'A minimal, single-open accordion with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/components/profiles/dark/profile-01.png",
      imageLight: "/components/profiles/light/profile-01.png",
      code: codeStringProfile_01,
      installCommand: 'npm install @ruixen/ui',
      preview: <Profile_01 />
    },
    {
      name: 'Profile 02',
      component: <Profile_02 />,
      description: 'A modern, animated FAQ accordion with scroll-triggered interactions using React, Framer Motion, and GSAP.',
      imageDark: "/components/profiles/dark/profile-02.png",
      imageLight: "/components/profiles/light/profile-02.png",
      code: codeStringProfile_02,
      installCommand: 'npm install @ruixen/ui',
      preview: <Profile_02 />
    },
    {
      name: 'Profile 03',
      component: <Profile_03 />,
      description: 'A modern, animated FAQ accordion with scroll-triggered interactions using React, Framer Motion, and GSAP.',
      imageDark: "/components/profiles/dark/profile-03.png",
      imageLight: "/components/profiles/light/profile-03.png",
      code: codeStringProfile_03,
      installCommand: 'npm install @ruixen/ui',
      preview: <Profile_03 />
    },
  ];
  