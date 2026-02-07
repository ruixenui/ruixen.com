import { DocsSidebarNav } from "@/components/sidebar-nav";
import { TailwindVersionToggle } from "@/components/tailwind-version-toggle";
import { docsConfig } from "@/config/docs";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container-wrapper">
      <div className="container flex-1 items-start md:grid md:grid-cols-[200px_minmax(0,1fr)] md:gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <div
            className="no-scrollbar h-full overflow-auto py-6 pr-4 lg:py-8"
            data-lenis-prevent
          >
            <div className="mb-4">
              <TailwindVersionToggle />
            </div>
            <DocsSidebarNav items={docsConfig.sidebarNav} />
          </div>
        </aside>
        {children}
      </div>
    </div>
  );
}
