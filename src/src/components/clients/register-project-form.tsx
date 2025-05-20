"use client";

import { ChevronDownIcon, CircleHelpIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Select, { components, type MultiValue } from "react-select";
import { toast } from "sonner";

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

export const RegisterProjectForm = ({ tags, repositories, projectNames }: Props) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [selectedRepository, setSelectedRepository] = useState<Repository>({
    name: "",
    description: "",
    url: "",
  });
  const router = useRouter();
  const [reflection, setReflection] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<Tag>>([]);
  const utils = api.useUtils();
  const createProject = api.project.create.useMutation({
    onSuccess: async () => {
      await utils.project.invalidate();
      setSelectedRepository({
        name: "",
        description: "",
        url: "",
      });
      setReflection("");
      setSelectedOptions([]);
      router.refresh();
      toast.success("プロジェクトを追加しました");
      setLoading(false);
    },
    onError: async (e) => {
      toast.error(e.shape?.message);
      setLoading(false);
    },
  });

  if (!tags.length) return <></>;
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();

        setLoading(true);
        const tagIdList = selectedOptions.map((select) => select.id);

        createProject.mutate({
          ...selectedRepository,
          reflection,
          tags: tagIdList,
        });
      }}
    >
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">プロジェクトを追加</h3>
      <div className="space-y-1">
        <Label className="text-muted-foreground text-xs">リポジトリ</Label>
        <Combobox
          objects={repositories}
          placeholder="リポジトリを選択してください"
          setSelectedOption={setSelectedRepository}
          disabledNames={projectNames}
        />
      </div>
      <div className="space-y-1">
        <Label className="text-muted-foreground text-xs">プロジェクト名</Label>
        <div
          className={cn(
            "dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none cursor-not-allowed",
            selectedRepository.name && "opacity-50",
          )}
        >
          {selectedRepository.name}
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-muted-foreground text-xs">プロジェクトの概要</Label>
        <div
          className={cn(
            "border-input dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none cursor-not-allowed",
            selectedRepository.description && "opacity-50",
          )}
        >
          {selectedRepository.description}
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-muted-foreground text-xs">プロジェクトのリンク</Label>
        <div
          className={cn(
            "dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none cursor-not-allowed",
            selectedRepository.url && "opacity-50",
          )}
        >
          {selectedRepository.url}
        </div>
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
          onChange={(v) => setSelectedOptions(v)}
          isOptionDisabled={() => selectedOptions.length >= 10}
          placeholder="ステータスを選んでください"
          isMulti
        />
      </div>
      <div className="space-y-1">
        <Label className="text-muted-foreground text-xs">終了した理由・反省など</Label>
        <Textarea
          className="resize-none text-xs min-h-20 focus-visible:ring-2 focus-visible:ring-emerald-500"
          rows={55}
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
        />
      </div>
      <Button className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer" disabled={isLoading}>
        プロジェクトを追加する
      </Button>
    </form>
  );
};
