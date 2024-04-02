import { Viewport, Metadata } from "next";
import Providers from "./providers";

export const viewport: Viewport = {
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "Von Neumann machine simulator",
  description: "A simulator for the Von Neumann machine",
  manifest: "/manifest.json",
  icons: [
    "/images/icons/32x32.png",
    "/images/icons/64x64.png",
    "/images/icons/96x96.png",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
