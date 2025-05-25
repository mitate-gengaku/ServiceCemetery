import { notFound } from "next/navigation";
import React from "react";

import { AuthCemetery } from "@/components/clients/auth-cemetery";
import { UserSection } from "@/components/clients/user-section";
import { LeftSectionContainer } from "@/components/layout/left-section-container";
import { MainContainer } from "@/components/layout/main-container";
import { CanvasContainer } from "@/components/libs/@react-three/canvas-container";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

interface Props {
  params: Promise<{ userName: string }>;
}

const UserPage = async ({ params }: Props) => {
  const session = await auth();
  const { userName } = await params;
  const user = await api.user.user({
    name: userName,
  });

  if (!user) {
    notFound();
  }

  const languages = user.projects.map(({ languages }) => ({
    ...languages,
  }));

  return (
    <HydrateClient>
      <MainContainer>
        <LeftSectionContainer>
          <UserSection userName={user.name} imageUrl={user.image} languages={languages} />
        </LeftSectionContainer>
        <CanvasContainer>
          <AuthCemetery authId={session ? session.user.id : ""} projects={user.projects} />
        </CanvasContainer>
      </MainContainer>
    </HydrateClient>
  );
};

export default UserPage;
