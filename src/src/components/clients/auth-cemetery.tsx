"use client";

import { useAtom } from "jotai";
import { startTransition, useEffect, useState, useTransition } from "react";

import { Cemetery } from "@/components/libs/@react-three/cemetery copy";
import { CemeteryDialog } from "@/components/libs/@react-three/cemetery-dialog";
import { Markdown } from "@/components/libs/react-markdown/markdown";
import { Button } from "@/components/ui/button";
import { CEMETERY_PROJECTS } from "@/config/cemetery";
import { mermaidFamily } from "@/store/mermaid";
import { cn } from "@/utils/cn";
import { Project } from "@/types/project";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import React from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/loading/spinner";
import { Hammer } from "@/components/icons/hammer";

interface Props {
  authId: string;
  projects: Project[]
}

export const AuthCemetery = ({ authId, projects }: Props) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [selectIndex, setSelectIndex] = useState<number>(0);
  const router = useRouter();
  const [mermaidText, setMermaidText] = useAtom(mermaidFamily({ id: selectIndex.toString(), text: "" }));

  const utils = api.useUtils();

   const analizeArchitecture = api.project.architecture.useMutation({
      onSuccess: async (data) => {
        await utils.project.invalidate();
        setLoading(false);
        setMermaidText({ id: selectIndex.toString(), text: data });
        toast.success("アーキテクチャ図を作成しました");
      },
      onError: async (e) => {
        toast.error(e.shape?.message);
        setLoading(false);
      },
    });
  
  const analizeProjectArchitecture = async (repo: string, authId: string, createdById: string) => {
    setLoading(true);
    if (authId !== createdById) {
      toast.error("この操作は許可されていません")
      setLoading(false);
      return;
    }

    analizeArchitecture.mutate({
      projectName: repo,
    });
  };
  
    const updateProject = api.project.update.useMutation({
      onSuccess: async () => {
        await utils.project.invalidate();
        toast.success("アーキテクチャ図を保存しました");
        router.refresh();
        setLoading(false);
        setMermaidText({
          id: (0).toString(),
          text: "",
        });
      },
      onError: async (e) => {
        toast.error(e.shape?.message);
        setLoading(false);
      },
    });
  
  const updateProjectHandler = async (id: string) => {
    setLoading(true);
    updateProject.mutate({
      id,
      architecture: mermaidText.text,
    });
  };

  return (
    <Cemetery projects={projects} clicked={clicked} setClicked={setClicked} setSelectIndex={setSelectIndex}>
      <CemeteryDialog
        project={projects[selectIndex] ? projects[selectIndex] : undefined}
        clicked={clicked}
        setClicked={setClicked}
        authId={authId}
      >
        <div className="space-y-2">
          {projects[selectIndex].architecture && (
            <>
              {isLoading ? (
                <div className="flex items-center justify-center relative w-full h-96 border border-gray-300 rounded-lg overflow-hidden bg-white font-geist-sans">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <Hammer className="size-5" />
                    <p className="text-sm animate-pulse">解析中…</p>
                  </div>
                </div>
              ) : <Markdown code={mermaidText.text ? mermaidText.text : projects[selectIndex].architecture} />
              }
              <div className="flex items-center justify-center gap-4">
                {mermaidText.text && (
                  <Button
                    type="button"
                    className={cn(
                      "bg-emerald-500 hover:bg-emerald-600 transition-all cursor-pointer disabled:bg-emerald-500 disabled:opacity-100",
                      isLoading ? "animate-pulse" : "",
                    )}
                    disabled={isLoading}
                    onClick={() => updateProjectHandler(projects[selectIndex].id)}
                  >
                    保存する
                  </Button>
                )}
                <Button
                  type="button"
                  variant="secondary"
                  className="cursor-pointer"
                  disabled={isLoading}
                  onClick={() => analizeProjectArchitecture(projects[selectIndex].name, authId, projects[selectIndex].createdById)}
                >
                  やり直す
                </Button>
              </div>
            </>
          )}
          {!projects[selectIndex].architecture && mermaidText.text && (
            <>
              <Markdown code={mermaidText.text} />
              <div className="flex items-center justify-center gap-4">
                <Button
                  type="button"
                  className={cn(
                    "bg-emerald-500 hover:bg-emerald-600 transition-all cursor-pointer disabled:bg-emerald-500 disabled:opacity-100",
                    isLoading ? "animate-pulse" : "",
                  )}
                  disabled={isLoading}
                  onClick={() => updateProjectHandler(projects[selectIndex].id)}
                >
                  保存する
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="cursor-pointer"
                  disabled={isLoading}
                  onClick={() => analizeProjectArchitecture(projects[selectIndex].name, authId, projects[selectIndex].createdById)}
                >
                  やり直す
                </Button>
              </div>
            </>
          )}
          {!mermaidText.text && !projects[selectIndex].architecture && (
            <>
              <div className="py-8 flex items-center justify-center flex-col gap-4">
                <Button
                  type="button"
                  className={cn(
                    "bg-emerald-500 hover:bg-blur-600 transition-all cursor-pointer disabled:bg-emerald-500 disabled:opacity-100",
                    isLoading ? "animate-pulse" : "",
                  )}
                  onClick={() => analizeProjectArchitecture(projects[selectIndex].name, authId, projects[selectIndex].createdById)}
                  disabled={isLoading}
                >
                  アーキテクチャ図を作成
                </Button>
              </div>
              <ul className="pl-4 space-y-1">
                <li className="list-disc text-xs text-muted-foreground">
                  Gemini 1.5 Flash APIの無料枠を使用しています
                </li>
                <li className="list-disc text-xs text-muted-foreground">
                  送信したデータ内容はGoogleのAIの学習に使用されますのでご注意ください
                </li>
                <li className="list-disc text-xs text-muted-foreground">1日5回まで生成を行うことができます</li>
                <li className="list-disc text-xs text-muted-foreground">
                  生成に失敗することがありますが、その場合でもカウントされます
                </li>
              </ul>
            </>
          )}
        </div>
      </CemeteryDialog>
    </Cemetery>
  );
};
