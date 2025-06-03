import { Geist, Cardo } from "next/font/google";

import type { Metadata } from "next";

import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { rootMetaData } from "@/config/root-metadata";
import { TRPCReactProvider } from "@/trpc/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cardo = Cardo({
  weight: ["400", "700"],
  variable: "--font-cardo",
  subsets: ["latin"],
});

export const metadata: Metadata = rootMetaData;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`w-screen h-screen overflow-hidden ${geistSans.variable} ${cardo.variable} antialiased`}>
        <TooltipProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
          <Toaster richColors theme="light" position="top-right" />
        </TooltipProvider>
      </body>
    </html>
  );
}
