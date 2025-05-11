"use client";

import { useGLTF, useCursor, Html } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useAtom } from "jotai";
import Link from "next/link";
import React, { useRef, useState } from "react";
import * as THREE from "three";

import { Markdown } from "@/components/libs/react-markdown/markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProgressChart } from "@/components/utils/progress-chart";
import { CEMETERY_PROJECTS } from "@/config/cemetery";
import { mermaidFamily } from "@/store/mermaid";
import { cn } from "@/utils/cn";

export const Cemetery = () => {
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
      {CEMETERY_PROJECTS.map(({ position }, i) => {
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
      <Html>
        <Dialog open={clicked} onOpenChange={setClicked}>
          <DialogContent className="xl:min-w-4xl xl:max-w-4xl font-geist-sans">
            <DialogHeader>
              <DialogTitle>{CEMETERY_PROJECTS[selectIndex].title}</DialogTitle>
              <DialogDescription>「{CEMETERY_PROJECTS[selectIndex].title}」の情報</DialogDescription>
            </DialogHeader>
            <div>
              <Tabs defaultValue="detail">
                <TabsList>
                  <TabsTrigger value="detail">基本情報</TabsTrigger>
                  <TabsTrigger value="reflection">反省点</TabsTrigger>
                  <TabsTrigger value="ai">AI解析</TabsTrigger>
                </TabsList>
                <TabsContent value="detail">
                  <div className="py-4 space-y-3">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold">プロジェクト名</p>
                      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        {CEMETERY_PROJECTS[selectIndex].title}
                      </h3>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold">プロジェクトの概要</p>
                      <p className="text-sm tracking-tight">{CEMETERY_PROJECTS[selectIndex].descripton}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold">言語</p>
                      <ProgressChart />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold">リポジトリのリンク</p>
                      <Link
                        href={`https://github.com/`}
                        className="font-semibold tracking-tight hover:text-emerald-600"
                      >
                        プロジェクトタイトル
                      </Link>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="reflection">
                  <div className="py-4 space-y-3">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold">終了した理由</p>
                      <p className="text-sm tracking-tight">{CEMETERY_PROJECTS[selectIndex].reflection}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold">タグ</p>
                      <div className="flex items-center flex-wrap gap-2">
                        {CEMETERY_PROJECTS[selectIndex].tags.map((tag, i) => (
                          <Badge className="cursor-pointer bg-emerald-500 hover:bg-emerald-600" key={i}>
                            {tag.label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
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
                            Gemini 1.5 Flash APIの無料プランを使用します
                          </li>
                          <li className="list-disc text-xs text-muted-foreground">
                            送信したデータ内容はGoogleのAIの学習に使用されますのでご注意ください
                          </li>
                          <li className="list-disc text-xs text-muted-foreground">生成に失敗することがあります</li>
                        </ul>
                      </>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </DialogContent>
        </Dialog>
      </Html>
    </group>
  );
};
