"use client";

import { useCharacterLimit } from "@/hooks/use-character-limit";
import { useImageUpload } from "@/hooks/use-image-upload";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImagePlus } from "lucide-react";
import { useId } from "react";

export const codeStringDialog_01 = `
"use client";

import { useCharacterLimit } from "@/hooks/use-character-limit";
import { useImageUpload } from "@/hooks/use-image-upload";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImagePlus } from "lucide-react";
import { useId } from "react";


export default function Dialog_01() {
  const id = useId();
  const maxLength = 180;
  const { value, characterCount, handleChange, maxLength: limit } = useCharacterLimit({
    maxLength,
    initialValue: "I'm passionate about building user-centric applications that solve problems.",
  });

  const {
    previewUrl,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
  } = useImageUpload();

  const profileImage = previewUrl || "https://github.com/shadcn.png";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden rounded-2xl border">
        <div
          className="px-6 py-4 h-36"
          style={{
            background: "radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%)",
          }}
        />

        <div className="-mt-14 flex justify-center">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-background shadow-lg rounded-full">
              <AvatarImage src={profileImage} alt="Profile" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <button
              onClick={handleThumbnailClick}
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
              aria-label="Change profile picture"
            >
              <ImagePlus size={16} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
          </div>
        </div>

        <div className="max-h-[50vh] overflow-y-auto px-6 py-6 space-y-4">
          <form className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-1.5">
                <Label htmlFor={\`\${id}-name\`}>Full Name</Label>
                <Input id={\`\${id}-name\`} placeholder="E.g. John Doe" defaultValue="Margaret Villard" />
              </div>
              <div className="flex-1 space-y-1.5">
                <Label htmlFor={\`\${id}-role\`}>Role</Label>
                <Input id={\`\${id}-role\`} placeholder="Frontend Developer" defaultValue="Web Developer" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-1.5">
                <Label htmlFor={\`\${id}-email\`}>Email</Label>
                <Input id={\`\${id}-email\`} type="email" defaultValue="margaret@email.com" />
              </div>
              <div className="flex-1 space-y-1.5">
                <Label htmlFor={\`\${id}-portfolio\`}>Portfolio</Label>
                <Input id={\`\${id}-portfolio\`} defaultValue="https://margaret.com" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-1.5">
                <Label htmlFor={\`\${id}-location\`}>Location</Label>
                <Input id={\`\${id}-location\`} defaultValue="Bangalore, India" />
              </div>
              <div className="flex-1 space-y-1.5">
                <Label htmlFor={\`\${id}-company\`}>Company</Label>
                <Input id={\`\${id}-company\`} defaultValue="Ruixen UI" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-1.5">
                <Label htmlFor={\`\${id}-github\`}>GitHub</Label>
                <Input id={\`\${id}-github\`} placeholder="https://github.com/username" />
              </div>
              <div className="flex-1 space-y-1.5">
                <Label htmlFor={\`\${id}-linkedin\`}>LinkedIn</Label>
                <Input id={\`\${id}-linkedin\`} placeholder="https://linkedin.com/in/username" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={\`\${id}-about\`}>About</Label>
              <Textarea
                id={\`\${id}-about\`}
                placeholder="Tell us a little about yourself..."
                value={value}
                onChange={handleChange}
                maxLength={limit}
              />
              <p className="text-xs text-muted-foreground text-right">
                {limit - characterCount} characters left
              </p>
            </div>
          </form>
        </div>

        <DialogFooter className="border-t border-border px-6 py-4 bg-background rounded-b-2xl">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit">Save Changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
`;


export default function Dialog_01() {
  const id = useId();
  const maxLength = 180;
  const { value, characterCount, handleChange, maxLength: limit } = useCharacterLimit({
    maxLength,
    initialValue: "I'm passionate about building user-centric applications that solve problems.",
  });

  const {
    previewUrl,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
  } = useImageUpload();

  const profileImage = previewUrl || "https://github.com/shadcn.png";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden rounded-2xl border">
        <div
          className="px-6 py-4 h-36"
          style={{
            background: "radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%)",
          }}
        />

        <div className="-mt-14 flex justify-center">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-background shadow-lg rounded-full">
              <AvatarImage src={profileImage} alt="Profile" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <button
              onClick={handleThumbnailClick}
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
              aria-label="Change profile picture"
            >
              <ImagePlus size={16} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
          </div>
        </div>

        <div className="max-h-[50vh] overflow-y-auto px-6 py-6 space-y-4">
          <form className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-1.5">
                <Label htmlFor={`${id}-name`}>Full Name</Label>
                <Input id={`${id}-name`} placeholder="E.g. John Doe" defaultValue="Margaret Villard" />
              </div>
              <div className="flex-1 space-y-1.5">
                <Label htmlFor={`${id}-role`}>Role</Label>
                <Input id={`${id}-role`} placeholder="Frontend Developer" defaultValue="Web Developer" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-1.5">
                <Label htmlFor={`${id}-email`}>Email</Label>
                <Input id={`${id}-email`} type="email" defaultValue="margaret@email.com" />
              </div>
              <div className="flex-1 space-y-1.5">
                <Label htmlFor={`${id}-portfolio`}>Portfolio</Label>
                <Input id={`${id}-portfolio`} defaultValue="https://margaret.com" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-1.5">
                <Label htmlFor={`${id}-location`}>Location</Label>
                <Input id={`${id}-location`} defaultValue="Bangalore, India" />
              </div>
              <div className="flex-1 space-y-1.5">
                <Label htmlFor={`${id}-company`}>Company</Label>
                <Input id={`${id}-company`} defaultValue="Ruixen UI" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-1.5">
                <Label htmlFor={`${id}-github`}>GitHub</Label>
                <Input id={`${id}-github`} placeholder="https://github.com/username" />
              </div>
              <div className="flex-1 space-y-1.5">
                <Label htmlFor={`${id}-linkedin`}>LinkedIn</Label>
                <Input id={`${id}-linkedin`} placeholder="https://linkedin.com/in/username" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={`${id}-about`}>About</Label>
              <Textarea
                id={`${id}-about`}
                placeholder="Tell us a little about yourself..."
                value={value}
                onChange={handleChange}
                maxLength={limit}
              />
              <p className="text-xs text-muted-foreground text-right">
                {limit - characterCount} characters left
              </p>
            </div>
          </form>
        </div>

        <DialogFooter className="border-t border-border px-6 py-4 bg-background rounded-b-2xl">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit">Save Changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
