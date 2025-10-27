import UserContextMenu from "@/registry/ruixenui/user-context-menu";

export default function UserContextMenuDemo() {
  return (
    <div className="flex items-center justify-center min-h-screen p-2">
      <div className="text-center">
        <UserContextMenu />
        <p className="text-muted-foreground mt-8">
          Right-click the card below to explore user options.
        </p>
      </div>
    </div>
  );
}
