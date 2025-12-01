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

  console.log(`\nРасчет для группы с ${totalFactors} факторами:`, factors);

  factors.forEach((factor) => {
    const currentKey = `${factor} за ${CURRENT_YEAR} год`;
    const prevKey = `${factor} за ${PREV_YEAR} год`;
    
    // Исправлено: обращаемся напрямую к regionData[0], так как это объект с данными
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
      return;
    }

    let isTriggered = false;

    // Приводим значения к числам (на случай строковых значений как "1.4")
    const current = parseFloat(currentValue);
    const prev = parseFloat(prevValue);

    switch (factor) {
      // Экономическая детерминация
      case "Материальное положение": {
        const inflCurrent = parseFloat(regionData[0][`Инфляция за ${CURRENT_YEAR} год`]);
        if (isNaN(inflCurrent)) {
          console.log(`❌ Пропуск "${factor}" - нет данных по инфляции`);
          break;
        }
        // Зарплата выросла менее чем на уровень инфляции
        isTriggered = current < inflCurrent;
        console.log(`💰 "${factor}": ${current} < ${inflCurrent} = ${isTriggered}`);
        break;
      }
      case "Цены на жилье": {
        const incomeCurrent = parseFloat(regionData[0][`Материальное положение за ${CURRENT_YEAR} год`]);
        if (isNaN(incomeCurrent)) {
          console.log(`❌ Пропуск "${factor}" - нет данных по доходам`);
          break;
        }
        // Рост цен на жилье превышает рост доходов
        isTriggered = current > incomeCurrent;
        console.log(`🏠 "${factor}": ${current} > ${incomeCurrent} = ${isTriggered}`);
        break;
      }
      case "Цены на предметы быта и обихода": {
        // Нужны данные за предыдущие 3 года для сравнения
        const prevYear2 = CURRENT_YEAR - 2;
        const prevYear3 = CURRENT_YEAR - 3;
        const keyPrev2 = `${factor} за ${prevYear2} год`;
        const keyPrev3 = `${factor} за ${prevYear3} год`;
        const valuePrev2 = parseFloat(regionData[0][keyPrev2]);
        const valuePrev3 = parseFloat(regionData[0][keyPrev3]);
        
        if (!isNaN(valuePrev2) && !isNaN(valuePrev3)) {
          const avgPrevYears = calculateAverage([prev, valuePrev2, valuePrev3]);
          isTriggered = current > avgPrevYears;
          console.log(`🛒 "${factor}": ${current} > ${avgPrevYears} (среднее) = ${isTriggered}`);
        } else {
          // Если данных нет, используем простое сравнение
          isTriggered = current > prev;
          console.log(`🛒 "${factor}": ${current} > ${prev} = ${isTriggered}`);
        }
        break;
      }
      case "Безработица": {
        // Нужны данные за предыдущие 5 лет
        const prevYears = [PREV_YEAR];
        for (let i = 2; i <= 5; i++) {
          prevYears.push(CURRENT_YEAR - i);
        }
        
        const prevValues = prevYears
          .map(year => parseFloat(regionData[0][`${factor} за ${year} год`]))
          .filter(val => !isNaN(val));
        
        if (prevValues.length > 0) {
          const avgPrevUnemployment = calculateAverage(prevValues);
          isTriggered = current > avgPrevUnemployment + 1; // Превышение на 1%
          console.log(`👔 "${factor}": ${current} > ${avgPrevUnemployment} + 1 = ${isTriggered}`);
        } else {
          isTriggered = current > prev;
          console.log(`👔 "${factor}": ${current} > ${prev} = ${isTriggered}`);
        }
        break;
      }

      // Абсентеистские настроения
      case "Акции протеста":
        // Хотя бы одна акция
        isTriggered = current >= 1;
        console.log(`📢 "${factor}": ${current} >= 1 = ${isTriggered}`);
        break;

      // Городская среда
      case "Качество дорог": {
        // Нужны данные за предыдущие 3 года
        const prevYear2 = CURRENT_YEAR - 2;
        const prevYear3 = CURRENT_YEAR - 3;
        const keyPrev2 = `${factor} за ${prevYear2} год`;
        const keyPrev3 = `${factor} за ${prevYear3} год`;
        const valuePrev2 = parseFloat(regionData[0][keyPrev2]);
        const valuePrev3 = parseFloat(regionData[0][keyPrev3]);
        
        if (!isNaN(valuePrev2) && !isNaN(valuePrev3)) {
          const avgPrevYears = calculateAverage([prev, valuePrev2, valuePrev3]);
          // Снижение качества на 5% и более
          isTriggered = current < avgPrevYears * 0.95;
          console.log(`🛣️ "${factor}": ${current} < ${avgPrevYears} * 0.95 = ${isTriggered}`);
        } else {
          isTriggered = current < prev;
          console.log(`🛣️ "${factor}": ${current} < ${prev} = ${isTriggered}`);
        }
        break;
      }
      case "ЖКХ": {
        const incomeGrowth = parseFloat(regionData[0][`Материальное положение за ${CURRENT_YEAR} год`]);
        if (isNaN(incomeGrowth)) {
          console.log(`❌ Пропуск "${factor}" - нет данных по доходам`);
          break;
        }
        // Тарифы выросли больше чем зарплата
        isTriggered = current > incomeGrowth;
        console.log(`🏘️ "${factor}": ${current} > ${incomeGrowth} = ${isTriggered}`);
        break;
      }
      case "Преступность": {
        // Нужны данные за предыдущие 3 года
        const prevYear2 = CURRENT_YEAR - 2;
        const prevYear3 = CURRENT_YEAR - 3;
        const keyPrev2 = `${factor} за ${prevYear2} год`;
        const keyPrev3 = `${factor} за ${prevYear3} год`;
        const valuePrev2 = parseFloat(regionData[0][keyPrev2]);
        const valuePrev3 = parseFloat(regionData[0][keyPrev3]);
        
        if (!isNaN(valuePrev2) && !isNaN(valuePrev3)) {
          const avgPrevYears = calculateAverage([prev, valuePrev2, valuePrev3]);
          // Рост преступности более чем на 5%
          isTriggered = current > avgPrevYears * 1.05;
          console.log(`🚔 "${factor}": ${current} > ${avgPrevYears} * 1.05 = ${isTriggered}`);
        } else {
          isTriggered = current > prev;
          console.log(`🚔 "${factor}": ${current} > ${prev} = ${isTriggered}`);
        }
        break;
      }

      // Действия властей, подрывающие авторитет
      case "Коррупция":
        // Высокий уровень недовольства
        isTriggered = current > 0;
        console.log(`💰 "${factor}": ${current} > 0 = ${isTriggered}`);
        break;
      case "Бездействие властей":
        // Превышение жалоб на 20% относительно предыдущего периода
        isTriggered = current >= prev * 1.2;
        console.log(`🏛️ "${factor}": ${current} >= ${prev} * 1.2 = ${isTriggered}`);
        break;

      // Социальная дифференциация
      case "Социальная структура электората":
        // Рост коэффициента Джини более чем на 0.05
        isTriggered = (current - prev) > 0.05;
        console.log(`📊 "${factor}": ${current} - ${prev} > 0.05 = ${isTriggered}`);
        break;
      case "Возрастная структура электората":
        // Рост доли молодежи более чем на 5%
        isTriggered = (current - prev) > 5;
        console.log(`👥 "${factor}": ${current} - ${prev} > 5 = ${isTriggered}`);
        break;
      case "Конфессиональная структура электората":
        // Рост конфликтов на 10%
        isTriggered = (current - prev) > 10;
        console.log(`🕌 "${factor}": ${current} - ${prev} > 10 = ${isTriggered}`);
        break;
    }

    if (isTriggered) {
      triggeredFactors++;
      console.log(`✅ Фактор "${factor}" СРАБОТАЛ!`);
    } else {
      console.log(`❌ Фактор "${factor}" не сработал`);
    }
  });

  const groupProbability = totalFactors > 0 ? triggeredFactors / totalFactors : 0;
  console.log(`🎯 Итог по группе: ${triggeredFactors}/${totalFactors} = ${groupProbability}`);
  
  return groupProbability;
}
function calcProtestVer(regionName,regionData) {
  const verDat = useDataStoreVer()
  // Группируем факторы по категориям
  const groups = createProtestGroups();;
  // Рассчитываем вероятность для каждой группы
  const groupProbabilities = {};
  Object.entries(groups).forEach(([category, factors]) => {
    const probability = calculateGroupProbability(factors, regionData);
    groupProbabilities[category] = probability;
    console.log(`Вероятность для группы "${category}":`, probability);
  });

  // Применяем формулу полной вероятности для независимых событий
  // P(Протест) = 1 - ∏(1 - P(A_i))
  let probabilityNoProtest = 1;

  Object.values(groupProbabilities).forEach(groupProb => {
    probabilityNoProtest *= (1 - groupProb);
    console.log('probabilityNoProtest',probabilityNoProtest)
  });

  const finalProbability = 1 - probabilityNoProtest;

  console.log('Вероятности по группам:', groupProbabilities);
  verDat.setData(regionName,groupProbabilities)
  console.log('Итоговая вероятность протеста:', finalProbability);

  // Округляем до 2 знаков после запятой
  return Math.round(finalProbability * 100) / 100;
}

function addProtestVerToAllRegions(regionsData) {
  Object.entries(regionsData).forEach(([regionName, regionProxy]) => {
    console.log('regionName',regionName)
    const ver = calcProtestVer(regionName,regionProxy);
    regionProxy.ver = ver;
  });
  return regionsData;
}

export default addProtestVerToAllRegions;