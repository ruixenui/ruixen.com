"use client";

import * as React from "react";
import { CheckboxTodo } from "@/registry/ruixenui/checkbox-todo";

export default function CheckboxTodoDemo() {
  const [tasks, setTasks] = React.useState([
    { id: "1", label: "Review pull requests", done: false },
    { id: "2", label: "Update documentation", done: true },
    { id: "3", label: "Fix navigation bug", done: false },
    { id: "4", label: "Deploy to production", done: false },
  ]);

  const toggleTask = (id: string, done: boolean) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done } : task)),
    );
  };

  return (
    <div className="flex min-h-[350px] w-full items-center justify-center">
      <div className="flex flex-col gap-1">
        {tasks.map((task) => (
          <CheckboxTodo
            key={task.id}
            label={task.label}
            checked={task.done}
            onCheckedChange={(done) => toggleTask(task.id, done)}
          />
        ))}
      </div>
    </div>
  );
}
