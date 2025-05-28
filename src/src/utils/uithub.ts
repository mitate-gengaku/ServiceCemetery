"use server";

import axios from "axios";

import { env } from "@/env";

export const requestToUithub = async (owner: string, repo: string) => {
  const options = {
    method: "GET",
    url: `https://uithub.com/${owner}/${repo}/tree/main`,
    params: { accept: "text/markdown", maxTokens: "10000" },
    headers: {
      accept: "text/markdown",
      Accept: "application/json, text/yaml, text/markdown, text/html, text/plain",
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    },
  };

  return await axios.request<string>(options);
};
