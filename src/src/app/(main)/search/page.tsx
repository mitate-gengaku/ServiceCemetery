import { ChevronLeftIcon, ChevronRightIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { LeftSectionContainer } from "@/components/layout/left-section-container";
import { MainContainer } from "@/components/layout/main-container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { auth } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";

const Search = async () => {
  const session = await auth();

  return (
    <HydrateClient>
      <MainContainer>
        <LeftSectionContainer className="pt-8 pb-0">
          <h2 className="text-4xl md:text-6xl font-semibold">検索結果</h2>
          <p className="text-sm md:text-lg">
            <span className="font-semibold">{0}人</span>ユーザーが見つかりました
          </p>
        </LeftSectionContainer>
        <div className="w-full md:h-full px-4 md:px-10 py-12 flex flex-wrap gap-12">
          <ul className="w-full flex flex-col justify-center gap-4">
            <li>
              <Link href={"/"} className="p-2 rounded-md flex items-center gap-4 hover:bg-emerald-50">
                <Avatar>
                  <AvatarImage src={session?.user.image ?? ""} />
                  <AvatarFallback>
                    <UserIcon className="size-4" />
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">gonzales</h3>
              </Link>
            </li>
            <li>
              <Link href={"/"} className="p-2 rounded-md flex items-center gap-4 hover:bg-emerald-50">
                <Avatar>
                  <AvatarImage src={session?.user.image ?? ""} />
                  <AvatarFallback>
                    <UserIcon className="size-4" />
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">gonzales</h3>
              </Link>
            </li>
            <li>
              <Link href={"/"} className="p-2 rounded-md flex items-center gap-4 hover:bg-emerald-50">
                <Avatar>
                  <AvatarImage src={session?.user.image ?? ""} />
                  <AvatarFallback>
                    <UserIcon className="size-4" />
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">gonzales</h3>
              </Link>
            </li>
            <li>
              <Link href={"/"} className="p-2 rounded-md flex items-center gap-4 hover:bg-emerald-50">
                <Avatar>
                  <AvatarImage src={session?.user.image ?? ""} />
                  <AvatarFallback>
                    <UserIcon className="size-4" />
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">gonzales</h3>
              </Link>
            </li>
            <li>
              <Link href={"/"} className="p-2 rounded-md flex items-center gap-4 hover:bg-emerald-50">
                <Avatar>
                  <AvatarImage src={session?.user.image ?? ""} />
                  <AvatarFallback>
                    <UserIcon className="size-4" />
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">gonzales</h3>
              </Link>
            </li>
            <li>
              <Link href={"/"} className="p-2 rounded-md flex items-center gap-4 hover:bg-emerald-50">
                <Avatar>
                  <AvatarImage src={session?.user.image ?? ""} />
                  <AvatarFallback>
                    <UserIcon className="size-4" />
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">gonzales</h3>
              </Link>
            </li>
          </ul>
          <div className="w-full flex items-center justify-between md:justify-center gap-8">
            <Button variant={"outline"}>
              <ChevronLeftIcon />
              前のページ
            </Button>
            <Button variant={"outline"}>
              次のページ
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </MainContainer>
    </HydrateClient>
  );
};

export default Search;
