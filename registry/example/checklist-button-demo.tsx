"use client";

import { CheckCircle, ClipboardList, Star, Heart } from "lucide-react";
import ChecklistButton from "@/registry/ruixenui/checklist-button";

export default function ChecklistDemo() {
  return (
    <div className="p-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      <ChecklistButton
        label="Mark as Done"
        doneLabel="Completed"
        onDone={() => console.log("Task completed!")}
      />

      <ChecklistButton
        label="Add to Favorites"
        doneLabel="Favorited"
        icon={<Star className="w-4 h-4 text-yellow-500" />}
        doneIcon={<Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
      />

      <ChecklistButton
        label="Subscribe"
        doneLabel="Subscribed"
        icon={<Heart className="w-4 h-4 text-pink-500" />}
        doneIcon={<Heart className="w-4 h-4 text-pink-500 fill-pink-500" />}
        resettable
      />

      <ChecklistButton
        label="Start Task"
        doneLabel="Done!"
        icon={<ClipboardList className="w-4 h-4" />}
        doneIcon={<CheckCircle className="w-4 h-4 text-green-600" />}
        onDone={() => alert("Task marked as done")}
      />

      <ChecklistButton label="Approve" doneLabel="Approved" />

      <ChecklistButton
        label="Custom Width"
        doneLabel="Checked"
        className="w-48"
      />
    </div>
  );
}
