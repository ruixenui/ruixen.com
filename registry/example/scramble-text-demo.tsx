import ScrambleText from "@/registry/ruixenui/scramble-text";

export default function ScrambleTextDemo() {
  return (
    <div className="flex flex-col items-center gap-10 py-10">
      <ScrambleText as="h2" className="text-5xl font-medium tracking-tight">
        Scramble Text
      </ScrambleText>
      <ScrambleText className="text-lg text-muted-foreground tracking-wide">
        Hover from either side — the resolve wave follows your entry
      </ScrambleText>
    </div>
  );
}
