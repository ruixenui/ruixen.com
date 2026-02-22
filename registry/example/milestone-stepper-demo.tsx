"use client";

import {
  MilestoneStepper,
  MilestoneData,
} from "@/registry/ruixenui/milestone-stepper";

const milestones: MilestoneData[] = [
  {
    id: 1,
    title: "Order Placed",
    description: "Your order has been confirmed",
    date: "Jan 15",
  },
  {
    id: 2,
    title: "Shipped",
    description: "Package handed to courier",
    date: "Jan 17",
  },
  {
    id: 3,
    title: "In Transit",
    description: "On the way to destination",
    date: "Jan 18",
  },
  {
    id: 4,
    title: "Delivered",
    description: "Package delivered successfully",
  },
];

export default function MilestoneStepperDemo() {
  return (
    <div className="w-full max-w-sm mx-auto p-8">
      <MilestoneStepper milestones={milestones} currentMilestone={2} />
    </div>
  );
}
