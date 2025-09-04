"use client";

import Script from "next/script";

export function Analytics() {
  return (
    <>
      {/* Schema.org Structured Data */}
      <Script id="structured-data" type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Ruixen",
          "url": "https://ruixen.com",
          "author": {
            "@type": "Person",
            "name": "Srinath"
          },
          "description": "Beautiful open source UI components built with Tailwind, Next.js, and Framer Motion."
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
