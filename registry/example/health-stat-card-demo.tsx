import { Dumbbell } from "lucide-react";
import { HealthStatCard } from "@/registry/ruixenui/health-stat-card";
import {
  StatData,
  HealthGraphData,
} from "@/registry/ruixenui/health-stat-card";

export default function DemoHealthStats() {
  const stats: StatData[] = [
    {
      title: "Sleep",
      value: 7.5,
      unit: "h",
      changePercent: 5,
      changeDirection: "up",
    },
    {
      title: "Hydration",
      value: 2.3,
      unit: "L",
      changePercent: -3,
      changeDirection: "down",
    },
    {
      title: "Steps",
      value: 10400,
      unit: "",
      changePercent: 8,
      changeDirection: "up",
    },
  ];

  const graphData: HealthGraphData[] = [
    {
      label: "Deep Sleep",
      value: 80,
      color: "#3B82F6",
      description: "Time in restorative sleep",
    },
    {
      label: "Hydration",
      value: 65,
      color: "#22C55E",
      description: "Water intake level",
    },
    {
      label: "Exercise",
      value: 55,
      color: "#F59E0B",
      description: "Active minutes today",
    },
    {
      label: "Nutrition",
      value: 90,
      color: "#EF4444",
      description: "Daily nutrition goal met",
    },
  ];

  return (
    <div className="flex justify-center py-10">
      <HealthStatCard
        headerIcon={<Dumbbell className="h-6 w-6" />}
        title="Daily Health Overview"
        stats={stats}
        graphData={graphData}
        graphHeight={120}
      />
    </div>
  );
}
