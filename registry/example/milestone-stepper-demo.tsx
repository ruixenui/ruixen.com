"use client";

import {
  MilestoneStepper,
  MilestoneData,
} from "@/registry/ruixenui/milestone-stepper";
import { Package, Truck, Home, CheckCircle } from "lucide-react";

const orderMilestones: MilestoneData[] = [
  {
    id: 1,
    title: "Order Placed",
    description: "Your order has been confirmed and is being processed",
    date: "Jan 15",
  },
  {
    id: 2,
    title: "Shipped",
    description: "Package has been handed to the courier",
    date: "Jan 17",
  },
  {
    id: 3,
    title: "In Transit",
    description: "Package is on its way to the destination",
    date: "Jan 18",
  },
  {
    id: 4,
    title: "Out for Delivery",
    description: "Package will arrive today",
    date: "Jan 20",
  },
  {
    id: 5,
    title: "Delivered",
    description: "Package has been delivered successfully",
    date: "Expected",
  },
];

const projectMilestones: MilestoneData[] = [
  {
    id: 1,
    title: "Project Kickoff",
    description: "Initial planning and setup",
  },
  { id: 2, title: "Design Phase", description: "UI/UX design and prototyping" },
  { id: 3, title: "Development", description: "Core feature implementation" },
  { id: 4, title: "Testing", description: "QA and bug fixes" },
  { id: 5, title: "Launch", description: "Production deployment" },
];

const iconMilestones: MilestoneData[] = [
  { id: 1, title: "Order Confirmed", icon: <CheckCircle className="size-4" /> },
  { id: 2, title: "Packed", icon: <Package className="size-4" /> },
  { id: 3, title: "Shipped", icon: <Truck className="size-4" /> },
  { id: 4, title: "Delivered", icon: <Home className="size-4" /> },
];

export default function MilestoneStepperDemo() {
  return (
    <div className="w-full max-w-xl mx-auto space-y-16 p-8">
      {/* Order Tracking */}
      <div className="space-y-6">
        <h3 className="text-sm font-medium text-muted-foreground">
          Order Tracking
        </h3>
        <div className="rounded-lg border bg-card p-6">
          <MilestoneStepper
            milestones={orderMilestones}
            currentMilestone={2}
            variant="detailed"
          />
        </div>
      </div>

      {/* Project Timeline */}
      <div className="space-y-6">
        <h3 className="text-sm font-medium text-muted-foreground">
          Project Timeline
        </h3>
        <div className="rounded-lg border bg-card p-6">
          <MilestoneStepper
            milestones={projectMilestones}
            currentMilestone={3}
            variant="default"
          />
        </div>
      </div>

      {/* With Custom Icons */}
      <div className="space-y-6">
        <h3 className="text-sm font-medium text-muted-foreground">
          Custom Icons
        </h3>
        <div className="rounded-lg border bg-card p-6">
          <MilestoneStepper
            milestones={iconMilestones}
            currentMilestone={1}
            variant="default"
          />
        </div>
      </div>

      {/* Compact Variant */}
      <div className="space-y-6">
        <h3 className="text-sm font-medium text-muted-foreground">
          Compact Variant
        </h3>
        <div className="rounded-lg border bg-card p-6">
          <MilestoneStepper
            milestones={projectMilestones}
            currentMilestone={2}
            variant="compact"
          />
        </div>
      </div>

      {/* Dashed Line Style */}
      <div className="space-y-6">
        <h3 className="text-sm font-medium text-muted-foreground">
          Dashed Lines
        </h3>
        <div className="rounded-lg border bg-card p-6">
          <MilestoneStepper
            milestones={projectMilestones.slice(0, 4)}
            currentMilestone={1}
            lineStyle="dashed"
          />
        </div>
      </div>
    </div>
  );
}
