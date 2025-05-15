import React from "react";

import { Header } from "@/components/layout/header";

const MainLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Header />
      <main className="w-full h-full font-geist-sans overflow-x-hidden relative">{children}</main>
    </>
  );
};
export default MainLayout;
