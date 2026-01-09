"use client";

import BadgeStatus from "@/registry/ruixenui/badge-status";

export default function BadgeStatusDemo() {
  return (
    <div className="flex min-h-[350px] w-full flex-col items-center justify-center gap-6 p-4">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <BadgeStatus status="success" />
        <BadgeStatus status="pending" />
        <BadgeStatus status="warning" />
        <BadgeStatus status="error" />
        <BadgeStatus status="loading" />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <BadgeStatus status="success" showIcon showDot={false} />
        <BadgeStatus status="pending" showIcon showDot={false} />
        <BadgeStatus status="warning" showIcon showDot={false} />
        <BadgeStatus status="error" showIcon showDot={false} />
        <BadgeStatus status="loading" showIcon showDot={false} />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <BadgeStatus status="success">Completed</BadgeStatus>
        <BadgeStatus status="pending">In Review</BadgeStatus>
        <BadgeStatus status="warning">Needs Attention</BadgeStatus>
        <BadgeStatus status="error">Failed</BadgeStatus>
      </div>
    </div>
  );
}
