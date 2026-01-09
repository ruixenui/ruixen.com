import AccordionAnimated from "@/registry/ruixenui/accordion-animated";

const items = [
  {
    id: "1",
    title: "What animations are included?",
    content:
      "This accordion uses Framer Motion for smooth expand/collapse animations. The icon also animates on state change.",
  },
  {
    id: "2",
    title: "Is it accessible?",
    content:
      "Yes, the accordion maintains full keyboard navigation and screen reader support while adding visual enhancements.",
  },
  {
    id: "3",
    title: "Can I customize the animation?",
    content:
      "Absolutely! You can modify the duration, easing, and animation properties by adjusting the Framer Motion config.",
  },
];

export default function AccordionAnimatedDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AccordionAnimated items={items} defaultValue="1" />
      </div>
    </div>
  );
}
