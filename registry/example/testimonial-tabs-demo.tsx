"use client";

import TestimonialTabs, { TestimonialTab } from "../ruixenui/testimonial-tabs";

export default function TestimonialTabsDemo() {
  const customTestimonials: TestimonialTab[] = [
    {
      id: "john",
      name: "John Appleseed",
      title: "CEO",
      company: "InnovateX",
      quote: "InnovateX transformed our workflow. Highly recommended!",
      image: "https://github.com/shadcn.png",
    },
    {
      id: "lisa",
      name: "Lisa Wong",
      title: "CTO",
      company: "TechNova",
      quote: "TechNova adopted the best CRM experience thanks to this tool.",
      image: "https://github.com/shadcn.png",
    },
    {
      id: "mark",
      name: "Mark Spencer",
      title: "Head of Marketing",
      company: "Startify",
      quote: "Startify saw a 50% increase in efficiency using this system.",
      image: "https://github.com/shadcn.png",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          TestimonialTabs Demo
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Default tabs and custom tabs below.
        </p>
      </div>

      {/* Default Tabs */}
      <TestimonialTabs />

      {/* Custom Tabs */}
      <div className="mt-20">
        <TestimonialTabs testimonials={customTestimonials} />
      </div>
    </main>
  );
}
