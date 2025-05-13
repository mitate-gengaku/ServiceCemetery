import React from "react";

import { RegisterProjectForm } from "@/components/clients/register-project-form";
import { TopSection } from "@/components/utils/top-section";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

export const AuthHome = async () => {
  const session = await auth();
  const tags = await api.tag.all();
  const repositories = await api.user.repositories();

  return (
    <HydrateClient>
      <div className="w-full h-full relative flex flex-col md:flex-row">
        <TopSection>
          <RegisterProjectForm tags={tags} repositories={repositories} />
        </TopSection>
        {/**
         * <MainCanvas isMyProject={true} />
         */}
      </div>
    </HydrateClient>
  );
};
