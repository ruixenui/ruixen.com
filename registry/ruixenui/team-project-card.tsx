import { Rocket, CheckCircle2, Clock } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  status: "online" | "busy" | "offline";
}

interface Milestone {
  title: string;
  dueDate: string;
  completed: boolean;
}

interface TeamProjectCardProps {
  projectName?: string;
  description?: string;
  teamMembers?: TeamMember[];
  milestones?: Milestone[];
}

export default function TeamProjectCard({
  projectName = "RUIXEN UI CARD",
  description = "Modernize and refactor the UI for performance and accessibility.",
  teamMembers = [
    {
      name: "Alex",
      role: "Design Lead",
      avatar: "https://github.com/shadcn.png",
      status: "online",
    },
    {
      name: "Sarah",
      role: "Frontend Dev",
      avatar: "https://github.com/shadcn.png",
      status: "busy",
    },
    {
      name: "Mike",
      role: "Project Manager",
      avatar: "https://github.com/shadcn.png",
      status: "offline",
    },
  ],
  milestones = [
    { title: "UI Audit", dueDate: "Done", completed: true },
    { title: "Refactor Components", dueDate: "3d left", completed: false },
    { title: "Launch Prep", dueDate: "6d left", completed: false },
  ],
}: TeamProjectCardProps) {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200/30 dark:border-zinc-800/30 rounded-3xl p-6 shadow-md dark:shadow-zinc-900 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Rocket className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            {projectName}
          </h2>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm text-right">
          {description}
        </p>
      </div>

      {/* Body: Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Timeline */}
        <div>
          <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 mb-4">
            Timeline
          </h3>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              >
                <div
                  className={cn(
                    "w-6 h-6 flex items-center justify-center rounded-full mt-1",
                    milestone.completed
                      ? "bg-green-500/10 text-green-600"
                      : "bg-zinc-300 dark:bg-zinc-700 text-zinc-500",
                  )}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">
                    {milestone.title}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    <Clock className="w-3 h-3" />
                    {milestone.dueDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 mb-4">
            Team Members
          </h3>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="flex items-center gap-4 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              >
                <div className="relative">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span
                    className={cn(
                      "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-white dark:ring-zinc-900",
                      member.status === "online" && "bg-emerald-500",
                      member.status === "busy" && "bg-amber-500",
                      member.status === "offline" && "bg-zinc-400",
                    )}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                    {member.name}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
