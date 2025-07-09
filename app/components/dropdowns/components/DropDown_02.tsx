"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Eye,
  Pencil,
  Copy,
  Archive,
  Share2,
  Trash2,
  Mail,
  Link2,
  User,
  Lock,
  Settings,
  ShieldCheck,
  Globe,
} from "lucide-react";

export const codeStringDropDown_02 = `"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Eye,
  Pencil,
  Copy,
  Archive,
  Share2,
  Trash2,
  Mail,
  Link2,
  User,
  Lock,
  Settings,
  ShieldCheck,
  Globe,
} from "lucide-react";

export default function DropDown_02() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-muted"
          aria-label="More actions"
        >
          <MoreHorizontal size={18} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex items-center gap-2">
          <Eye size={14} /> View
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2">
          <Pencil size={14} /> Edit
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2">
          <Copy size={14} /> Duplicate
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2">
            <Share2 size={14} /> Share
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem className="flex items-center gap-2">
              <Mail size={14} /> Email
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Link2 size={14} /> Copy Link
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center gap-2">
                <User size={14} /> With Access
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Lock size={14} /> Private
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <ShieldCheck size={14} /> Organization
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Globe size={14} /> Public
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuItem className="flex items-center gap-2">
          <Archive size={14} /> Archive
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex items-center gap-2 text-red-600">
          <Trash2 size={14} className="text-red-600" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
`;

export default function DropDown_02() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-muted"
          aria-label="More actions"
        >
          <MoreHorizontal size={18} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Eye size={14} /> View
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Pencil size={14} /> Edit
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Copy size={14} /> Duplicate
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Share2 size={14} /> Share
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Mail size={14} /> Email
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Link2 size={14} /> Copy Link
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <User size={14} /> With Access
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Lock size={14} /> Private
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <ShieldCheck size={14} /> Organization
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Globe size={14} /> Public
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuItem className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Archive size={14} /> Archive
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex items-center gap-2 text-red-600 dark:text-red-400">
          <Trash2 size={14} className="text-red-600 dark:text-red-400" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
