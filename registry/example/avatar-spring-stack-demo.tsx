import AvatarSpringStack from "@/registry/ruixenui/avatar-spring-stack";

const avatars = [
  { src: "/avatar-images/avatar-01.jpg", label: "Jane Smith" },
  { src: "/avatar-images/avatar-02.jpg", label: "Liam Patel" },
  { src: "/avatar-images/avatar-03.jpg", label: "Alex Chen" },
  { src: "/avatar-images/avatar-04.jpg", label: "Sarah Wilson" },
  { src: "/avatar-images/avatar-05.jpg", label: "Marcus Lee" },
  { src: "/avatar-images/avatar-01.jpg", label: "Emma Davis" },
  { src: "/avatar-images/avatar-02.jpg", label: "Noah Kim" },
];

export default function AvatarSpringStackDemo() {
  return (
    <div className="flex flex-col items-center gap-14 py-10">
      <AvatarSpringStack avatars={avatars} />
      <AvatarSpringStack avatars={avatars} maxVisible={3} size={36} />
    </div>
  );
}
