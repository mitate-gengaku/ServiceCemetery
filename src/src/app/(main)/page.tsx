import React from "react";

import { AuthCemetery } from "@/components/clients/auth-cemetery";
import { GuestCemetery } from "@/components/clients/guest-cemetery";
import { InfoSection } from "@/components/clients/top";
import { RegisterFormSection } from "@/components/container/register-form-section";
import { LeftSectionContainer } from "@/components/layout/left-section-container";
import { MainContainer } from "@/components/layout/main-container";
import { CanvasContainer } from "@/components/libs/@react-three/canvas-container";
import { CEMETERY_PROJECTS } from "@/config/cemetery";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

const Home = async () => {
  const session = await auth();
  const projects = session ? await api.project.all() : CEMETERY_PROJECTS;

  return (
    <HydrateClient>
      <MainContainer>
        <LeftSectionContainer>
          {session ? <RegisterFormSection projects={projects} /> : <InfoSection />}
        </LeftSectionContainer>
        <CanvasContainer>
          {session ? <AuthCemetery authId={session.user.id} projects={projects} /> : <GuestCemetery />}
        </CanvasContainer>
      </MainContainer>
    </HydrateClient>
  );
};

export default Home;
