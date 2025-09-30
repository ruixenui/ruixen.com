// app/job-card-demo/page.tsx (or pages/job-card-demo.tsx in older Next.js versions)
"use client";

import JobCard from "@/registry/ruixenui/job-card";

export default function JobCardDemoPage() {
  const demoJobs = [
    {
      title: "Frontend Developer",
      company: "OpenCV University",
      rate: "$90k - $110k",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "3+ years",
      logoUrl: "https://avatars.githubusercontent.com/u/1730971?s=200&v=4",
    },
    {
      title: "Backend Engineer",
      company: "Tech Corp",
      rate: "$80k - $100k",
      location: "Remote",
      type: "Contract",
      experience: "2+ years",
      logoUrl: "",
    },
    {
      title: "UI/UX Designer",
      company: "DesignHub",
      rate: "$70k - $90k",
      location: "New York, USA",
      type: "Part-time",
      experience: "5+ years",
      logoUrl: "",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="mb-6 text-3xl font-bold text-center">JobCard Demo</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {demoJobs.map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
      </div>
    </div>
  );
}
