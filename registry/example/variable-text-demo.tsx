import VariableText from "@/registry/ruixenui/variable-text";

export default function VariableTextDemo() {
  return (
    <div className="flex flex-col items-center gap-10 py-10">
      <VariableText as="h2" className="text-5xl font-medium tracking-tight">
        Variable Lens
      </VariableText>
      <VariableText className="text-lg text-muted-foreground tracking-wide">
        Move your cursor across — watch characters sharpen into focus
      </VariableText>
    </div>
  );
}
