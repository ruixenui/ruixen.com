import TreeNodeTooltip, {
  TreeNode,
} from "@/registry/ruixenui/tree-node-tooltip";

const demoData: TreeNode[] = [
  {
    id: "1",
    name: "src",
    tooltip: "src",
    type: "folder",
    children: [
      {
        id: "2",
        name: "components",
        tooltip: "components",
        type: "folder",
        children: [
          {
            id: "3",
            name: "Button.tsx",
            tooltip: "Button's tooltip",
            type: "file",
          },
          {
            id: "4",
            name: "Card.tsx",
            tooltip: "Card's tooltip",
            type: "file",
          },
        ],
      },
      {
        id: "5",
        name: "lib",
        tooltip: "lib",
        type: "folder",
        children: [
          {
            id: "6",
            name: "utils.ts",
            tooltip: "utils's tooltip",
            type: "file",
          },
        ],
      },
    ],
  },
];

export default function TreeViewDemo() {
  return (
    <div className="p-4 max-w-sm mx-auto">
      {demoData.map((node) => (
        <TreeNodeTooltip key={node.id} node={node} />
      ))}
    </div>
  );
}
