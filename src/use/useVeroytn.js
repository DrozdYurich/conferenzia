import apparat from "@/data/apparat";

const CURRENT_YEAR = 2024;
const PREV_YEAR = CURRENT_YEAR - 1;
function calcProtestVer(regionData) {
  let totalFactors = 0;
  let triggered = 0;
  apparat.forEach((group) => {
    group.factors.forEach((factor) => {
      totalFactors++;
      const currentKey = `${factor.name} за ${CURRENT_YEAR} год`;
      const prevKey = `${factor.name} за ${PREV_YEAR} год`;
      const currentValue = regionData[0][currentKey];
      const prevValue = regionData[0][prevKey];
      if (currentValue === undefined || prevValue === undefined) return;
      switch (factor.name) {
        case "Материальное положение": {
          const inflCurrent = regionData[`Инфляция за ${CURRENT_YEAR} год`];
          if (inflCurrent === undefined) break;
          if (currentValue < inflCurrent) triggered++;
          break;
        }
        case "Цены на жилье": {
          const zpCurrent = regionData[`Материальное положение за ${CURRENT_YEAR} год`];
          if (zpCurrent === undefined) break;
          if (currentValue > zpCurrent) triggered++;
          break;
        }
        case "Цены на предметы быта и обихода":
          if (currentValue > prevValue) triggered++;
          break;
        case "Безработица":
          if (currentValue > prevValue) triggered++;
          break;
        case "Акции протеста":
          if (currentValue > prevValue) triggered++;
          break;
        case "Качество дорог":
          // Падение качества - если показатель снизился, индикатор сработал
          if (currentValue < prevValue) triggered++;
          break;
        case "Преступность":
          if (currentValue > 0) triggered++;
          break;
        case "ЖКХ":
          if (currentValue > 0) triggered++;
          break;
        case "Коррупция":
          if (currentValue > 0) triggered++;
          break;
        case "Бездействие властей":
          if (currentValue >= 5) triggered++;
          break;
        case "Социальная структура электората":
          if (currentValue >= 20) triggered++;
          break;
        case "Возрастная структура электората":
          if (currentValue >= 20) triggered++;
          break;
         case "Конфессиональная структура электората":
          if (currentValue >= 20) triggered++;
          break;
      }
    });
  });

  return totalFactors ? Math.round((triggered / totalFactors) * 100) / 100 : 0;
}

function addProtestVerToAllRegions(regionsData) {
  Object.entries(regionsData).forEach(([regionName, regionProxy]) => {
    const ver = calcProtestVer(regionProxy);
    regionProxy.ver = ver;
  });
  return regionsData;
}

export default addProtestVerToAllRegions;
