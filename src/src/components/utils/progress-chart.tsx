type Language = {
  value: number;
  color: string;
  // start: number;
  // end: number;
  language: string;
};

const convertLanguages = (languages: { [key: string]: number }) => {
  const result: Language[] = [];
  const keys = Object.keys(languages);
  const values = Object.values(languages);
  const maxValue = values.reduce((accum, current) => {
    return accum + current;
  });

  for (let i = 0; i < keys.length; i++) {
    result.push({
      value: parseFloat(((values[i] / maxValue) * 100).toFixed(1)),
      color: "#3B82F6",
      language: keys[i],
    });
  }

  return result;
};

export const ProgressChart = ({ languages }: { languages: { [key: string]: number } | null }) => {
  const convertedLanguages = languages ? convertLanguages(languages) : [];

  const markers = [0, 25, 50, 75, 100];

  return (
    <div className="cursor-default">
      <div className="flex justify-between mb-2">
        {markers.map((marker, index) => (
          <div key={index} className="text-xs font-medium text-gray-700">
            {marker}
          </div>
        ))}
      </div>

      <div className="relative h-2 flex rounded-full overflow-hidden">
        {convertedLanguages.map((language, index) => (
          <div
            key={index}
            className="h-full"
            style={{
              backgroundColor: language.color,
              width: `${language.value}%`,
            }}
          />
        ))}
      </div>

      <ul className="py-2 flex items-center gap-4 flex-wrap">
        {!convertedLanguages.length && <li className="flex items-center gap-1 text-sm">データがありません</li>}
        {convertedLanguages.map(({ value, color, language }, i) => (
          <li className="flex items-center gap-1 text-sm font-semibold" key={`${language}-${i}`}>
            <p
              className="size-2 rounded-full"
              style={{
                backgroundColor: color,
              }}
            />
            {language}
            <p className="font-normal text-sm text-muted-foreground">{value}%</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
