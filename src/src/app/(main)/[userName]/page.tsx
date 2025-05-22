import { notFound } from "next/navigation";
import React from "react";

import { UserSection } from "@/components/clients/user-section";
import { MainCanvas } from "@/components/libs/@react-three/main";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { MainContainer } from "@/components/layout/main-container";
import { LeftSectionContainer } from "@/components/layout/left-section-container";

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

  /*return (
    <HydrateClient>
      <div className="w-full h-full relative flex flex-col md:flex-row">
        <TopSection>
          <UserSection userName={user.name} imageUrl={user.image} languages={languages} />
        </TopSection>
        <MainCanvas isMyProject={session ? user.id === session.user.id : false} projects={user.projects} auth={session ? true : false} />
      </div>
    </HydrateClient>
  );*/

  return (
    <HydrateClient>
      <MainContainer>
        <LeftSectionContainer>
          <UserSection 
            userName={user.name}
            imageUrl={user.image}
            languages={languages}
            />
        </LeftSectionContainer>
      </MainContainer>
    </HydrateClient>
  )
};

export default UserPage;
