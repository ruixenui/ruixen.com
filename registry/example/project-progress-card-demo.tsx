"use client";

import React from "react";
import { ProjectProgressCard } from "@/registry/ruixenui/project-progress-card";

const ProjectProgressCardDemo = () => {
  const milestones = [
    {
      icon: "",
      title: "Wireframe Design",
      description: "Initial sketches and design structure completed.",
      completed: true,
    },
    {
      icon: "",
      title: "Frontend Development",
      description: "Integrating layouts and responsive components.",
      completed: true,
    },
    {
      icon: "",
      title: "Backend Setup",
      description: "Database and API routes configuration in progress.",
      completed: false,
    },
    {
      icon: "",
      title: "Final QA & Launch",
      description: "Testing, debugging, and deployment preparation.",
      completed: false,
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <ProjectProgressCard
        title="Ruvy Project Development"
        projectManager="Srinath G"
        dueDate="25 Oct 2025"
        milestones={milestones}
        onNextStep={() => alert("Next step clicked!")}
      />
    </div>
  );
};

export default ProjectProgressCardDemo;
