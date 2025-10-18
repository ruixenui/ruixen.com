"use client";

import AccountMenu from "@/registry/ruixenui/account-menu";

export default function AccountMenuDemo() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="mb-6">
        <AccountMenu />
      </div>

      <div className="max-w-md text-center text-slate-500 text-sm">
        <p>
          This menu demonstrates a professional dropdown design with clear
          icon-text spacing, nested submenus, and hover effects. Ideal for
          dashboards, team apps, and admin panels.
        </p>
      </div>
    </div>
  );
}
