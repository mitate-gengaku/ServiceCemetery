"use client";

import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { ActionButtons } from "@/components/clients/action-button";
import { DisclaimerList } from "@/components/clients/disclaimer-list";
import { Cemetery } from "@/components/libs/@react-three/cemetery";
import { CemeteryDialog } from "@/components/libs/@react-three/cemetery-dialog";
import { Markdown } from "@/components/libs/react-markdown/markdown";
import { LoadingHammer } from "@/components/loading/hammer";
import { mermaidFamily } from "@/store/mermaid";
import { api } from "@/trpc/react";
import { type ArchitectureState } from "@/types/architecture";
import { type Project } from "@/types/project";

interface Props {
  authId: string;
  projects: Project[];
}

export const AuthCemetery = ({ authId, projects }: Props) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isComplete, setComplete] = useState<boolean>(false);
  const [selectIndex, setSelectIndex] = useState<number>(0);
  const router = useRouter();
  const [mermaidText, setMermaidText] = useAtom(mermaidFamily({ id: selectIndex.toString(), text: "" }));

  const utils = api.useUtils();

  const getArchitectureState = (): ArchitectureState => {
    const currentProject = projects[selectIndex];
    if (!currentProject) return "none";

    if (currentProject.architecture) return "saved";
    if (mermaidText.text) return "unsaved";
    return "none";
  };

  const getDisplayCode = (): string => {
    const currentProject = projects[selectIndex];
    if (mermaidText.text) return mermaidText.text;
    return currentProject?.architecture || "";
  };

  const analyzeArchitecture = api.project.architecture.useMutation({
    onSuccess: async (data) => {
      await utils.project.invalidate();
      setLoading(false);
      setComplete(false);
      setMermaidText({ id: selectIndex.toString(), text: data });
      toast.success("アーキテクチャ図を作成しました");
    },
    onError: async (e) => {
      toast.error(e.shape?.message);
      setLoading(false);
    },
  });

  const updateProject = api.project.update.useMutation({
    onSuccess: async () => {
      await utils.project.invalidate();
      toast.success("アーキテクチャ図を保存しました");
      setLoading(false);
      setComplete(true);
    },
    onError: async (e) => {
      toast.error(e.shape?.message);
      setLoading(false);
    },
  });

  const deleteProject = api.project.delete.useMutation({
    onSuccess: async () => {
      await utils.project.invalidate();
      setSelectIndex(0);
      setLoading(false);
      setClicked(false);
      router.refresh();
      toast.success("プロジェクトを削除しました");
    },
    onError: async (e) => {
      setSelectIndex(0);
      toast.error(e.shape?.message);
      setLoading(false);
    },
  });

  const checkPermission = (createdById: string): boolean => {
    if (authId !== createdById) {
      toast.error("この操作は許可されていません");
      setLoading(false);
      return false;
    }
    return true;
  };

  const handleAnalyzeArchitecture = async (repo: string, createdById: string) => {
    setLoading(true);
    if (!checkPermission(createdById)) return;

    analyzeArchitecture.mutate({ projectName: repo });
  };

  const handleUpdateProject = async (id: string, createdById: string) => {
    setLoading(true);
    if (!checkPermission(createdById)) return;

    updateProject.mutate({
      id,
      architecture: mermaidText.text,
    });
  };

  const handleDeleteProject = async (id: string) => {
    setLoading(true);
    deleteProject.mutate({ id });
  };

  const currentProject = projects[selectIndex];
  const architectureState = getArchitectureState();
  const displayCode = getDisplayCode();

  return (
    <Cemetery projects={projects} clicked={clicked} setClicked={setClicked} setSelectIndex={setSelectIndex}>
      <CemeteryDialog
        project={currentProject || null}
        clicked={clicked}
        authId={authId}
        setClicked={setClicked}
        onDelete={handleDeleteProject}
      >
        <div className="space-y-2">
          {architectureState !== "none" && (
            <>
              {isLoading ? <LoadingHammer /> : <Markdown code={displayCode} />}
              <ActionButtons
                state={architectureState}
                isLoading={isLoading}
                isComplete={isComplete}
                authId={authId}
                project={currentProject}
                onSave={() => handleUpdateProject(currentProject.id, currentProject.createdById)}
                onRegenerate={() => handleAnalyzeArchitecture(currentProject.name, currentProject.createdById)}
                onGenerate={() => handleAnalyzeArchitecture(currentProject.name, currentProject.createdById)}
              />
            </>
          )}

          {architectureState === "none" && (
            <>
              <ActionButtons
                state={architectureState}
                isLoading={isLoading}
                isComplete={isComplete}
                authId={authId}
                project={currentProject}
                onSave={() => {}}
                onRegenerate={() => {}}
                onGenerate={() => handleAnalyzeArchitecture(currentProject.name, currentProject.createdById)}
              />
              <DisclaimerList />
            </>
          )}
        </div>
      </CemeteryDialog>
    </Cemetery>
  );
};
