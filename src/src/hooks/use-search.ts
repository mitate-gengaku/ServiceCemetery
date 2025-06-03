"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { searchSchema } from "@/schema/search";
import { sidebarAtom } from "@/store/sidebar";
import { api } from "@/trpc/react";

export const useSearch = () => {
  const [, setOpen] = useAtom(sidebarAtom);
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const queryParams = searchParams.get("q");
  const pageParams = searchParams.get("page");

  const { data, isLoading } = api.user.search.useQuery({
    query: queryParams,
    page: pageParams,
  });

  const { register, handleSubmit, setValue } = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    router.push(`/search?q=${data.search}`);
    setOpen(false);
  });

  const onChangePage = (query: string | null, page: number | null) => {
    if (typeof page !== "number") {
      return;
    }
    router.push(`/search?q=${query}&page=${page}`);
  };

  useEffect(() => {
    if (path === "/search") {
      setValue("search", queryParams ?? "");
    }
  }, [queryParams, path, setValue]);

  return {
    isLoading,
    data,
    queryParams,
    pageParams,
    register,
    onSubmit,
    onChangePage,
  };
};
