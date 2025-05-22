"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { type Repository } from "@/types/repository";
import { cn } from "@/utils/cn";
import { Register } from "@/components/clients/register-project-form";
import { FieldPath, FieldValues, useController, UseControllerProps, UseFormSetValue, useWatch } from "react-hook-form";

interface Props {
  objects: Repository[];
  placeholder?: string | undefined;
  setSelectedOption: UseFormSetValue<Register>;
  disabledNames: string[];
}

export const Combobox = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  >({ objects, placeholder = "選択してください", setSelectedOption, disabledNames, ...props }: Props & UseControllerProps<TFieldValues, TName>) => {
  const [open, setOpen] = React.useState(false);

  const value = useWatch(props)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="min-w-[200px] justify-between">
          {value ? objects.find((object) => object.name === String(value))?.name : placeholder}
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
                    setSelectedOption("name", object.name)
                    setSelectedOption("description", object.description)
                    setSelectedOption("url", object.url);
                    setOpen(false);
                  }}
                  className="data-[selected=true]:bg-emerald-50"
                  disabled={disabledNames.includes(object.name)}
                >
                  {object.name}
                  <Check
                    className={cn("ml-auto text-emerald-500", object.name === String(value) ? "opacity-100" : "opacity-0")}
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
