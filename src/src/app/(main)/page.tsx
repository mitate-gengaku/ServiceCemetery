import React from "react";

import { InfoSection } from "@/components/clients/top";
import { MainCanvas } from "@/components/libs/@react-three/main";
import { auth } from "@/server/auth";
import { MainContainer } from "@/components/layout/main-container";
import { LeftSectionContainer } from "@/components/layout/left-section-container";
import { HydrateClient } from "@/trpc/server";
import { RegisterFormSection } from "@/components/clients/create-form-section";

const Home = async () => {
  const session = await auth();

  /*if (!session) {
    return (
      <div className="w-full h-full relative flex flex-col md:flex-row">
        <TopSection>
          <TopSectionClient />
        </TopSection>
        <MainCanvas isMyProject={false} />
      </div>
    );
  }

  return <AuthHome />;*/
  return (
    <HydrateClient>
      <MainContainer>
        <LeftSectionContainer>
          {session ? <RegisterFormSection /> : <InfoSection />}
        </LeftSectionContainer>
      </MainContainer>
    </HydrateClient>
  )
};

export default Home;
