"use client";

import { useGLTF, useCursor, Html } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import * as THREE from "three";

import { Markdown } from "@/components/libs/react-markdown/markdown";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProgressChart } from "@/components/utils/progress-chart";
import { CEMETERY_POSITIONS } from "@/config/cemetery";
import { mermaidFamily } from "@/store/mermaid";
import { api } from "@/trpc/react";
import { type Project } from "@/types/project";
import { cn } from "@/utils/cn";

interface Props {
  projects: Project[];
  isMyProject?: boolean;
}

const convertTags = (projects: Project[]) => {
  const convertedProjects = projects.map((project) => {
    return {
      ...project,
      tags: project.projectsTags ? project.projectsTags.map((pt) => pt.tag) : [],
      projectsTags: undefined,
    };
  });

  return convertedProjects;
};

export const Cemetery = ({ projects, isMyProject = false }: Props) => {
  const mergedProjects = useMemo(() => {
    const convertedProjectTags = convertTags(projects);

    const mergedPositionProjects = convertedProjectTags.map((project, i) => ({
      ...project,
      position: CEMETERY_POSITIONS[i].position,
    }));

    return mergedPositionProjects;
  }, [projects]);

  const [selectIndex, setSelectIndex] = useState<number>(0);
  const [mermaidText, setMermaidText] = useAtom(mermaidFamily({ id: selectIndex.toString(), text: "" }));
  const [clicked, setClicked] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/Cemetary.glb");
  const [diffuseMap, normalMap, roughnessMap] = useLoader(THREE.TextureLoader, [
    "/textures/rock_01_diff_4k.jpg",
    "/textures/rock_01_nor_gl_4k.jpg",
    "/textures/rock_01_rough_4k.jpg",
  ]);
  const utils = api.useUtils();
  const router = useRouter();
  const deleteProject = api.project.delete.useMutation({
    onSuccess: async () => {
      await utils.project.invalidate();
      setClicked(false);
      setSelectIndex(0);
      toast.success("プロジェクトを削除しました");
      router.refresh();
    },
  });

  useCursor(clicked);
  useCursor(hovered);

  const generate = async () => {
    setLoading(true);
    await new Promise((resolv) => setTimeout(resolv, 5000));

    setLoading(false);
    setMermaidText({
      id: selectIndex.toString(),
      text: `~~~mermaid
flowchart LR
  subgraph "フロントエンド"
      A[ページ] --> B[Reactコンポーネント];
      B --> C[UIライブラリ];
      C --> D[React Flow];
      D --> E[ELK.js];
      E --"レイアウト計算結果"--> D;
      B --"データ取得"--> F[API];
  end
  subgraph "API"
      F[API] --> G[ImportExportAnalyzer];
      G --"HTTP 3000"--> F;
  end
  subgraph "バックエンド"
      G[ImportExportAnalyzer] --"ファイル解析"--> H[ファイルシステム];
      G --"依存関係グラフ"--> F;
  end

  style A fill:#ccf,stroke:#333,stroke-width:2px
  style B fill:#ccf,stroke:#333,stroke-width:2px
  style C fill:#ccf,stroke:#333,stroke-width:2px
  style D fill:#ccf,stroke:#333,stroke-width:2px
  style E fill:#ccf,stroke:#333,stroke-width:2px
  style F fill:#ccf,stroke:#333,stroke-width:2px
  style G fill:#ccf,stroke:#333,stroke-width:2px
  style H fill:#ccf,stroke:#333,stroke-width:2px
~~~`,
    });
  };

  return (
    <group ref={groupRef}>
      {mergedProjects.map(({ position }, i) => {
        const clonedScene = scene.clone(true);

        return (
          <group position={position} key={i} castShadow>
            <mesh
              position={[0, -0.5, 0]}
              receiveShadow
              castShadow
              onClick={(e) => (e.stopPropagation(), setClicked(true), setSelectIndex(i))}
              onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
              onPointerOut={(e) => (e.stopPropagation(), setHovered(false))}
            >
              <boxGeometry args={[5, 0.5, 4]} />
              <meshStandardMaterial
                map={diffuseMap}
                normalMap={normalMap}
                aoMap={roughnessMap}
                roughnessMap={roughnessMap}
                roughness={1}
              />
            </mesh>
            <group position={[0, 0.25, 0]} scale={2} castShadow>
              <primitive object={clonedScene} />
            </group>
          </group>
        );
      })}
      {mergedProjects.length && (
        <Html>
          <Dialog open={clicked} onOpenChange={setClicked}>
            <DialogContent className="xl:min-w-4xl xl:max-w-4xl font-geist-sans">
              <DialogHeader>
                <DialogTitle>{mergedProjects[selectIndex].name}</DialogTitle>
                <DialogDescription>「{mergedProjects[selectIndex].name}」の情報</DialogDescription>
              </DialogHeader>
              <div>
                <Tabs defaultValue="detail">
                  <TabsList>
                    <TabsTrigger value="detail">基本情報</TabsTrigger>
                    <TabsTrigger value="reflection">反省点</TabsTrigger>
                    {isMyProject && <TabsTrigger value="ai">AI解析</TabsTrigger>}
                  </TabsList>
                  <TabsContent value="detail">
                    <div className="py-4 space-y-3">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-semibold">プロジェクト名</p>
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                          {mergedProjects[selectIndex].name}
                        </h3>
                      </div>
                      {mergedProjects[selectIndex].description && (
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground font-semibold">プロジェクトの概要</p>
                          <p className="text-sm tracking-tight">{mergedProjects[selectIndex].description}</p>
                        </div>
                      )}
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-semibold">言語</p>
                        <ProgressChart languages={mergedProjects[selectIndex].languages} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-semibold">リポジトリのリンク</p>
                        <Link
                          href={mergedProjects[selectIndex].url}
                          className="font-semibold tracking-tight hover:text-emerald-600"
                        >
                          {mergedProjects[selectIndex].url}
                        </Link>
                      </div>
                      {isMyProject && (
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground font-semibold">削除</p>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm" className="cursor-pointer">
                                プロジェクトを削除
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>プロジェクトを削除</AlertDialogTitle>
                                <AlertDialogDescription>
                                  この操作は取り消せません。本当によろしいですか？
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <div className="flex items-center gap-2 justify-center md:justify-end">
                                <AlertDialogCancel className="cursor-pointer">キャンセル</AlertDialogCancel>
                                <AlertDialogAction
                                  className={cn(buttonVariants({ variant: "destructive" }), "cursor-pointer")}
                                  onClick={() => {
                                    deleteProject.mutate({
                                      id: mergedProjects[selectIndex].id,
                                    });
                                  }}
                                >
                                  削除
                                </AlertDialogAction>
                              </div>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="reflection">
                    <div className="py-4 space-y-3">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-semibold">終了した理由</p>
                        <p className="text-sm tracking-tight">{mergedProjects[selectIndex].reflection}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-semibold">タグ</p>
                        <div className="flex items-center flex-wrap gap-2">
                          {mergedProjects[selectIndex].tags.map((tag, i) => (
                            <Badge className="cursor-pointer bg-emerald-500 hover:bg-emerald-600" key={i}>
                              {tag.label}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  {isMyProject && (
                    <TabsContent value="ai">
                      <div>
                        {mermaidText.text.length ? (
                          <div className="py-8 flex items-center justify-center flex-col gap-4">
                            <Markdown code={mermaidText.text} />
                            <Button
                              type="button"
                              onClick={() => generate()}
                              className={cn(
                                "bg-emerald-500 hover:bg-blur-600 transition-all cursor-pointer disabled:bg-emerald-500 disabled:opacity-100",
                                isLoading ? "animate-pulse" : "",
                              )}
                              disabled={isLoading}
                            >
                              やり直す
                            </Button>
                          </div>
                        ) : (
                          <>
                            <div className="py-8 flex items-center justify-center flex-col gap-4">
                              <Button
                                type="button"
                                onClick={() => generate()}
                                className={cn(
                                  "bg-emerald-500 hover:bg-blur-600 transition-all cursor-pointer disabled:bg-emerald-500 disabled:opacity-100",
                                  isLoading ? "animate-pulse" : "",
                                )}
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
                              <li className="list-disc text-xs text-muted-foreground">
                                1日5回まで生成を行うことができます
                              </li>
                              <li className="list-disc text-xs text-muted-foreground">
                                生成に失敗することがありますが、その場合でもカウントされます
                              </li>
                            </ul>
                          </>
                        )}
                      </div>
                    </TabsContent>
                  )}
                </Tabs>
              </div>
            </DialogContent>
          </Dialog>
        </Html>
      )}
    </group>
  );
};
