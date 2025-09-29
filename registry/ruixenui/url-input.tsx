"use client";

import { useEffect, useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe } from "lucide-react";

export default function UrlInput() {
  const id = useId();
  const [url, setUrl] = useState("");
  const [favicon, setFavicon] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setFavicon(null);
      return;
    }

    try {
      const parsedUrl = new URL(
        url.startsWith("http") ? url : `https://${url}`,
      );
      const faviconUrl = `${parsedUrl.origin}/favicon.ico`;
      setFavicon(faviconUrl);
    } catch {
      setFavicon(null);
    }
  }, [url]);

  return (
    <div className="space-y-2 max-w-md mx-auto">
      <Label htmlFor={id}>Website URL</Label>
      <div className="relative">
        <Input
          id={id}
          className="peer ps-12 rounded-lg"
          placeholder="example.com"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <span className="absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
          {favicon ? (
            <img
              src={favicon}
              alt="favicon"
              className="h-5 w-5 rounded-sm"
              onError={() => setFavicon(null)} // fallback if favicon missing
            />
          ) : (
            <Globe className="h-5 w-5 text-muted-foreground" />
          )}
        </span>
      </div>
    </div>
  );
}
