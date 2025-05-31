import CustomNavBar from "@/components/nav/custom-nav-bar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  title: "Nikhil Rajput",
  description:
    "Nikhil Rajput is a proficient Software Development Engineer from India with over 2 years of experience in building scalable and performant web applications and crafting high-quality software solutions.",
  icons: {
    icon: [
      {
        url: "/favicon-16x16.ico",
        sizes: "16x16",
        type: "image/x-icon",
      },
      {
        url: "/favicon-32x32.ico",
        sizes: "32x32",
        type: "image/x-icon",
      },
      {
        url: "/favicon-48x48.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        url: "/favicon-64x64.ico",
        sizes: "64x64",
        type: "image/x-icon",
      },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  },
  metadataBase: new URL("https://nixrajput.com"),
  alternates: {
    canonical: "/",
  },
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
  keywords: [
    "nikhil rajput",
    "nikhil",
    "nixrajput",
    "nikhil-rajput",
    "rajput nikhil",
    "founder of nixlab",
    "nixlab founder",
    "full stack developer",
    "indian developer",
    "nixrajput github",
    "github nixrajput",
  ],
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_TOKEN,
    other: {
      me: [
        "nixrajput@gmail.com",
        "nkr.nikhil.nkr@gmail.com",
        "https://nixrajput.com",
      ],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CustomNavBar />
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
