"use client";

import { UserIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LANGUAGE_COLORS } from "@/config/languages";

interface Props {
  userName: string | null;
  imageUrl: string | null;
  languages: {
    [key: string]: number;
  }[];
}

const calculateTop3UsedLanguages = (dataArray: { [key: string]: number }[]) => {
  const totals: { [key: string]: number } = {};

  for (const lang of dataArray) {
    Object.entries(lang).forEach(([key, value]) => {
      if (totals[key]) {
        totals[key] += value;
      } else {
        totals[key] = value;
      }
    });
  }

  const sortedEntries = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .map((v) => v[0])
    .slice(0, 3);

  return sortedEntries;
};

export const UserSection = ({ userName, imageUrl, languages }: Props) => {
  const sortedLanguages = calculateTop3UsedLanguages(languages);

  return (
    <div className="flex flex-col items-center gap-8">
      <Avatar className="size-36">
        <AvatarImage src={imageUrl ?? undefined} alt="@shadcn" />
        <AvatarFallback>
          <UserIcon />
        </AvatarFallback>
      </Avatar>
      <div className="space-y-2">
        <h2 className="text-center text-3xl md:text-4xl font-semibold">{userName}</h2>
        <h3 className="text-center">使用言語Top3</h3>
        <ol className="flex items-center justify-center flex-wrap gap-2">
          {sortedLanguages.map((language) => (
            <li key={language}>
              <Badge
                className="cursor-default"
                style={{
                  backgroundColor: LANGUAGE_COLORS.find((v) => v.name === language.toLowerCase())
                    ? LANGUAGE_COLORS.find((v) => v.name === language.toLowerCase())?.color
                    : "#e5e7eb",
                }}
              >
                {language}
              </Badge>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
