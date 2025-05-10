import { Geist, Cardo } from "next/font/google";

import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cardo = Cardo({
  weight: ["400", "700"],
  variable: "--font-cardo",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`w-screen h-screen ${geistSans.variable} ${cardo.variable} antialiased`}>{children}</body>
    </html>
  );
}
