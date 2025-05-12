import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const TopSection = async ({ children }: Props) => (
  <div className="w-full md:w-2/5 md:min-w-2/5 md:max-w-2/5 px-4 md:px-10 py-16 md:py-8 gap-y-4 flex flex-col justify-center">
    {children}
  </div>
);
