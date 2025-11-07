import WheelPagination from "@/registry/ruixenui/wheel-pagination";

export default function DemoOne() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <WheelPagination
        totalPages={50} // Total number of pages
        visibleCount={7} // Number of pages visible at once
        className=""
      />
    </div>
  );
}
