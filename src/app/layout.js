import "./globals.scss";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["devanagari", "latin"],
  display: "swap",
});

export const metadata = {
  title: "Nikhil Rajput",
  name: "Nikhil Rajput",
  description: "Nikhil Rajput's Portfolio",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className={poppins.className}>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
