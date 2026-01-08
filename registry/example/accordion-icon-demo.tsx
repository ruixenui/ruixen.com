import AccordionIcon from "@/registry/ruixenui/accordion-icon";
import { Shield, CreditCard, Truck } from "lucide-react";

const items = [
  {
    id: "1",
    icon: Shield,
    title: "Is my data secure?",
    content:
      "Yes, we use industry-standard encryption to protect your data. Your information is never shared with third parties.",
  },
  {
    id: "2",
    icon: CreditCard,
    title: "Are there any hidden fees?",
    content:
      "No hidden fees. The price you see is the price you pay. Shipping costs are calculated at checkout.",
  },
  {
    id: "3",
    icon: Truck,
    title: "What if my package is damaged?",
    content:
      "Contact us within 48 hours of delivery with photos. We'll send a replacement or issue a refund.",
  },
];

export default function AccordionIconDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AccordionIcon items={items} defaultValue="1" />
      </div>
    </div>
  );
}
