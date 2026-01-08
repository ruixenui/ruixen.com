import AccordionPlus from "@/registry/ruixenui/accordion-plus";

const items = [
  {
    id: "1",
    title: "What's included in the free plan?",
    content:
      "The free plan includes up to 3 projects, 1GB storage, and basic support. Perfect for personal use and small projects.",
  },
  {
    id: "2",
    title: "Can I upgrade later?",
    content:
      "Yes, you can upgrade to a paid plan at any time. Your data and settings will be preserved during the upgrade.",
  },
  {
    id: "3",
    title: "Is there a discount for annual billing?",
    content:
      "Yes, annual billing saves you 20% compared to monthly billing. You can switch to annual at any time.",
  },
];

export default function AccordionPlusDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AccordionPlus items={items} defaultValue="1" />
      </div>
    </div>
  );
}
