"use client";

import { Html } from "@react-three/drei";
import Link from "next/link";
import React, { type ReactNode } from "react";

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
import { type Project } from "@/types/project";
import { cn } from "@/utils/cn";

interface Props {
  project: Project | null;
  isLoading?: boolean | undefined;
  clicked: boolean;
  authId?: string | undefined;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete?: (id: string) => Promise<void> | undefined;
  children?: ReactNode;
}

export const CemeteryDialog = ({ project, clicked, authId, setClicked, onDelete, children }: Props) => {
  if (!project) return null;

  return (
    <Html>
      <Dialog open={clicked} onOpenChange={setClicked}>
        <DialogContent className="xl:min-w-4xl xl:max-w-4xl font-geist-sans">
          <DialogHeader>
            <DialogTitle>{project.name}</DialogTitle>
            <DialogDescription>「{project.name}」の情報</DialogDescription>
          </DialogHeader>
          <div>
            <Tabs defaultValue="detail">
              <TabsList>
                <TabsTrigger value="detail">基本情報</TabsTrigger>
                <TabsTrigger value="reflection">反省点</TabsTrigger>
                {authId && Object.keys(project.languages ?? {}).length ? (
                  <TabsTrigger value="ai">AI解析</TabsTrigger>
                ) : null}
              </TabsList>
              <TabsContent value="detail">
                <div className="py-4 space-y-3">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-semibold">プロジェクト名</p>
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{project.name}</h3>
                  </div>
                  {project.description && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold">プロジェクトの概要</p>
                      <p className="text-sm tracking-tight">{project.description}</p>
                    </div>
                  )}
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-semibold">言語</p>
                    <ProgressChart languages={project.languages} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-semibold">リポジトリのリンク</p>
                    <Link href={project.url} className="font-semibold tracking-tight hover:text-emerald-600">
                      {project.url}
                    </Link>
                  </div>
                  {project.createdById === authId && (
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
                              onClick={() => (onDelete ? onDelete(project.id) : undefined)}
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
                    <p className="text-sm tracking-tight">{project.reflection}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-semibold">タグ</p>
                    <div className="flex items-center flex-wrap gap-2">
                      {project.projectsTags.map(({ tag }) => (
                        <Badge className="cursor-pointer bg-emerald-500 hover:bg-emerald-600" key={tag.id}>
                          {tag.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              {authId && Object.keys(project.languages ?? {}).length ? (
                <TabsContent value="ai">
                  <div>{children}</div>
                </TabsContent>
              ) : null}
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </Html>
  );
};
