import React from "react";

import type { Metadata } from "next";

import { Header } from "@/components/layout/header";

export const meta: Metadata = {
  title: "RiPro | 失敗も成功も、すべては財産",
  description:
    "終了したプロジェクトの記録と教訓を大切に保存するサービスです。成功も失敗も、すべての経験を組織の財産として継承し、次世代のプロジェクトに活かします。過去から学び、未来を創るため共有しましょう。",
};

const MainLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Header />
      <main className="w-full h-[calc(100%-64px)] font-geist-sans overflow-x-hidden">{children}</main>
    </>
  );
};
export default MainLayout;
