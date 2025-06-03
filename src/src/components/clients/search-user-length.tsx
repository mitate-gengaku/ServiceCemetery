"use client";

import React from "react";

import { Spinner } from "@/components/loading/spinner";
import { useSearch } from "@/hooks/use-search";

export const SearchUserLength = () => {
  const { data, isLoading } = useSearch();

  return (
    <>
      <h2 className="text-4xl md:text-6xl font-semibold">検索結果</h2>
      <p className="text-sm md:text-lg flex items-center">
        <span className="font-semibold">
          {isLoading ? <Spinner className="size-4 text-emerald-500" /> : <>{data?.pagination.totalCount ?? 0}人</>}
        </span>
        ユーザーが見つかりました
      </p>
    </>
  );
};
