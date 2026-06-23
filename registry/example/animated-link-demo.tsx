import AnimatedLink from "@/registry/ruixenui/animated-link";

const AnimatedLinkDemo = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 py-16 text-lg">
      {/* underline reveals from the left */}
      <AnimatedLink href="#" variant="left">
        Hover over me
      </AnimatedLink>

      {/* underline reveals from the right */}
      <AnimatedLink href="#" variant="right">
        Hover over me
      </AnimatedLink>

      {/* underline grows from the center */}
      <AnimatedLink href="#" variant="center">
        Hover over me
      </AnimatedLink>
    </div>
  );
};

export default AnimatedLinkDemo;
