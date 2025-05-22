import { cn } from "@/utils/cn";
import React from "react";

import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
  useWatch,
} from "react-hook-form";

export const WatchValue = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  { control, name, className, ...props }: { className: string } & UseControllerProps<TFieldValues, TName>,
) => {
  const value = useWatch({ control, name })

  return (
    <div
      {...props}
      className={cn(
        className,
        value && "opacity-50"
      )}
      >
      {value}
    </div>
  );
};
