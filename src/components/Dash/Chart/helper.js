export function aggregatePercentGrowth(rawData) {
  // Группируем данные по показателям и годам
  const grouped = {};

  rawData.forEach(({ selectedFactor, data }) => {
    if (!grouped[selectedFactor]) grouped[selectedFactor] = {};

    data.forEach(({ year, value }) => {
      if (!grouped[selectedFactor][year]) grouped[selectedFactor][year] = [];
      grouped[selectedFactor][year].push(value);
    });
  });

  // Для каждого показателя и года считаем средний рост через геометрическое среднее коэффициентов
  const aggregated = [];

  Object.entries(grouped).forEach(([factor, years]) => {
    const data = Object.entries(years).map(([year, values]) => {
      // Конвертируем проценты в коэффициенты роста
      const coeffs = values.map((v) => 1 + v / 100);
      // Вычисляем геометрическое среднее коэффициентов
      const product = coeffs.reduce((acc, c) => acc * c, 1);
      const geomMean = Math.pow(product, 1 / coeffs.length);
      // Переводим обратно в проценты
      const aggregatedValue = (geomMean - 1) * 100;
      return { year, value: +aggregatedValue.toFixed(2) };
    });
    aggregated.push({ selectedFactor: factor, data });
  });

  return aggregated;
}
export function filterDataAgr(data, factor) {
  const filtrData = data.find((item) => item.selectedFactor === factor);
  return filtrData;
}
