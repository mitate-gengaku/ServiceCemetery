"use client";

import { UserIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  userName: string | null;
  imageUrl: string | null;
}

export const UserSection = ({ userName, imageUrl }: Props) => {
  return (
    <div className="flex flex-col items-center gap-8">
      <Avatar className="size-36">
        <AvatarImage src={imageUrl ?? undefined} alt="@shadcn" />
        <AvatarFallback>
          <UserIcon />
        </AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-4xl font-semibold">{userName}</h2>
      </div>
    </div>
  );
};
