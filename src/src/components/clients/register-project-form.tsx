"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon, CircleHelpIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select, { components, type MultiValue } from "react-select";
import { toast } from "sonner";
import { z } from "zod";

import { WatchValue } from "@/components/libs/form/watch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { api } from "@/trpc/react";
import { type Repository } from "@/types/repository";
import { type Tag } from "@/types/tag";
import { cn } from "@/utils/cn";

interface Props {
  tags: Tag[];
  repositories: Repository[];
  projectNames: string[];
}

const registerSchema = z.object({
  name: z.string({
    required_error: "リポジトリを選択してください",
    invalid_type_error: "文字列を入力してください",
  }),
  description: z.string().nullable(),
  url: z.string({
    required_error: "リポジトリを選択してください",
    invalid_type_error: "文字列を入力してください",
  }),
  reflection: z.string().max(256, "256文字まで入力できます").nullable().optional(),
  tags: z
    .array(
      z.object({
        id: z.string(),
        value: z.string(),
        label: z.string(),
      }),
    )
    .nullable()
    .optional(),
});

export type Register = z.infer<typeof registerSchema>;

export const RegisterProjectForm = ({ tags, repositories, projectNames }: Props) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Register>({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<Tag>>([]);
  const utils = api.useUtils();
  const createProject = api.project.create.useMutation({
    onSuccess: async () => {
      await utils.project.invalidate();
      setLoading(false);
      setValue("name", "");
      setValue("description", "");
      setValue("url", "");
      setSelectedOptions([]);
      reset();
      toast.success("プロジェクトを追加しました");
      router.refresh();
    },
    onError: async (e) => {
      toast.error(e.shape?.message);
      setLoading(false);
    },
  });

  const onSubmit = handleSubmit((data) => {
    setLoading(true);
    const { tags, ...props } = data;
    const tagIdList = tags ? tags.map((tag) => tag.id) : [];

    createProject.mutate({
      ...props,
      tags: tagIdList,
    });
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">プロジェクトを追加</h3>
      <div className="space-y-1">
        <Label className="text-muted-foreground text-xs">リポジトリ</Label>
        <Controller
          name="name"
          control={control}
          rules={{
            required: "リポジトリを選択してください",
          }}
          render={() => (
            <Combobox
              objects={repositories}
              setSelectedOption={setValue}
              disabledNames={projectNames}
              placeholder="リポジトリを選択してください"
              name="name"
              control={control}
            />
          )}
        />
      </div>
      <div className="space-y-1">
        <Label className="text-muted-foreground text-xs">プロジェクト名</Label>
        <WatchValue
          className={cn(
            "dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none cursor-not-allowed",
            errors.name && "bg-red-50 border-red-500",
          )}
          name="name"
          control={control}
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name?.message}</p>}
      </div>
      <div className="space-y-1">
        <Label className="text-muted-foreground text-xs">プロジェクトの概要</Label>
        <WatchValue
          className={cn(
            "border-input dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none cursor-not-allowed",
          )}
          name="description"
          control={control}
        />
      </div>
      <div className="space-y-1">
        <Label className="text-muted-foreground text-xs">プロジェクトのリンク</Label>
        <WatchValue
          className={cn(
            "dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none cursor-not-allowed",
            errors.url && "bg-red-50 border-red-500",
          )}
          name="url"
          control={control}
        />
        {errors.url && <p className="text-red-500 text-xs">{errors.url?.message}</p>}
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label className="text-muted-foreground text-xs">
            ステータス<span className="text-red-500 text-base">*</span>
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" className="cursor-pointer">
                  <CircleHelpIcon className="size-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>プロジェクトを終了した理由を選択してください</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <Select
              options={tags}
              className="text-sm cursor-pointer"
              components={{
                Control: (props) => {
                  return (
                    <components.Control
                      {...props}
                      className={cn(
                        "dark:bg-input/30! border-input! flex w-full rounded-md! border bg-transparent transition-[color,box-shadow] cursor-pointer",
                        props.isFocused && "shadow-none! ring-2 ring-emerald-500",
                      )}
                    />
                  );
                },
                ClearIndicator: (props) => {
                  return (
                    <components.ClearIndicator {...props}>
                      <XIcon className="size-4 hover:text-gray-800" />
                    </components.ClearIndicator>
                  );
                },
                DropdownIndicator: (props) => {
                  return (
                    <components.DropdownIndicator {...props}>
                      <ChevronDownIcon className="size-4 hover:text-gray-800" />
                    </components.DropdownIndicator>
                  );
                },
                Option: (props) => {
                  return <components.Option {...props} className={cn(props.isFocused && "bg-emerald-50!")} />;
                },
                MultiValue: (props) => {
                  return (
                    <Badge variant={"outline"} className="py-1 bg-emerald-50 border-emerald-500">
                      {props.data.label}
                      <div
                        onClick={(e) => props.removeProps.onClick!(e)}
                        className="cursor-pointer rounded-full hover:bg-primary-foreground/20 p-0.5"
                      >
                        <XIcon className="size-3" />
                      </div>
                    </Badge>
                  );
                },
                NoOptionsMessage: (props) => {
                  return <components.NoOptionsMessage {...props}>選択肢はありません</components.NoOptionsMessage>;
                },
                ValueContainer: (props) => {
                  return <components.ValueContainer {...props} className="gap-1" />;
                },
              }}
              onChange={(v) => {
                setSelectedOptions(v);
                field.onChange(v);
              }}
              value={selectedOptions}
              isOptionDisabled={() => selectedOptions.length >= 10}
              placeholder="ステータスを選んでください"
              isMulti
            />
          )}
        />

        {errors.tags && <p className="text-red-500 text-xs">{errors.tags?.message}</p>}
      </div>
      <div className="space-y-1">
        <Label className="text-muted-foreground text-xs">終了した理由・反省など</Label>
        <Textarea
          className="resize-none text-xs min-h-20 focus-visible:ring-2 focus-visible:ring-emerald-500"
          rows={55}
          {...register("reflection")}
        />
        {errors.reflection && <p className="text-red-500 text-xs">{errors.reflection.message}</p>}
      </div>
      <Button className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer" disabled={isLoading}>
        プロジェクトを追加する
      </Button>
    </form>
  );
};
