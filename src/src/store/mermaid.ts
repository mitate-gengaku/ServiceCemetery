import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

export const mermaidFamily = atomFamily(
  (param: { id: string; text: string }) => atom<{ id: string; text: string }>(param),
  (a, b) => a.id === b.id,
);
