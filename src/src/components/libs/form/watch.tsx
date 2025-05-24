import React from "react";
import { type FieldPath, type FieldValues, type UseControllerProps, useWatch } from "react-hook-form";

import { cn } from "@/utils/cn";

export const WatchValue = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  className,
  ...props
}: { className: string } & UseControllerProps<TFieldValues, TName>) => {
  const value = useWatch({ control, name });

  return (
    <div {...props} className={cn(className, value && "opacity-50")}>
      {value}
    </div>
  );
};
