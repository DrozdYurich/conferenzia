import apparat from "@/data/apparat";
import useDataStoreVer from "@/store/useDataVeroyatn";

const CURRENT_YEAR = 2024;
const PREV_YEAR = CURRENT_YEAR - 1;

// Вспомогательные функции для расчетов
function calculateAverage(values) {
  if (!values.length) return 0;
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

function createProtestGroups() {
  const groups = {
    "Экономическая детерминация": [
      "Материальное положение",
      "Цены на жилье", 
      "Цены на предметы быта и обихода",
      "Безработица"
    ],
    "Абсентеистские настроения": [
      "Акции протеста"
    ],
    "Городская среда": [
      "Качество дорог",
      "ЖКХ",
      "Преступность"
    ],
    "Действия властей, подрывающие авторитет": [
      "Коррупция",
      "Бездействие властей"
    ],
    "Социальная дифференциация": [
      "Социальная структура электората",
      "Возрастная структура электората", 
      "Конфессиональная структура электората"
    ]
  };

  return groups;
}

// Функция для получения данных по группам из вашего объекта
function calculateGroupProbability(factors, regionData) {
  let totalFactors = factors.length;
  let triggeredFactors = 0;
  
  // Объект для хранения информации по каждому фактору
  const factorsData = {};

  console.log(`\nРасчет для группы с ${totalFactors} факторами:`, factors);

  factors.forEach((factor) => {
    const currentKey = `${factor} за ${CURRENT_YEAR} год`;
    const prevKey = `${factor} за ${PREV_YEAR} год`;
    
    const currentValue = regionData[0][currentKey];
    const prevValue = regionData[0][prevKey];

    console.log(`Фактор "${factor}":`, { 
      currentKey, 
      prevKey, 
      currentValue, 
      prevValue,
      hasCurrent: currentValue !== undefined,
      hasPrev: prevValue !== undefined
    });

    if (currentValue === undefined || prevValue === undefined) {
      console.log(`❌ Пропуск фактора "${factor}" - отсутствуют данные`);
      factorsData[factor] = {
        triggered: false,
        value: 0,
        reason: 'Отсутствуют данные',
        currentValue: null,
        prevValue: null
      };
      return;
    }

    let isTriggered = false;
    let triggerReason = '';
    const current = parseFloat(currentValue);
    const prev = parseFloat(prevValue);

    switch (factor) {
      // Экономическая детерминация
      case "Материальное положение": {
        const inflCurrent = parseFloat(regionData[0][`Инфляция за ${CURRENT_YEAR} год`]);
        if (isNaN(inflCurrent)) {
          triggerReason = 'Нет данных по инфляции';
          break;
        }
        isTriggered = current < inflCurrent;
        triggerReason = `Зарплата (${current}%) < Инфляция (${inflCurrent}%)`;
        console.log(`💰 "${factor}": ${current} < ${inflCurrent} = ${isTriggered}`);
        break;
      }
      case "Цены на жилье": {
        const incomeCurrent = parseFloat(regionData[0][`Материальное положение за ${CURRENT_YEAR} год`]);
        if (isNaN(incomeCurrent)) {
          triggerReason = 'Нет данных по доходам';
          break;
        }
        isTriggered = current > incomeCurrent;
        triggerReason = `Цены на жилье (${current}%) > Рост доходов (${incomeCurrent}%)`;
        console.log(`🏠 "${factor}": ${current} > ${incomeCurrent} = ${isTriggered}`);
        break;
      }
      case "Цены на предметы быта и обихода": {
        const prevYear2 = CURRENT_YEAR - 2;
        const prevYear3 = CURRENT_YEAR - 3;
        const keyPrev2 = `${factor} за ${prevYear2} год`;
        const keyPrev3 = `${factor} за ${prevYear3} год`;
        const valuePrev2 = parseFloat(regionData[0][keyPrev2]);
        const valuePrev3 = parseFloat(regionData[0][keyPrev3]);
        
        if (!isNaN(valuePrev2) && !isNaN(valuePrev3)) {
          const avgPrevYears = calculateAverage([prev, valuePrev2, valuePrev3]);
          isTriggered = current > avgPrevYears;
          triggerReason = `Текущий рост (${current}%) > Средний за 3 года (${avgPrevYears.toFixed(2)}%)`;
          console.log(`🛒 "${factor}": ${current} > ${avgPrevYears} (среднее) = ${isTriggered}`);
        } else {
          isTriggered = current > prev;
          triggerReason = `Текущий рост (${current}%) > Прошлый год (${prev}%)`;
          console.log(`🛒 "${factor}": ${current} > ${prev} = ${isTriggered}`);
        }
        break;
      }
      case "Безработица": {
        const prevYears = [PREV_YEAR];
        for (let i = 2; i <= 5; i++) {
          prevYears.push(CURRENT_YEAR - i);
        }
        
        const prevValues = prevYears
          .map(year => parseFloat(regionData[0][`${factor} за ${year} год`]))
          .filter(val => !isNaN(val));
        
        if (prevValues.length > 0) {
          const avgPrevUnemployment = calculateAverage(prevValues);
          isTriggered = current > avgPrevUnemployment + 1;
          triggerReason = `Текущий уровень (${current}%) > Средний за 5 лет (${avgPrevUnemployment.toFixed(2)}%) + 1%`;
          console.log(`👔 "${factor}": ${current} > ${avgPrevUnemployment} + 1 = ${isTriggered}`);
        } else {
          isTriggered = current > prev;
          triggerReason = `Текущий уровень (${current}%) > Прошлый год (${prev}%)`;
          console.log(`👔 "${factor}": ${current} > ${prev} = ${isTriggered}`);
        }
        break;
      }

      // Абсентеистские настроения
      case "Акции протеста":
        isTriggered = current >= 10;
        triggerReason = `Количество акций: ${current}`;
        console.log(`📢 "${factor}": ${current} >= 1 = ${isTriggered}`);
        break;

      // Городская среда
      case "Качество дорог": {
        const prevYear2 = CURRENT_YEAR - 2;
        const prevYear3 = CURRENT_YEAR - 3;
        const keyPrev2 = `${factor} за ${prevYear2} год`;
        const keyPrev3 = `${factor} за ${prevYear3} год`;
        const valuePrev2 = parseFloat(regionData[0][keyPrev2]);
        const valuePrev3 = parseFloat(regionData[0][keyPrev3]);
        
        if (!isNaN(valuePrev2) && !isNaN(valuePrev3)) {
          const avgPrevYears = calculateAverage([prev, valuePrev2, valuePrev3]);
          isTriggered = current < avgPrevYears * 0.95;
          triggerReason = `Текущий уровень (${current}%) < Средний за 3 года (${avgPrevYears.toFixed(2)}%) * 95%`;
          console.log(`🛣️ "${factor}": ${current} < ${avgPrevYears} * 0.95 = ${isTriggered}`);
        } else {
          isTriggered = current < prev;
          triggerReason = `Текущий уровень (${current}%) < Прошлый год (${prev}%)`;
          console.log(`🛣️ "${factor}": ${current} < ${prev} = ${isTriggered}`);
        }
        break;
      }
      case "ЖКХ": {
        const incomeGrowth = parseFloat(regionData[0][`Материальное положение за ${CURRENT_YEAR} год`]);
        if (isNaN(incomeGrowth)) {
          triggerReason = 'Нет данных по доходам';
          break;
        }
        isTriggered = current > incomeGrowth;
        triggerReason = `Рост тарифов (${current}%) > Рост доходов (${incomeGrowth}%)`;
        console.log(`🏘️ "${factor}": ${current} > ${incomeGrowth} = ${isTriggered}`);
        break;
      }
      case "Преступность": {
        const prevYear2 = CURRENT_YEAR - 2;
        const prevYear3 = CURRENT_YEAR - 3;
        const keyPrev2 = `${factor} за ${prevYear2} год`;
        const keyPrev3 = `${factor} за ${prevYear3} год`;
        const valuePrev2 = parseFloat(regionData[0][keyPrev2]);
        const valuePrev3 = parseFloat(regionData[0][keyPrev3]);
        
        if (!isNaN(valuePrev2) && !isNaN(valuePrev3)) {
          const avgPrevYears = calculateAverage([prev, valuePrev2, valuePrev3]);
          isTriggered = current > avgPrevYears * 1.05;
          triggerReason = `Текущий уровень (${current}%) > Средний за 3 года (${avgPrevYears.toFixed(2)}%) * 105%`;
          console.log(`🚔 "${factor}": ${current} > ${avgPrevYears} * 1.05 = ${isTriggered}`);
        } else {
          isTriggered = current > prev;
          triggerReason = `Текущий уровень (${current}%) > Прошлый год (${prev}%)`;
          console.log(`🚔 "${factor}": ${current} > ${prev} = ${isTriggered}`);
        }
        break;
      }

      // Действия властей, подрывающие авторитет
      case "Коррупция":
        isTriggered = current > 0;
        triggerReason = `Уровень недовольства: ${current}`;
        console.log(`💰 "${factor}": ${current} > 0 = ${isTriggered}`);
        break;
      case "Бездействие властей":
        isTriggered = current >= prev * 1.2;
        triggerReason = `Текущие жалобы (${current}) >= ${prev} * 120%`;
        console.log(`🏛️ "${factor}": ${current} >= ${prev} * 1.2 = ${isTriggered}`);
        break;

      // Социальная дифференциация
      case "Социальная структура электората":
        isTriggered = (current - prev) > 0.05;
        triggerReason = `Рост коэффициента Джини: ${(current - prev).toFixed(3)} > 0.05`;
        console.log(`📊 "${factor}": ${current} - ${prev} > 0.05 = ${isTriggered}`);
        break;
      case "Возрастная структура электората":
        isTriggered = (current - prev) > 5;
        triggerReason = `Рост доли молодежи: ${(current - prev).toFixed(2)}% > 5%`;
        console.log(`👥 "${factor}": ${current} - ${prev} > 5 = ${isTriggered}`);
        break;
      case "Конфессиональная структура электората":
        isTriggered = (current - prev) > 10;
        triggerReason = `Рост конфликтов: ${(current - prev).toFixed(2)}% > 10%`;
        console.log(`🕌 "${factor}": ${current} - ${prev} > 10 = ${isTriggered}`);
        break;
    }

    if (isTriggered) {
      triggeredFactors++;
      console.log(`✅ Фактор "${factor}" СРАБОТАЛ!`);
    } else {
      console.log(`❌ Фактор "${factor}" не сработал`);
    }

    // Сохраняем данные по фактору
    factorsData[factor] = {
      triggered: isTriggered,
      value: isTriggered ? 1 : 0, // 1 если сработал, 0 если нет
      reason: triggerReason || 'Не определено',
      currentValue: current,
      prevValue: prev,
      currentKey,
      prevKey
    };
  });

  const groupProbability = totalFactors > 0 ? triggeredFactors / totalFactors : 0;
  console.log(`🎯 Итог по группе: ${triggeredFactors}/${totalFactors} = ${groupProbability}`);
  
  return {
    probability: groupProbability,
    triggeredFactors,
    totalFactors,
    factors: factorsData,
    ratio: `${triggeredFactors}/${totalFactors}`
  };
}

function calcProtestVer(regionName, regionData) {
  const verDat = useDataStoreVer();
  
  // Группируем факторы по категориям
  const groups = createProtestGroups();
  
  // Рассчитываем вероятность для каждой группы с деталями
  const groupProbabilities = {};
  Object.entries(groups).forEach(([category, factors]) => {
    const groupResult = calculateGroupProbability(factors, regionData);
    groupProbabilities[category] = groupResult;
    console.log(`Вероятность для группы "${category}":`, groupResult.probability);
  });

  // Применяем формулу полной вероятности для независимых событий
  let probabilityNoProtest = 1;
  Object.values(groupProbabilities).forEach(groupProb => {
    probabilityNoProtest *= (1 - groupProb.probability);
    console.log('probabilityNoProtest', probabilityNoProtest);
  });

  const finalProbability = 1 - probabilityNoProtest;

  console.log('Вероятности по группам:', groupProbabilities);
  
  // Создаем структурированные данные для хранения
  const structuredData = {};
  
  Object.entries(groupProbabilities).forEach(([category, groupData]) => {
    // Создаем объект для группы с общей вероятностью и деталями по факторам
    structuredData[category] = {
      probability: groupData.probability, // Общая вероятность группы
      factors: groupData.factors,         // Детали по каждому фактору
      triggeredFactors: groupData.triggeredFactors,
      totalFactors: groupData.totalFactors,
      ratio: groupData.ratio
    };
  });

  // Добавляем общую вероятность протеста
  structuredData.totalProbability = Math.round(finalProbability * 100) / 100;
  
  // Сохраняем структурированные данные
  verDat.setData(regionName, structuredData);
  
  console.log('Итоговая вероятность протеста:', finalProbability);

  // Возвращаем общую вероятность
  return Math.round(finalProbability * 100) / 100;
}

function addProtestVerToAllRegions(regionsData) {
  Object.entries(regionsData).forEach(([regionName, regionProxy]) => {
    console.log('regionName', regionName);
    const ver = calcProtestVer(regionName, regionProxy);
    regionProxy.ver = ver;
  });
  return regionsData;
}

export default addProtestVerToAllRegions;