"use client";

import { Button } from "@/components/ui/button copy";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export const codeStringForm_01 = `"use client";

import { Button } from "@/components/ui/button copy";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function Form_01() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 px-4 py-8">
      {/* Section: Header */}
      <h2 className="text-xl font-semibold text-center mb-4">User Profile Form</h2>

      {/* Personal Info */}
      <div className="grid gap-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="first-name">First Name</Label>
            <Input id="first-name" placeholder="John" />
          </div>
          <div>
            <Label htmlFor="last-name">Last Name</Label>
            <Input id="last-name" placeholder="Doe" />
          </div>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" placeholder="+91 98765 43210" />
        </div>
      </div>

      <Separator />

      {/* Company Info */}
      <div className="grid gap-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="company">Company</Label>
            <Input id="company" placeholder="OpenAI Inc." />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Input id="role" placeholder="Engineer" disabled />
          </div>
        </div>
        <div>
          <Label htmlFor="desc">Company Description</Label>
          <Textarea id="desc" rows={3} placeholder="Short company description" />
        </div>
      </div>

      <Separator />

      {/* Preferences */}
      <div className="grid gap-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="language">Language</Label>
            <Select defaultValue="english">
              <SelectTrigger>
                <SelectValue placeholder="Choose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="timezone">Timezone</Label>
            <Input id="timezone" placeholder="Asia/Kolkata" />
          </div>
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" rows={2} placeholder="Interests or experience" />
        </div>
      </div>

      <Separator />

      {/* Uploads */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="profile-pic">Profile Picture</Label>
          <Input id="profile-pic" type="file" />
        </div>
        <div>
          <Label htmlFor="resume">Resume (PDF)</Label>
          <Input id="resume" type="file" accept="application/pdf" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-4">
        <Button variant="outline" type="button">
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </div>
  );
}
`;

export default function Form_01() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 px-4 py-8">
      {/* Section: Header */}
      <h2 className="text-xl font-semibold text-center mb-4">User Profile Form</h2>

      {/* Personal Info */}
      <div className="grid gap-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="first-name">First Name</Label>
            <Input id="first-name" placeholder="John" />
          </div>
          <div>
            <Label htmlFor="last-name">Last Name</Label>
            <Input id="last-name" placeholder="Doe" />
          </div>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" placeholder="+91 98765 43210" />
        </div>
      </div>

      <Separator />

      {/* Company Info */}
      <div className="grid gap-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="company">Company</Label>
            <Input id="company" placeholder="OpenAI Inc." />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Input id="role" placeholder="Engineer" disabled />
          </div>
        </div>
        <div>
          <Label htmlFor="desc">Company Description</Label>
          <Textarea id="desc" rows={3} placeholder="Short company description" className=" border border-gray-300 dark:border-gray-600"/>
        </div>
      </div>

      <Separator />

      {/* Preferences */}
      <div className="grid gap-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="language">Language</Label>
            <Select defaultValue="english">
              <SelectTrigger>
                <SelectValue placeholder="Choose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="timezone">Timezone</Label>
            <Input id="timezone" placeholder="Asia/Kolkata" />
          </div>
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" rows={2} placeholder="Interests or experience" className=" border border-gray-300 dark:border-gray-600"/>
        </div>
      </div>

      <Separator />

      {/* Uploads */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="profile-pic">Profile Picture</Label>
          <Input id="profile-pic" type="file" />
        </div>
        <div>
          <Label htmlFor="resume">Resume (PDF)</Label>
          <Input id="resume" type="file" accept="application/pdf" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-4">
        <Button variant="outline" type="button">
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </div>
  );
}
