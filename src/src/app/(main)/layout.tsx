import React from "react";

import { Header } from "@/components/layout/header";

const MainLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Header />
      <main className="w-full h-[calc(100%-64px)] font-geist-sans">{children}</main>
    </>
  );
};
export default MainLayout;
