import AccordionSimple from "@/registry/ruixenui/accordion-simple";

const items = [
  {
    id: "1",
    title: "What is the return policy?",
    content:
      "You can return any item within 30 days of purchase for a full refund. Items must be in their original condition with tags attached.",
  },
  {
    id: "2",
    title: "How long does shipping take?",
    content:
      "Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business day delivery.",
  },
  {
    id: "3",
    title: "Do you offer international shipping?",
    content:
      "Yes, we ship to over 100 countries worldwide. International shipping times vary by location.",
  },
];

export default function AccordionSimpleDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AccordionSimple items={items} defaultValue="1" />
      </div>
    </div>
  );
}
