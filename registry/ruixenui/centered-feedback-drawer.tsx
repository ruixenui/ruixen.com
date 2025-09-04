"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function CenteredFeedbackDrawer() {
  const [rating, setRating] = useState(0);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="default">Give Feedback</Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="flex flex-col items-center justify-center text-center py-8 px-4">
          <DrawerHeader className="max-w-md space-y-2">
            <DrawerTitle className="text-xl font-bold">
              We Value Your Feedback
            </DrawerTitle>
            <DrawerDescription>
              Help us improve by sharing your thoughts.
            </DrawerDescription>
          </DrawerHeader>

          {/* Form area */}
          <div className="w-full max-w-md space-y-4 mt-4">
            {/* Name */}
            <div className="grid gap-2 text-left">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="Your name" />
            </div>

            {/* Email */}
            <div className="grid gap-2 text-left">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>

            {/* Rating */}
            <div className="grid gap-2 text-left">
              <Label>Rate your experience</Label>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 cursor-pointer ${
                      rating >= star
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-400"
                    }`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="grid gap-2 text-left">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Tell us about your experience..."
                className="min-h-[100px]"
              />
            </div>
          </div>

          {/* Footer */}
          <DrawerFooter className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-6">
            <Button className="w-full">Submit Feedback</Button>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
