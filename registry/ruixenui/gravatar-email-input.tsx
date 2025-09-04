"use client";

import { useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import md5 from "md5";

interface GravatarEmailInputProps {
  label?: string;
  placeholder?: string;
  initialValue?: string;
  onChange?: (email: string) => void;
}

export default function GravatarEmailInput({
  label = "Enter your email",
  placeholder = "you@example.com",
  initialValue = "",
  onChange,
}: GravatarEmailInputProps) {
  const id = useId();
  const [email, setEmail] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    onChange?.(val);
  };

  // Generate gravatar URL if valid email
  const getAvatar = (email: string) => {
    if (!email.includes("@")) return null;
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
  };

  const avatarUrl = getAvatar(email);

  return (
    <div className="w-full max-w-md mx-auto space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <div className="relative group">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="Avatar"
            width={24}
            height={24}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border shadow-sm"
          />
        ) : (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
            ?
          </div>
        )}

        <Input
          id={id}
          type="email"
          value={email}
          onChange={handleChange}
          placeholder={placeholder}
          className="pl-12 h-12 rounded-2xl border border-muted bg-background/80 shadow-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/40"
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Stay updated with our latest news & articles.
      </p>
    </div>
  );
}
