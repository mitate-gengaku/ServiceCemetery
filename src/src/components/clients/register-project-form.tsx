"use client";

import { ChevronDownIcon, XIcon } from "lucide-react";
import { useState } from "react";
import Select, { components, MultiValue } from "react-select";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils/cn";

const status = [
  { label: "バージョン問題", value: "version-issue" },
  { label: "コードの供養", value: "code-retired" },
  { label: "未完成", value: "incomplete" },
  { label: "リプレイスによる破棄", value: "replaced" },
  { label: "利用者がいなかった", value: "no-users" },
  { label: "インフラの維持費問題", value: "cost-issue" },
  { label: "競合他社の参入", value: "competitor" },
  { label: "生活環境の変化", value: "lifestyle-change" },
  { label: "やる気の低下", value: "no-motivation" },
  { label: "健康問題", value: "health-problem" },
  { label: "技術的負債の増大", value: "tech-debt" },
  { label: "ビジネス戦略の転換", value: "strategy-change" },
  { label: "法規制の変更", value: "law-change" },
  { label: "セキュリティ上の懸念", value: "security" },
  { label: "採算性の悪化", value: "low-profit" },
  { label: "開発リソースの不足", value: "no-dev" },
  { label: "市場ニーズの変化", value: "market-change" },
  { label: "パートナーシップの解消", value: "no-partner" },
  { label: "災害・事故", value: "disaster" },
  { label: "運営体制の限界", value: "operation-limit" },
];

export const RegisterProjectForm = () => {
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<{ label: string; value: string }>>([]);

  return (
    <form className="space-y-4">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">プロジェクトを追加</h3>
      <div className="space-y-1">
        <Label className="text-muted-foreground text-xs">リポジトリ</Label>
        <Combobox objects={status} placeholder="リポジトリを選択してください" />
      </div>
      <div className="space-y-1">
        <Label className="text-muted-foreground text-xs">プロジェクト名</Label>
        <div className="dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none cursor-not-allowed md:text-sm" />
      </div>
      <div className="space-y-1">
        <Label className="text-muted-foreground text-xs">プロジェクトの概要</Label>
        <div className="border-input dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm cursor-not-allowed" />
      </div>
      <div className="space-y-1">
        <Label className="text-muted-foreground text-xs">プロジェクトのリンク</Label>
        <div className="dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none cursor-not-allowed md:text-sm" />
      </div>
      <div className="space-y-1">
        <Label className="text-muted-foreground text-xs">
          ステータス<span className="text-red-500 text-base">*</span>
        </Label>
        <Select
          options={status}
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
        <Label className="text-muted-foreground text-xs">終了した理由</Label>
        <Textarea
          className="resize-none text-xs min-h-20 focus-visible:ring-2 focus-visible:ring-emerald-500"
          rows={55}
        />
      </div>
      <Button className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer">プロジェクトを追加する</Button>
    </form>
  );
};
