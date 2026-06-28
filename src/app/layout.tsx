import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ReactNode } from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { HashScrollFix } from "@/components/util/HashScrollFix";
import { PersonJsonLd, WebSiteJsonLd } from "@/lib/seo/jsonld";
import { SITE } from "@/lib/seo/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | Nikhil Rajput`,
  },
  description: SITE.description,
  keywords: [
    "nikhil rajput",
    "nixrajput",
    "software engineer",
    "full-stack developer",
    "ai lead",
    "flutter",
    "react",
    "next.js",
    "node.js",
    "open source",
    "indian developer",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    locale: "en_US",
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    creator: SITE.handle,
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_TOKEN
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_TOKEN,
        },
      }
    : {}),
};

const ScrollToTop = dynamic(() => import("@/components/common/ScrollToTop"));

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className={GeistSans.className}>
        <PersonJsonLd />
        <WebSiteJsonLd />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
          <ScrollToTop />
        </ThemeProvider>
        <HashScrollFix />
        <VercelAnalytics />
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  );
};

export default RootLayout;
