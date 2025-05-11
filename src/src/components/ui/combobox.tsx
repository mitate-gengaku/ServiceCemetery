"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/utils/cn";

interface Props {
  objects: { value: string; label: string }[];
  placeholder?: string | undefined;
}

export function Combobox({ objects, placeholder = "選択してください" }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="min-w-[200px] justify-between">
          {value ? objects.find((object) => object.value === value)?.label : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="入力してください" className="h-9" />
          <CommandList>
            <CommandEmpty>見つかりませんでした</CommandEmpty>
            <CommandGroup>
              {objects.map((object) => (
                <CommandItem
                  key={object.value}
                  value={object.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {object.label}
                  <Check
                    className={cn("ml-auto text-emerald-500", value === object.value ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
