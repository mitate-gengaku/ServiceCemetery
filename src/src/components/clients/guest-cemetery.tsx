"use client";

import { useAtom } from "jotai";
import { useState } from "react";

import { Cemetery } from "@/components/libs/@react-three/cemetery copy";
import { CemeteryDialog } from "@/components/libs/@react-three/cemetery-dialog";
import { Markdown } from "@/components/libs/react-markdown/markdown";
import { Button } from "@/components/ui/button";
import { CEMETERY_PROJECTS } from "@/config/cemetery";
import { mermaidFamily } from "@/store/mermaid";
import { cn } from "@/utils/cn";

export const GuestCemetery = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [selectIndex, setSelectIndex] = useState<number>(0);
  const [mermaidText, setMermaidText] = useAtom(mermaidFamily({ id: selectIndex.toString(), text: "" }));
  const projects = CEMETERY_PROJECTS;

  const generate = async () => {
    setLoading(true);
    await new Promise((resolv) => setTimeout(resolv, 5000));

    setLoading(false);
    setMermaidText({
      id: selectIndex.toString(),
      text: `~~~mermaid
flowchart LR
  subgraph "プレゼンテーション層"
      A[ユーザー] --> B[Webブラウザ];
      B --"HTTPリクエスト"--> F[Webサーバー];
  end

  subgraph "アプリケーション層"
      F[Webサーバー] --> H[APIサーバー];
      H --> J[認証・認可];
      J --> K[セッション管理];
      K --"データアクセス"--> L;
      H --"データアクセス"--> L;
      F --"コンテンツ配信"--> B;
  end

  subgraph "データ層"
      L[データアクセス層] --> M[ORM/データマッパー];
      M --> N[データベース];
      N --> O[関係データベース（MySQL/PostgreSQL）];
      N --> P[NoSQLデータベース（MongoDB）];
      L --> Q[キャッシュ（Redis）];
      L --> R[ファイルストレージ];
  end

  %% 外部サービス
  subgraph "外部サービス"
      S[第三者API];
      T[メール送信サービス];
      U[認証プロバイダー];
  end

  %% 外部サービスとの接続
  H --> S;
  J --> U;
  H --> T;

  %% スタイリング
  style A fill:#e1f5fe,stroke:#0277bd,stroke-width:2px
  style B fill:#e1f5fe,stroke:#0277bd,stroke-width:2px

  style F fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
  style H fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
  style J fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
  style K fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px

  style L fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
  style M fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
  style N fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
  style O fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
  style P fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
  style Q fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
  style R fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px

  style S fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  style T fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  style U fill:#fff3e0,stroke:#f57c00,stroke-width:2px
~~~`,
    });
  };

  return (
    <Cemetery projects={projects} clicked={clicked} setClicked={setClicked} setSelectIndex={setSelectIndex}>
      <CemeteryDialog
        project={projects[selectIndex] ? projects[selectIndex] : undefined}
        clicked={clicked}
        setClicked={setClicked}
      >
        <div className="space-y-2">
          {mermaidText.text && (
            <>
              <Markdown code={mermaidText.text} />
              <div className="flex items-center justify-center gap-4">
                <Button
                  type="button"
                  variant="secondary"
                  className="cursor-pointer"
                  disabled={isLoading}
                  onClick={() => generate()}
                >
                  やり直す
                </Button>
              </div>
            </>
          )}
          {!mermaidText.text && (
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
