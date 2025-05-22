import React from "react";

import { RegisterProjectForm } from "@/components/clients/register-project-form";
import { api, HydrateClient } from "@/trpc/server";

export const RegisterFormSection = async () => {
  const tags = await api.tag.all();
  const repositories = await api.user.repositories();
  const projects = await api.project.all();
  const projectNames = projects.length ? projects.map((pj) => pj.name) : [];

  return (
    <HydrateClient>
      <RegisterProjectForm tags={tags} repositories={repositories} projectNames={projectNames} />
    </HydrateClient>
  );
};
