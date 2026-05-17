"use client";

import Script from "next/script";
import { siteConfig } from "@/config/site";

export function Analytics() {
  return (
    <>
      {/* Schema.org — Organization */}
      <Script id="org-jsonld" type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": ${JSON.stringify(siteConfig.name)},
          "url": ${JSON.stringify(siteConfig.url)},
          "logo": "${siteConfig.url}/favicon.ico",
          "description": ${JSON.stringify(siteConfig.longDescription)},
          "sameAs": [
            ${JSON.stringify(siteConfig.links.twitter)},
            ${JSON.stringify(siteConfig.links.github)},
            ${JSON.stringify(siteConfig.links.pro)}
          ]
        }
      `}</Script>

      {/* Schema.org — WebSite with SearchAction */}
      <Script id="website-jsonld" type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": ${JSON.stringify(siteConfig.name)},
          "url": ${JSON.stringify(siteConfig.url)},
          "description": ${JSON.stringify(siteConfig.description)},
          "publisher": {
            "@type": "Organization",
            "name": ${JSON.stringify(siteConfig.name)},
            "url": ${JSON.stringify(siteConfig.url)}
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "${siteConfig.url}/docs?search={search_term_string}",
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
