"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SmilePlus, SendHorizonal } from "lucide-react";
import { useState } from "react";

export const codeStringDialog_03 = `
"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SmilePlus, SendHorizonal } from "lucide-react";
import { useState } from "react";

export default function Dialog_03() {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    console.log("User feedback:", feedback);
    setFeedback(""); // Reset after submission
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <SmilePlus className="mr-2 h-4 w-4" />
          Give Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg sm:rounded-lg shadow-xl border bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            We’d love your feedback
          </DialogTitle>
          <DialogDescription>
            Tell us what you think! Your thoughts help us improve the experience.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Textarea
            placeholder="Your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <DialogFooter className="mt-4">
          <Button variant="ghost">Cancel</Button>
          <Button onClick={handleSubmit}>
            <SendHorizonal className="h-4 w-4 mr-2" />
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
`;

export default function Dialog_03() {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    console.log("User feedback:", feedback);
    setFeedback(""); // Reset after submission
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <SmilePlus className="mr-2 h-4 w-4" />
          Give Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg sm:rounded-lg shadow-xl border bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            We’d love your feedback
          </DialogTitle>
          <DialogDescription>
            Tell us what you think! Your thoughts help us improve the experience.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Textarea
            placeholder="Your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <DialogFooter className="mt-4">
          <Button variant="ghost">Cancel</Button>
          <Button onClick={handleSubmit}>
            <SendHorizonal className="h-4 w-4 mr-2" />
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
