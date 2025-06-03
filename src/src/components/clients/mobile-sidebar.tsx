"use client";

import { useAtom } from "jotai";
import { AlignLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { SearchBar } from "@/components/clients/search-bar";
import { XIcon } from "@/components/icons/x";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MODELS_LIST } from "@/config/credit";
import { sidebarAtom } from "@/store/sidebar";

export const MobileSidebar = () => {
  const [open, setOpen] = useAtom(sidebarAtom);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <AlignLeftIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>RIPro</SheetTitle>
          <SheetDescription>失敗も成功も、すべては財産</SheetDescription>
        </SheetHeader>
        <div className="px-4">
          <SearchBar />
        </div>
        <div className="px-4">
          <h3 className="text-base font-semibold">使用モデル・テクスチャ一覧</h3>
          <ul>
            {MODELS_LIST.map((model) => (
              <li
                key={model.label}
                className="w-full py-1 cursor-pointer text-sm hover:text-emerald-500 text-left hover:underline"
              >
                <Link href={model.link} rel="noopener noreferrer" target="_blank" className="w-full">
                  {model.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <SheetFooter>
          <h3 className="text-base font-semibold">開発者のX</h3>
          <Button variant={"outline"} size={"icon"} asChild>
            <Link href={"https://x.com/mitate_gengaku"} className="flex items-center gap-1">
              <XIcon className="size-4" />
            </Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
