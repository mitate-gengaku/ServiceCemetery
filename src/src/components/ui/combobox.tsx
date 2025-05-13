"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { type Repository } from "@/types/repository";
import { cn } from "@/utils/cn";

interface Props {
  objects: Repository[];
  placeholder?: string | undefined;
  setSelectedOption: React.Dispatch<React.SetStateAction<Repository>>;
}

export function Combobox({ objects, placeholder = "選択してください", setSelectedOption }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="min-w-[200px] justify-between">
          {value ? objects.find((object) => object.name === value)?.name : placeholder}
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
                  key={object.name}
                  value={object.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setSelectedOption({
                      name: object.name,
                      description: object.description,
                      url: object.url,
                    });
                    setOpen(false);
                  }}
                  className="data-[selected=true]:bg-emerald-50"
                >
                  {object.name}
                  <Check
                    className={cn("ml-auto text-emerald-500", value === object.name ? "opacity-100" : "opacity-0")}
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
