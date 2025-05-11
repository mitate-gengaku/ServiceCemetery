export const ProgressChart = () => {
  const segments = [
    { value: 55, color: "#3B82F6", start: 0, end: 55, language: "JavaScript" },
    { value: 30, color: "#22C55E", start: 55, end: 85, language: "HTML" },
    { value: 15, color: "#A855F7", start: 85, end: 100, language: "CSS" },
  ];

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
        {segments.map((segment, index) => (
          <div
            key={index}
            className="h-full"
            style={{
              backgroundColor: segment.color,
              width: `${segment.value}%`,
            }}
          />
        ))}
      </div>

      <ul className="py-2 flex items-center gap-4">
        {segments.map(({ value, color, language }, i) => (
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
