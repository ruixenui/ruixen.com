import Testimonials_01, { codeStringTestimonials_01 } from "./components/Testimonial_01";
import Testimonials_02, { codeStringTestimonials_02 } from "./components/Testimonial_02";

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

export const testimonialComponents: ComponentInfo[] = [
    {
      name: 'Testimonials 01',
      component: <Testimonials_01 />,
      description: 'A minimal, single-open client label with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/sections/testimonials/dark/testimonial-01.png",
      imageLight: "/sections/testimonials/light/testimonial-01.png",
      code: codeStringTestimonials_01,
      installCommand: 'npm install @ruixen/ui',
      preview: <Testimonials_01  />
    },
    {
      name: 'Testimonials 02',
      component: <Testimonials_02 />,
      description: 'A minimal, single-open client label with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/sections/testimonials/dark/testimonial-02.png",
      imageLight: "/sections/testimonials/light/testimonial-02.png",
      code: codeStringTestimonials_02,
      installCommand: 'npm install @ruixen/ui',
      preview: <Testimonials_02  />
    }
  ];
  