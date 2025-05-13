import React from "react";

import { TopSectionClient } from "@/components/clients/top";
import { AuthHome } from "@/components/pages/home";
import { TopSection } from "@/components/utils/top-section";
import { auth } from "@/server/auth";

const Home = async () => {
  const session = await auth();

  if (!session) {
    return (
      <div className="w-full h-full relative flex flex-col md:flex-row">
        <TopSection>
          <TopSectionClient />
        </TopSection>
        {/**
         * <MainCanvas isMyProject={true} />
         */}
      </div>
    );
  }

  return <AuthHome />;
};

export default Home;
