"use client";

import * as React from "react";
import {
  DrilldownMenu,
  type DrilldownMenuItem,
} from "@/registry/ruixenui/drilldown-menu";

const SETTINGS: DrilldownMenuItem[] = [
  {
    id: "account",
    label: "Account",
    items: [
      { id: "profile", label: "Profile" },
      { id: "emails", label: "Email Addresses" },
      { id: "password", label: "Password" },
      { id: "sessions", label: "Active Sessions" },
      { id: "close", label: "Close Account" },
    ],
  },
  {
    id: "workspace",
    label: "Workspace",
    items: [
      { id: "general", label: "General" },
      {
        id: "members",
        label: "Members",
        items: [
          { id: "invite", label: "Invite People" },
          { id: "roles", label: "Roles" },
          { id: "pending", label: "Pending Invites" },
          { id: "guests", label: "Guest Access" },
          { id: "requests", label: "Access Requests" },
        ],
      },
      { id: "billing", label: "Billing" },
      { id: "limits", label: "Usage Limits" },
      { id: "integrations", label: "Integrations" },
    ],
  },
  {
    id: "notifications",
    label: "Notifications",
    items: [
      { id: "digest", label: "Email Digest" },
      {
        id: "push",
        label: "Push",
        items: [
          { id: "dms", label: "Direct Messages" },
          { id: "mentions", label: "Mentions" },
          { id: "replies", label: "Comment Replies" },
          { id: "assignments", label: "Task Assignments" },
          { id: "summary", label: "Weekly Summary" },
        ],
      },
      { id: "in-app", label: "In-App" },
      { id: "quiet", label: "Quiet Hours" },
    ],
  },
  {
    id: "appearance",
    label: "Appearance",
    items: [
      { id: "theme", label: "Theme" },
      { id: "density", label: "Density" },
      { id: "accent", label: "Accent Color" },
      { id: "typeface", label: "Typeface" },
    ],
  },
  {
    id: "advanced",
    label: "Advanced",
    items: [
      { id: "keys", label: "API Keys" },
      { id: "webhooks", label: "Webhooks" },
      { id: "audit", label: "Audit Log" },
      { id: "export", label: "Data Export" },
    ],
  },
];

export default function DrilldownMenuDemo() {
  const [chosen, setChosen] = React.useState<string | null>(null);

  return (
    <div className="flex w-full flex-col items-center gap-4 px-6 py-10">
      <DrilldownMenu
        className="w-full max-w-sm"
        items={SETTINGS}
        onSelect={(item, trail) =>
          setChosen([...trail, item].map((step) => step.label).join(" / "))
        }
      />
      <p className="h-5 text-sm text-muted-foreground">{chosen}</p>
    </div>
  );
}
