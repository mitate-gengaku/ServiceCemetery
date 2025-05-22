import { Badge } from "@/components/ui/badge"
import { LANGUAGE_COLORS } from "@/config/languages"

interface Props {
  languages: string[]
}

export const UserLanguages = ({ languages }: Props) => {
  if (!languages) return null;

  return (
    <div className="space-y-1">
      <h3 className="text-center text-muted-foreground text-sm md:text-base">使用言語Top3</h3>
      <ol className="flex items-center justify-center flex-wrap gap-2">
        {languages.map((language) => (
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
  )
}