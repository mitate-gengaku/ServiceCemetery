"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { searchSchema } from "@/schema/search";
import { sidebarAtom } from "@/store/sidebar";

export const useSearch = () => {
  const [, setOpen] = useAtom(sidebarAtom);
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const queryParams = searchParams.get("q");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    router.push(`/search?q=${data.search}`);
    setOpen(false);
  });

  useEffect(() => {
    if (!errors.search) return;
    toast.error(errors.search.message);
  }, [errors.search]);

  useEffect(() => {
    if (path === "/search") {
      setValue("search", queryParams ?? "", {
        shouldValidate: true,
      });
    }
  }, [queryParams, path, setValue]);

  return {
    register,
    onSubmit,
  };
};
