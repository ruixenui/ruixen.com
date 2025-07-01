"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileCardProps {
  defaultValues?: {
    name: string;
    username: string;
    avatar: string;
    bio: string;
    location?: string;
    website?: string;
    twitter?: string;
    instagram?: string;
  };
}

export const codeStringProfile_03 = `"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileCardProps {
  defaultValues?: {
    name: string;
    username: string;
    avatar: string;
    bio: string;
    location?: string;
    website?: string;
    twitter?: string;
    instagram?: string;
  };
}

export default function Profile_03({ defaultValues }: ProfileCardProps) {
  const [avatar, setAvatar] = useState(defaultValues?.avatar);
  const [bio, setBio] = useState(defaultValues?.bio);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [loadingBio, setLoadingBio] = useState(false);

  const handleGenerateAvatar = () => {
    setLoadingAvatar(true);
    setTimeout(() => {
      setAvatar(\`https://api.dicebear.com/7.x/identicon/svg?seed=\${Math.random().toString(36).substring(7)}\`);
      setLoadingAvatar(false);
    }, 1200);
  };

  const handleGenerateBio = () => {
    setLoadingBio(true);
    setTimeout(() => {
      setBio("Creative developer blending design and technology to craft seamless experiences.");
      setLoadingBio(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-md border border-zinc-200 dark:border-zinc-800 space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20 rounded-xl border border-zinc-300 dark:border-zinc-700 shadow">
          <AvatarImage src={avatar} className="object-cover" />
          <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800">SC</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleGenerateAvatar}
            disabled={loadingAvatar}
            className="flex items-center gap-2"
          >
            {loadingAvatar ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            <span>AI Suggest Avatar</span>
          </Button>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Profile picture powered by AI</p>
        </div>
      </div>

      <div className="grid gap-4">
        <div>
          <Label htmlFor="name" className="text-sm text-zinc-700 dark:text-zinc-300">Full Name</Label>
          <Input id="name" placeholder="John Doe" defaultValue={defaultValues?.name} />
        </div>
        <div>
          <Label htmlFor="username" className="text-sm text-zinc-700 dark:text-zinc-300">Username</Label>
          <Input id="username" placeholder="@username" defaultValue={defaultValues?.username} />
        </div>
      </div>

      <div className="grid gap-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="bio" className="text-sm text-zinc-700 dark:text-zinc-300">Bio</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleGenerateBio}
            disabled={loadingBio}
            className="flex items-center gap-1 text-xs text-zinc-600 dark:text-zinc-400"
          >
            {loadingBio ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
            AI Generate
          </Button>
        </div>
        <Textarea
          id="bio"
          placeholder="A short description about you..."
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        <Label className="text-sm text-zinc-700 dark:text-zinc-300">Social Links</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input id="website" placeholder="Website (https://)" defaultValue={defaultValues?.website} />
          <Input id="twitter" placeholder="Twitter handle" defaultValue={defaultValues?.twitter} />
          <Input id="instagram" placeholder="Instagram handle" defaultValue={defaultValues?.instagram} />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
`;


export default function Profile_03({ defaultValues }: ProfileCardProps) {
  const [avatar, setAvatar] = useState(defaultValues?.avatar);
  const [bio, setBio] = useState(defaultValues?.bio);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [loadingBio, setLoadingBio] = useState(false);

  const handleGenerateAvatar = () => {
    setLoadingAvatar(true);
    setTimeout(() => {
      setAvatar(`https://api.dicebear.com/7.x/identicon/svg?seed=${Math.random().toString(36).substring(7)}`);
      setLoadingAvatar(false);
    }, 1200);
  };

  const handleGenerateBio = () => {
    setLoadingBio(true);
    setTimeout(() => {
      setBio("Creative developer blending design and technology to craft seamless experiences.");
      setLoadingBio(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-md border border-zinc-200 dark:border-zinc-800 space-y-6">
      
      {/* Header Section */}
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20 rounded-xl border border-zinc-300 dark:border-zinc-700 shadow">
          <AvatarImage src={avatar} className="object-cover" />
          <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800">SC</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleGenerateAvatar}
            disabled={loadingAvatar}
            className="flex items-center gap-2"
          >
            {loadingAvatar ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            <span>AI Suggest Avatar</span>
          </Button>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Profile picture powered by AI</p>
        </div>
      </div>

      {/* Basic Details */}
      <div className="grid gap-4">
        <div>
          <Label htmlFor="name" className="text-sm text-zinc-700 dark:text-zinc-300">Full Name</Label>
          <Input id="name" placeholder="John Doe" defaultValue={defaultValues?.name} />
        </div>

        <div>
          <Label htmlFor="username" className="text-sm text-zinc-700 dark:text-zinc-300">Username</Label>
          <Input id="username" placeholder="@username" defaultValue={defaultValues?.username} />
        </div>
      </div>

      {/* Bio Section */}
      <div className="grid gap-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="bio" className="text-sm text-zinc-700 dark:text-zinc-300">Bio</Label>
          <Button variant="ghost" size="sm" onClick={handleGenerateBio} disabled={loadingBio} className="flex items-center gap-1 text-xs text-zinc-600 dark:text-zinc-400">
            {loadingBio ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
            AI Generate
          </Button>
        </div>
        <Textarea
          id="bio"
          placeholder="A short description about you..."
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>

      {/* Social Links */}
      <div className="grid gap-4">
        <Label className="text-sm text-zinc-700 dark:text-zinc-300">Social Links</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input id="website" placeholder="Website (https://)" defaultValue={defaultValues?.website} />
          <Input id="twitter" placeholder="Twitter handle" defaultValue={defaultValues?.twitter} />
          <Input id="instagram" placeholder="Instagram handle" defaultValue={defaultValues?.instagram} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
