import { cn } from "@/utils/cn";
import React from "react";

export const MainContainer = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div 
    {...props}
    className={cn(
      className,
      "w-full h-full relative flex flex-col md:flex-row"
    )} 
    />
)