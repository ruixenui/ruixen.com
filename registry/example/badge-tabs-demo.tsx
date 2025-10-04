import BadgeTabs, { BadgeTabItem } from "@/registry/ruixenui/badge-tabs";

const demoItems: BadgeTabItem[] = [
  {
    value: "messages",
    label: "Messages",
    badge: 5,
    content: (
      <div>
        <h2 className="font-bold text-lg">Messages</h2>
        <p>You have 5 new messages waiting for you.</p>
      </div>
    ),
  },
  {
    value: "tasks",
    label: "Tasks",
    badge: 12,
    content: (
      <div>
        <h2 className="font-bold text-lg">Tasks</h2>
        <p>There are 12 tasks pending your review.</p>
      </div>
    ),
  },
  {
    value: "alerts",
    label: "Alerts",
    badge: 3,
    content: (
      <div>
        <h2 className="font-bold text-lg">Alerts</h2>
        <p>You have 3 new system alerts.</p>
      </div>
    ),
  },
];

export default function DemoOne() {
  return <BadgeTabs items={demoItems} defaultValue="tasks" className="mt-10" />;
}
