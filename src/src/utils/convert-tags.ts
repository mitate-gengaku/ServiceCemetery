import { type Project } from "@/types/project";

export const convertTags = (projects: Project[]) => {
  const convertedProjects = projects.map((project) => {
    return {
      ...project,
      tags: project.projectsTags ? project.projectsTags.map((pt) => pt.tag) : [],
      projectsTags: undefined,
    };
  });

  return convertedProjects;
};
