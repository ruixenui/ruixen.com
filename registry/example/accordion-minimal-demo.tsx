import AccordionMinimal from "@/registry/ruixenui/accordion-minimal";

const items = [
  {
    id: "1",
    title: "What browsers are supported?",
    content:
      "We support all modern browsers including Chrome, Firefox, Safari, and Edge. IE11 is not supported.",
  },
  {
    id: "2",
    title: "Is the code open source?",
    content:
      "Yes, all components are open source and available on GitHub. Feel free to contribute or customize as needed.",
  },
  {
    id: "3",
    title: "How often do you release updates?",
    content:
      "We release updates weekly with bug fixes and new features. Major versions are released quarterly.",
  },
];

export default function AccordionMinimalDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AccordionMinimal items={items} defaultValue="1" />
      </div>
    </div>
  );
}
