import { cn } from "@/utils/cn";
import React, { type ReactNode } from "react";

export const LeftSectionContainer = async ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    {...props} 
    className={cn(
      className,
      "w-full md:w-2/5 md:min-w-2/5 md:max-w-2/5 px-4 md:px-10 py-16 md:py-12 gap-y-4 flex flex-col justify-center"
    )}
    />
);
