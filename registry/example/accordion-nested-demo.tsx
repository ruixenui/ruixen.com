import AccordionNested from "@/registry/ruixenui/accordion-nested";

const items = [
  {
    id: "1",
    title: "Account Settings",
    content: "Manage your account preferences and security settings.",
    subItems: [
      {
        id: "1-1",
        title: "Profile Information",
        content: "Update your name, email, and profile picture.",
      },
      {
        id: "1-2",
        title: "Security",
        content: "Change password and enable two-factor authentication.",
      },
    ],
  },
  {
    id: "2",
    title: "Billing & Subscription",
    content: "View and manage your billing information.",
    subItems: [
      {
        id: "2-1",
        title: "Payment Methods",
        content: "Add or remove payment methods from your account.",
      },
      {
        id: "2-2",
        title: "Invoices",
        content: "Download past invoices and billing statements.",
      },
    ],
  },
];

export default function AccordionNestedDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AccordionNested items={items} defaultValue="1" />
      </div>
    </div>
  );
}
