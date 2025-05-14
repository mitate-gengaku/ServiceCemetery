export type Project = {
  name: string;
  description: string | null;
  url: string;
  languages: { [key: string]: number } | null;
  reflection: string | null;
};
