"use client";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export const RegisterProjectForm = () => {
  return (
    <form className="space-y-4">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">プロジェクトを追加</h3>
      <div className="space-y-1">
        <Label className="text-muted-foreground text-xs">リポジトリ</Label>
        <Combobox objects={frameworks} placeholder="リポジトリを選択してください" />
      </div>
      <div className="space-y-1">
        <Label className="text-muted-foreground text-xs">プロジェクト名</Label>
        <div className="dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none cursor-not-allowed md:text-sm" />
      </div>
      <div className="space-y-1">
        <Label className="text-muted-foreground text-xs">プロジェクトの概要</Label>
        <div className="border-input dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm cursor-not-allowed" />
      </div>
      <div className="space-y-1">
        <Label className="text-muted-foreground text-xs">プロジェクトのリンク</Label>
        <div className="dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none cursor-not-allowed md:text-sm" />
      </div>
      <div className="space-y-1">
        <Label className="text-muted-foreground text-xs">
          ステータス<span className="text-red-500 text-base">*</span>
        </Label>
      </div>
      <div className="space-y-1">
        <Label className="text-muted-foreground text-xs">終了した理由</Label>
        <Textarea className="resize-none text-xs min-h-20" rows={55} />
      </div>
      <Button className="bg-emerald-500 hover:bg-emerald-600">プロジェクトを追加する</Button>
    </form>
  );
};
