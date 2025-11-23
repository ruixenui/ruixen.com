"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ShadowState, cssOutput, tailwindOutput, componentSnippet, copyToClipboard, downloadFile } from "@/lib/shadow"

export default function CodeOutput({ state }: { state: ShadowState }) {
  const [tab, setTab] = useState<"css" | "tw" | "snippet">("tw")

  const css = useMemo(() => cssOutput(state.layers, state.preview.radius, state.preview.border, state.preview.borderColor), [state])
  const tw = useMemo(() => tailwindOutput(state.layers, state.preview.radius, state.preview.border, state.preview.borderColor), [state])
  const snippet = useMemo(() => componentSnippet(state.layers, state.preview.radius, state.preview.border, state.preview.borderColor), [state])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Export</CardTitle>
        <CardDescription>Copy Tailwind or download CSS and a ready-to-use component snippet.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
          <TabsList>
            <TabsTrigger value="tw">Tailwind</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
            <TabsTrigger value="snippet">Component</TabsTrigger>
          </TabsList>

          <TabsContent value="tw">
            <Textarea className="font-mono text-xs min-h-[160px]" readOnly value={tw} />
            <div className="mt-3 flex flex-wrap gap-2">
              <Button size="sm" onClick={() => copyToClipboard(tw)}>Copy</Button>
              <Button size="sm" variant="outline" onClick={() => downloadFile("shadow-tailwind.html", tw, "text/html")}>Download Snippet</Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              If you generate classes dynamically, safelist the resulting <code>shadow-[...]</code> class in your Tailwind config.
            </p>
          </TabsContent>

          <TabsContent value="css">
            <Textarea className="font-mono text-xs min-h-[200px]" readOnly value={css} />
            <div className="mt-3 flex flex-wrap gap-2">
              <Button size="sm" onClick={() => copyToClipboard(css)}>Copy</Button>
              <Button size="sm" variant="outline" onClick={() => downloadFile("shadow.css", css, "text/css")}>Download .css</Button>
            </div>
          </TabsContent>

          <TabsContent value="snippet">
            <Textarea className="font-mono text-xs min-h-[200px]" readOnly value={snippet} />
            <div className="mt-3 flex flex-wrap gap-2">
              <Button size="sm" onClick={() => copyToClipboard(snippet)}>Copy</Button>
              <Button size="sm" variant="outline" onClick={() => downloadFile("ShadowCard.tsx", snippet, "text/plain")}>Download Component</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
