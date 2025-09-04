import TeamProjectCard from "../ruixenui/team-project-card";

export default function TeamProjectCardDemo() {
  return (
    <div className="flex items-center justify-center h-screen">
      <TeamProjectCard
        projectName="Ruixen UI"
        description="Modernize and refactor the UI for performance and accessibility."
        teamMembers={[
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
        ]}
        milestones={[
          { title: "UI Audit", dueDate: "Done", completed: true },
          {
            title: "Refactor Components",
            dueDate: "3d left",
            completed: false,
          },
          { title: "Launch Prep", dueDate: "6d left", completed: false },
        ]}
      />
    </div>
  );
}
