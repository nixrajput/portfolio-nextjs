import "./globals.scss";

export const metadata = {
  title: "Nikhil Rajput - Portfolio",
  description: "Nikhil Rajput's Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
