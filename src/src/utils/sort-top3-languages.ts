export const sortTop3Languages = (dataArray: { [key: string]: number }[]) => {
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
