import React from "react";

import { RegisterFormSection } from "@/components/clients/create-form-section";
import { InfoSection } from "@/components/clients/top";
import { LeftSectionContainer } from "@/components/layout/left-section-container";
import { MainContainer } from "@/components/layout/main-container";
import { CanvasSection } from "@/components/libs/@react-three/main";
import { auth } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import { CanvasContainer } from "@/components/libs/@react-three/canvas-container";
import { GuestCemetery } from "@/components/clients/guest-cemetery";

const Home = async () => {
  const session = await auth();

  return (
    <HydrateClient>
      <MainContainer>
        <LeftSectionContainer>{session ? <RegisterFormSection /> : <InfoSection />}</LeftSectionContainer>
        <CanvasContainer>{session ? <></> : <GuestCemetery /> }</CanvasContainer>
      </MainContainer>
    </HydrateClient>
  );
};

export default Home;
