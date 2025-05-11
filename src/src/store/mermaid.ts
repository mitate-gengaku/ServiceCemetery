import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

export const mermaidFamily = atomFamily(
  (param: { id: string; text: string }) => atom(param),
  (a, b) => a.id === b.id,
);
