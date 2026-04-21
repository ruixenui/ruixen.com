export interface FontDef {
  name: string;
  url: string;
}

export const FONTS: readonly FontDef[] = [
  {
    name: "DM Sans",
    url: "https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwARZthTg.ttf",
  },
  {
    name: "Bebas Neue",
    url: "https://fonts.gstatic.com/s/bebasneue/v16/JTUSjIg69CK48gW7PXooxW4.ttf",
  },
  {
    name: "Playfair Display",
    url: "https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKfsukDQ.ttf",
  },
  {
    name: "Righteous",
    url: "https://fonts.gstatic.com/s/righteous/v18/1cXxaUPXBpj2rGoU7C9mjw.ttf",
  },
  {
    name: "Black Ops One",
    url: "https://fonts.gstatic.com/s/blackopsone/v21/qWcsB6-ypo7xBdr6Xshe96H3WDw.ttf",
  },
  {
    name: "Permanent Marker",
    url: "https://fonts.gstatic.com/s/permanentmarker/v16/Fh4uPib9Iyv2ucM6pGQMWimMp004Hao.ttf",
  },
  {
    name: "Rubik Mono One",
    url: "https://fonts.gstatic.com/s/rubikmonoone/v20/UqyJK8kPP3hjw6ANTdfRk9YSN-8w.ttf",
  },
  {
    name: "Pacifico",
    url: "https://fonts.gstatic.com/s/pacifico/v23/FwZY7-Qmy14u9lezJ96A.ttf",
  },
  {
    name: "Oswald",
    url: "https://fonts.gstatic.com/s/oswald/v57/TK3_WkUHHAIjg75cFRf3bXL8LICs1xZogUE.ttf",
  },
  {
    name: "Archivo Black",
    url: "https://fonts.gstatic.com/s/archivoblack/v23/HTxqL289NzCGg4MzN6KJ7eW6OYs.ttf",
  },
];

/**
 * Same-origin proxy URL for a font. The browser's strict CSP `connect-src`
 * doesn't allow direct fetches to fonts.gstatic.com, so we route through the
 * Next.js API route and fetch server-side.
 */
export function fontProxyUrl(name: string): string {
  return `/api/tools/svg-to-3d/font?name=${encodeURIComponent(name)}`;
}
