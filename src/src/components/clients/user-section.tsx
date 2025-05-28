"use client";

import { UserIcon } from "lucide-react";

import { UserLanguages } from "@/components/clients/user-languages";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sortTop3Languages } from "@/utils/sort-top3-languages";

interface Props {
  userName: string | null;
  imageUrl: string | null;
  languages: {
    [key: string]: number;
  }[];
}

export const UserSection = ({ userName, imageUrl, languages }: Props) => {
  const sortedLanguages = sortTop3Languages(languages);

  return (
    <div className="flex flex-col items-center gap-8">
      <Avatar className="size-36">
        <AvatarImage src={imageUrl ?? undefined} alt={userName ?? "プロフィール画像"} />
        <AvatarFallback className="animate-pulse">
          <UserIcon className="animate-pulse" />
        </AvatarFallback>
      </Avatar>
      <div>
        <h2 className="mb-4 text-center text-3xl md:text-4xl font-semibold">{userName}</h2>
        <UserLanguages languages={sortedLanguages} />
      </div>
    </div>
  );
};
