"use client";

import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/use-search";

export const SearchBar = () => {
  const { onSubmit, register } = useSearch();
  return (
    <form className="relative w-sm max-w-full ml-auto" onSubmit={onSubmit}>
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        {...register("search")}
        type="text"
        placeholder="ユーザー名を検索..."
        className="text-xs sm:text-sm bg-slate-50 pl-10 pr-10 focus-visible:ring-1 focus-visible:ring-emerald-500"
      />
    </form>
  );
};
