import "./globals.scss";
import NavBar from "@/components/navbar/NavBar";

export const metadata = {
  title: "Nikhil Rajput - Portfolio",
  description: "Nikhil Rajput's Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />;
      </head> */}

      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
