import { Geist, Cardo } from "next/font/google";

import type { Metadata } from "next";

import "@/app/globals.css";
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

export const metadata: Metadata = {
  title: "RiPro | 失敗も成功も、すべては財産",
  description:
    "終了したプロジェクトの記録と教訓を大切に保存するサービスです。成功も失敗も、すべての経験を組織の財産として継承し、次世代のプロジェクトに活かします。過去から学び、未来を創るため共有しましょう。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`w-screen h-screen ${geistSans.variable} ${cardo.variable} antialiased`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
