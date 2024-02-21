import { ReactNode } from "react";
import { Metadata } from "next";
import NavBar from "@/components/navbar/NavBar";
import ScrollToTop from "@/components/common/ScrollToTop";

export const metadata: Metadata = {
  title: "Project",
  description: "Project Detail",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={
          process.env.NODE_ENV === "development" ? "debug-screens" : ""
        }
      >
        <NavBar />
        <main> {children}</main>
        <ScrollToTop />
      </body>
    </html>
  );
};

export default RootLayout;
