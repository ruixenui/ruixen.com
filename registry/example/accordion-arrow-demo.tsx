import AccordionArrow from "@/registry/ruixenui/accordion-arrow";

const items = [
  {
    id: "1",
    title: "Getting Started",
    content:
      "Begin by installing the package with npm or yarn. Then import the components you need into your project.",
  },
  {
    id: "2",
    title: "Configuration",
    content:
      "Customize the components using props or by modifying the default theme. All components support dark mode out of the box.",
  },
  {
    id: "3",
    title: "Deployment",
    content:
      "Build your project and deploy to your preferred hosting platform. The components are optimized for production.",
  },
];

export default function AccordionArrowDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AccordionArrow items={items} defaultValue="1" />
      </div>
    </div>
  );
}
