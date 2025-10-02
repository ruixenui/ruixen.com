import TimeWithIcon from "@/registry/ruixenui/time-with-icon";

export default function DemoOne() {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <TimeWithIcon />
      <TimeWithIcon defaultTime="07:30" />
      <TimeWithIcon defaultTime="22:15" />
    </div>
  );
}
