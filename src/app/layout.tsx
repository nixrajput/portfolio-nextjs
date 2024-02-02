import "./globals.scss";
import ScrollToTop from "@/components/common/ScrollToTop";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["devanagari", "latin"],
  display: "swap",
  preload: true,
  fallback: [
    "system-ui",
    "arial",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Fira Sans",
    "Droid Sans",
  ],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Nikhil Rajput",
  description:
    "Nikhil Rajput is a proficient Full Stack Developer, skilled in seamlessly integrating front-end and back-end technologies while excelling in design.",
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
  icons: [
    {
      url: "/favicon.ico",
      rel: "icon",
      sizes: "any",
      type: "image/svg+xml",
    },
  ],
};

const RootLayout = ({ children }: {children: React.ReactNode}) => {
  return (
    <html lang="en" className={[poppins.variable].join(" ")}>
      <body
        className={`bg-[var(--bgColor)] ${
          process.env.NODE_ENV === "development" ? "debug-screens" : ""
        }`}
      >
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
};

export default RootLayout;
