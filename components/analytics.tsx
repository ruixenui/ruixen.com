"use client";

import Script from "next/script";

export function Analytics() {
  return (
    <>
      {/* Schema.org — Organization */}
      <Script id="org-jsonld" type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Ruixen UI",
          "url": "https://ruixen.com",
          "logo": "https://ruixen.com/favicon.ico",
          "description": "170+ free, open-source React components built with Tailwind CSS, TypeScript & Framer Motion.",
          "sameAs": [
            "https://twitter.com/ruixen_ui",
            "https://github.com/ruixenui/ruixen.com"
          ]
        }
      `}</Script>

      {/* Schema.org — WebSite with SearchAction */}
      <Script id="website-jsonld" type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Ruixen UI",
          "url": "https://ruixen.com",
          "description": "170+ free, open-source React components built with Tailwind CSS, TypeScript & Framer Motion. Copy-paste into Next.js projects.",
          "publisher": {
            "@type": "Organization",
            "name": "Ruixen UI",
            "url": "https://ruixen.com"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://ruixen.com/docs?search={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
      `}</Script>

      {/* Google Analytics */}
      <Script
        async
        defer
        src="https://www.googletagmanager.com/gtag/js?id=G-B7DGE8GJRF"
      ></Script>
      <Script id="gtag-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-B7DGE8GJRF');

        // Theme initialization
        (function() {
          try {
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (savedTheme === 'light') {
              document.documentElement.classList.remove('dark');
              document.documentElement.classList.add('light');
            } else if (savedTheme === 'dark' || prefersDark) {
              document.documentElement.classList.remove('light');
              document.documentElement.classList.add('dark');
            }
          } catch (e) {
            console.error('Error setting theme:', e);
          }
        })();
      `}</Script>
    </>
  );
}
