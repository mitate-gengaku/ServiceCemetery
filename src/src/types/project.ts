export type Project = {
  name: string;
  id: string;
  description: string | null;
  reflection: string | null;
  url: string;
  languages: {
    [key: string]: number;
  } | null;
  createdById: string;
  projectsTags: {
    projectId: string;
    tagId: string;
    tag: {
      value: string;
      id: string;
      label: string;
    };
  }[];
};
