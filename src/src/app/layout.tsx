import { Geist, Cardo } from "next/font/google";

import type { Metadata } from "next";

import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/react";
import { rootMetaData } from "@/config/root-metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cardo = Cardo({
  weight: ["400", "700"],
  variable: "--font-cardo",
  subsets: ["latin"],
});

export const metadata: Metadata = rootMetaData

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`w-screen h-screen overflow-hidden ${geistSans.variable} ${cardo.variable} antialiased`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster richColors theme="light" position="top-right" />
      </body>
    </html>
  );
}
