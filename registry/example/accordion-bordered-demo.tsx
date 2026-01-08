import AccordionBordered from "@/registry/ruixenui/accordion-bordered";

const items = [
  {
    id: "1",
    title: "What payment methods do you accept?",
    content:
      "We accept all major credit cards, PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted.",
  },
  {
    id: "2",
    title: "Can I change my order after placing it?",
    content:
      "You can modify your order within 1 hour of placing it. Contact our support team for assistance.",
  },
  {
    id: "3",
    title: "How do I track my order?",
    content:
      "Once your order ships, you'll receive an email with a tracking number. You can track your package on our website or the carrier's site.",
  },
];

export default function AccordionBorderedDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AccordionBordered items={items} defaultValue="1" />
      </div>
    </div>
  );
}
