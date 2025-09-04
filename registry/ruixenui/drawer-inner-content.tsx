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

function DrawerInnerContent() {
  return (
    <>
      <DrawerHeader>
        <DrawerTitle>Newsletter Signup</DrawerTitle>
        <DrawerDescription>
          Stay updated! Subscribe to our newsletter for latest updates.
        </DrawerDescription>
      </DrawerHeader>

      <div className="p-4 space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
      </div>

      <DrawerFooter>
        <Button>Subscribe</Button>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </>
  );
}

export default function FourSideDrawers() {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center h-screen">
      {/* Bottom Drawer */}
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerInnerContent />
        </DrawerContent>
      </Drawer>

      {/* Left Drawer */}
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <Button variant="outline">Left</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerInnerContent />
        </DrawerContent>
      </Drawer>

      {/* Right Drawer */}
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="outline">Right</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerInnerContent />
        </DrawerContent>
      </Drawer>
    </div>
  );
}
