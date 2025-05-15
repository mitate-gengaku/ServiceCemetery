import React from "react";

import { RegisterProjectForm } from "@/components/clients/register-project-form";
import { MainCanvas } from "@/components/libs/@react-three/main";
import { TopSection } from "@/components/utils/top-section";
import { api, HydrateClient } from "@/trpc/server";

export const AuthHome = async () => {
  const tags = await api.tag.all();
  const repositories = await api.user.repositories();
  const projects = await api.project.all();
  const projectNames = projects.length ? projects.map((pj) => pj.name) : [];

  return (
    <HydrateClient>
      <div className="w-full h-full relative flex flex-col md:flex-row">
        <TopSection>
          <RegisterProjectForm tags={tags} repositories={repositories} projectNames={projectNames} />
        </TopSection>
        {/**
         * <MainCanvas projects={projects} isMyProject={true} />
         */}
        <MainCanvas projects={projects} isMyProject={true} />
      </div>
    </HydrateClient>
  );
};
