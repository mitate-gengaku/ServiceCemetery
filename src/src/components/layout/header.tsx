import { InfoIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { auth } from "@/server/auth";

export const Header = async () => {
  const session = await auth();

  return (
    <header>
      <div className="h-16 px-4 md:px-10 flex justify-between items-center gap-3 font-geist-sans">
        <h1 className="font-semibold text-2xl font-cardo cursor-default">
          <Link href="/">RIPro</Link>
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size={"icon"} className="ml-auto cursor-pointer">
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
        {session && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={session.user.image ?? undefined} alt={"プロフィール画像"} />
                <AvatarFallback>
                  <UserIcon className="size-4" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-60 max-w-60 font-geist-sans">
              <DropdownMenuLabel className="py-4">{session.user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <button className="w-full">
                  <Link href={"/api/auth/signout"} className="w-full text-left">
                    ログアウト
                  </Link>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {!session && (
          <Button variant={"default"} className={"bg-emerald-500 hover:bg-emerald-600"} asChild>
            <Link href={"/api/auth/signin"}>ログイン</Link>
          </Button>
        )}
      </div>
    </header>
  );
};
