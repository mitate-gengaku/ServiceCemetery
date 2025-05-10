"use client";

import { InfoIcon, PackagePlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MODELS_LIST } from "@/config/credit";

export const Header = () => {
  return (
    <header>
      <div className="h-16 px-4 md:px-10 flex justify-between items-center gap-4 font-geist-sans">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"ghost"} size={"icon"} className="ml-auto hidden">
              <PackagePlusIcon />
            </Button>
          </DialogTrigger>
          <DialogContent className="font-geist-sans">
            <DialogHeader>
              <DialogTitle>プロジェクトの追加</DialogTitle>
              <DialogDescription>必要な情報を記入してください</DialogDescription>
            </DialogHeader>
            <Button className="bg-emerald-500 hover:bg-emerald-600">プロジェクトを追加</Button>
          </DialogContent>
        </Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger className="hidden" asChild>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-64 max-w-64 font-geist-sans">
            <DropdownMenuLabel className="py-4">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Githubアカウントページ</DropdownMenuItem>
            <DropdownMenuItem>ログアウト</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <h1 className="font-semibold text-2xl font-cardo cursor-default">
          <Link href="/">RIPro</Link>
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size={"icon"} className="ml-auto">
              <InfoIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-72 px-3" align="end">
            <DropdownMenuLabel className="py-3">使用モデル・テクスチャ一覧</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="space-y-1 flex flex-col items-start">
              {MODELS_LIST.map((model) => (
                <Button
                  variant="link"
                  key={model.label}
                  className="w-full px-2 cursor-pointer hover:text-emerald-500 text-left"
                >
                  <Link href={model.link} rel="noopener noreferrer" target="_blank" className="w-full">
                    {model.label}
                  </Link>
                </Button>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button className="bg-emerald-500 hover:bg-emerald-600">ログイン</Button>
      </div>
    </header>
  );
};
