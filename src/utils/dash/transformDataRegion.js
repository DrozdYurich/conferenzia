function transformRegionData(regionData) {
  const entries = Object.entries(regionData["0"]); // фактор+год → значение
  const result = {};

  entries.forEach(([key, value]) => {
    // Разбиваем ключ на фактор и год, например: "Рост цен на жилье за 2022 год"
    const match = key.match(/(.+) за (\d{4}) год/);
    if (match) {
      const factor = match[1].trim();
      const year = match[2];
      if (!result[factor]) result[factor] = {};
      result[factor][year] = value;
    }
  });

  return result;
}
export default transformRegionData;
