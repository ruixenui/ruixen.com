"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { PlayCircle } from "lucide-react";

export default function CRMInsightsPanel() {
  const [isPlaying, setIsPlaying] = useState(false);

  const crmFeatures = [
    {
      title: "Sales Pipeline Tracking",
      subtitle:
        "Easily monitor every lead from first contact to final closure with a visual pipeline.",
    },
    {
      title: "Automated Follow-ups",
      subtitle:
        "Use AI-powered reminders to send timely, personalized messages.",
    },
    {
      title: "Custom Reports",
      subtitle:
        "Generate tailored reports to measure results and uncover opportunities.",
    },
    {
      title: "Team Collaboration",
      subtitle:
        "Share updates instantly, assign tasks efficiently, and align your team.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto bg-white dark:bg-zinc-900 text-black dark:text-white">
      {/* Header */}
      <header className="text-left py-12">
        <h1 className="text-6xl font-semibold tracking-tight">
          Empowering developers <br /> with AI-driven solutions.
        </h1>
      </header>

      {/* Main Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-2 h-full">
        {/* Video / Image Card */}
        <Card className="lg:col-span-2 bg-zinc-200 dark:bg-zinc-800 p-2 overflow-hidden relative mb-4 lg:mb-0 flex flex-col min-h-[500px]">
          <CardContent className="p-0 relative flex-grow group">
            {isPlaying ? (
              <video
                src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/crm(1)(1)(1).mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <>
                <Image
                  width={500}
                  height={500}
                  src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/crm-featured.png"
                  alt="CRM Thumbnail"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <PlayCircle className="w-12 h-12 sm:w-16 sm:h-16 text-white drop-shadow-lg" />
                </button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 h-full">
          {crmFeatures.map((feature, i) => (
            <div
              key={i}
              className="flex flex-col border border-zinc-200 dark:border-zinc-800 rounded-xl p-2 hover:shadow-lg cursor-pointer transition-shadow"
            >
              <Card className="bg-zinc-200 dark:bg-zinc-800 flex-grow rounded-lg p-0" />
              <div className="mt-2">
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {feature.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Integrations */}
      <section className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-1 text-sm">
        {[
          {
            name: "Salesforce",
            subtitle: "Enterprise CRM platform",
            domain: "salesforce.com",
          },
          {
            name: "HubSpot CRM",
            subtitle: "Inbound marketing & sales",
            domain: "hubspot.com",
          },
          {
            name: "Zoho CRM",
            subtitle: "Affordable CRM solution",
            domain: "zoho.com",
          },
          {
            name: "Pipedrive",
            subtitle: "Sales pipeline management",
            domain: "pipedrive.com",
          },
          {
            name: "Freshsales",
            subtitle: "Freshworks sales CRM",
            domain: "freshworks.com",
          },
          {
            name: "Microsoft Dynamics 365",
            subtitle: "Microsoft business suite",
            domain: "dynamics.com",
          },
          {
            name: "Copper CRM",
            subtitle: "Google Workspace CRM",
            domain: "copper.com",
          },
          {
            name: "Insightly",
            subtitle: "Project & CRM management",
            domain: "insightly.com",
          },
        ].map((integration) => (
          <div
            key={integration.name}
            className="p-3 flex items-center gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-600 rounded-xl transition"
          >
            <Image
              src={`https://logo.clearbit.com/${integration.domain}`}
              alt={integration.name}
              width={40}
              height={40}
              className="w-10 h-10 object-contain rounded-xl bg-white p-1"
            />
            <div>
              <div className="font-normal">{integration.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {integration.subtitle}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="text-center py-12">
        <div>Browse your fit</div>
      </footer>
    </div>
  );
}
