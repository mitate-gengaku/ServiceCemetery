"use client";

import { UserIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserSection = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <Avatar className="size-36 rounded-sm">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>
          <UserIcon className="rounded-sm" />
        </AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-4xl font-semibold">shadcn</h2>
      </div>
    </div>
  );
};
