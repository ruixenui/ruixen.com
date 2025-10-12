"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Calendar, User, CheckCircle2, CircleDot } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Milestone = {
  title: string;
  description: string;
  completed?: boolean;
};

export type ProjectProgressCardProps = {
  title: string;
  projectManager: string;
  dueDate: string;
  milestones: Milestone[];
  onNextStep?: () => void;
};

export const ProjectProgressCard: React.FC<ProjectProgressCardProps> = ({
  title,
  projectManager,
  dueDate,
  milestones,
  onNextStep,
}) => {
  return (
    <Card className="w-full max-w-lg rounded-2xl border shadow-lg shadow-primary/10">
      {/* --- Header --- */}
      <CardHeader className="p-6">
        <motion.div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            <p className="text-sm text-muted-foreground">
              Project overview & milestones
            </p>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground whitespace-nowrap">
            <Calendar className="h-4 w-4" />
            <span>{dueDate}</span>
          </div>
        </motion.div>
      </CardHeader>

      {/* --- Content --- */}
      <CardContent className="px-6 pb-6 space-y-6">
        <motion.div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Managed by {projectManager}
          </span>
        </motion.div>

        <Separator className="my-4" />

        {/* --- Vertical Milestone Timeline --- */}
        <div className="relative">
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              className="relative flex items-start gap-3 pb-6 last:pb-0"
            >
              {/* Icon */}
              <div className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-background ring-2 ring-muted">
                {m.completed ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <CircleDot className="h-4 w-4 text-blue-500" />
                )}
              </div>

              {/* Text */}
              <div className="flex flex-col">
                <p className="text-sm font-medium text-foreground">{m.title}</p>
                <p className="text-xs text-muted-foreground">{m.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>

      {/* --- Footer --- */}
      <motion.div className="bg-muted/40 p-6">
        <Button onClick={onNextStep} size="lg" className="w-full">
          Next Step
        </Button>
      </motion.div>
    </Card>
  );
};
