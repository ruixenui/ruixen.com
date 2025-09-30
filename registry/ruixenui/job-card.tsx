"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface JobCardProps {
  title?: string;
  company?: string;
  rate?: string;
  location?: string;
  type?: string;
  experience?: string;
  logoUrl?: string;
}

export default function JobCard({
  title = "Software Engineer",
  company = "Tech Corp",
  rate = "$80k - $100k",
  location = "Remote",
  type = "Full-time",
  experience = "2+ years",
  logoUrl = "",
}: JobCardProps) {
  return (
    <Card className="w-80 rounded-2xl shadow-sm border border-border bg-card text-card-foreground transition-colors">
      {/* Header with avatar + rate */}
      <CardHeader className="flex flex-row items-center justify-between px-4 py-6">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={logoUrl} alt={company} />
            <AvatarFallback>{company.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{company}</p>
            <p className="text-sm text-muted-foreground">{rate}</p>
          </div>
        </div>
      </CardHeader>

      {/* Main content */}
      <CardContent className="px-4 py-3">
        <h2 className="text-xl font-medium leading-snug">{title}</h2>
        <div className="mt-3 space-y-2 text-sm">
          <p>
            <span className="font-medium">Location:</span> {location}
          </p>
          <p>
            <span className="font-medium">Type:</span> {type}
          </p>
          <p>
            <span className="font-medium">Experience:</span> {experience}
          </p>
        </div>
      </CardContent>

      {/* Footer with multiple buttons */}
      <CardFooter className="flex justify-between gap-2 px-4 py-6 border-t">
        <Button variant="outline" className="rounded-xl px-4">
          Save
        </Button>
        <div className="flex gap-2">
          <Button variant="secondary" className="rounded-xl px-4">
            Share
          </Button>
          <Button variant="default" className="rounded-xl px-6">
            Apply
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
