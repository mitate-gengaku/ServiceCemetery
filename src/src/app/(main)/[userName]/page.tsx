import { notFound } from "next/navigation";
import React from "react";

import { UserSection } from "@/components/clients/user-section";
import { MainCanvas } from "@/components/libs/@react-three/main";
import { TopSection } from "@/components/utils/top-section";
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

  return (
    <HydrateClient>
      <div className="w-full h-full relative flex flex-col md:flex-row">
        <TopSection>
          <UserSection userName={user.name} imageUrl={user.image} />
        </TopSection>
        <MainCanvas isMyProject={session ? user.id === session.user.id : false} projects={user.projects} />
      </div>
    </HydrateClient>
  );
};

export default UserPage;
