import DoctorProfileCard from "../ruixenui/doctor-profile-card";

export default function DoctorProfileCardDemo() {
  return (
    <DoctorProfileCard
      name="Dr. Sarah Johnson"
      image="https://github.com/shadcn.png"
      specialization="Pediatric Specialist"
      status="Online"
      rating={4.8}
      chats={231}
      available="Available Today · Until 7:00 PM"
      onJoinChat={() => console.log("Joining chat")}
      onBookmark={() => console.log("Bookmarking doctor")}
    />
  );
}
