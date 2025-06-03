"use client";

import { ChevronLeftIcon, ChevronRightIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { GithubIcon } from "@/components/icons/github";
import { Spinner } from "@/components/loading/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/hooks/use-search";

export const SearchUserList = () => {
  const { queryParams, data, isLoading, onChangePage } = useSearch();

  return (
    <div className="w-full md:h-full px-4 md:px-10 py-12 flex flex-wrap items-center justify-center gap-12">
      {isLoading && <Spinner className="text-emerald-500 size-8" />}
      {data && data.data.length ? (
        <ul className="w-full flex flex-col items-center justify-center gap-4">
          {data.data.map(({ id, name, image }) => (
            <li className="w-full md:w-md flex items-center relative group" key={id}>
              <Link
                href={`/${name}`}
                className="w-full p-2 rounded-md flex items-center gap-4 group-hover:bg-slate-50 group-hover:shadow group-hover:outline group-hover:outline-gray-200"
              >
                <Avatar>
                  <AvatarImage src={image ?? ""} />
                  <AvatarFallback>
                    <UserIcon className="size-4" />
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">{name}</h3>
              </Link>
              <Link href={`https://github.com/${name}`} className="p-1 absolute right-4 rounded-full">
                <GithubIcon className="size-5" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
      {!(data && data.data.length) && !isLoading && <p>データはありません</p>}
      <div className="w-full flex items-center justify-between md:justify-center gap-8">
        <Button
          variant={"outline"}
          disabled={!(data && data.pagination.prevPage)}
          onClick={() => onChangePage(queryParams, data && data.pagination.prevPage ? data.pagination.prevPage : 1)}
        >
          <ChevronLeftIcon />
          前のページ
        </Button>
        <Button
          variant={"outline"}
          disabled={!(data && data.pagination.nextPage)}
          onClick={() => onChangePage(queryParams, data && data.pagination.nextPage ? data.pagination.nextPage : 1)}
        >
          次のページ
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
};
