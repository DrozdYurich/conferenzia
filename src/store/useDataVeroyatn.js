import { defineStore } from "pinia";
import { computed, ref } from "vue";

const useDataStoreVer = defineStore("dataVeroytn", () => {
  // Изменяем на объект, так как будем использовать строковые ключи
  const Verdata = ref({});
  
  const getData = computed(() => {
    return Verdata.value;
  });

  function setData(name, newData) {
    Verdata.value[name] = newData;
    console.log(Verdata.value);
  }

  // Метод для получения данных по региону
  function getRegionData(regionName) {
    // Проверяем, существует ли такой регион
    if (regionName in Verdata.value) {
      return {
        region: regionName,
        data: Verdata.value[regionName],
        exists: true
      };
    } else {
      return {
        region: regionName,
        data: null,
        exists: false,
        message: `Данные для региона "${regionName}" не найдены`
      };
    }
  }

  // Метод для получения данных по нескольким регионам
  function getMultipleRegionsData(regionNames) {
    const results = {};
    
    regionNames.forEach(regionName => {
      if (regionName in Verdata.value) {
        results[regionName] = Verdata.value[regionName];
      }
    });
    
    return {
      data: results,
      found: Object.keys(results).length,
      total: regionNames.length
    };
  }

  // Метод для получения всех регионов, по которым есть данные
  function getAllRegions() {
    return Object.keys(Verdata.value);
  }

  // Метод для проверки существования данных по региону
  function hasRegionData(regionName) {
    return regionName in Verdata.value;
  }

  // Метод для получения статистики по регионам
  function getRegionsStats() {
    const regions = Object.keys(Verdata.value);
    
    if (regions.length === 0) {
      return {
        total: 0,
        message: "Нет данных по регионам"
      };
    }

    let totalProbability = 0;
    let maxProbability = 0;
    let minProbability = 1;
    let maxRegion = '';
    let minRegion = '';

    regions.forEach(region => {
      // Предполагаем, что данные содержат общую вероятность
      const regionData = Verdata.value[region];
      
      // Если у нас есть итоговая вероятность в данных региона
      if (typeof regionData === 'object' && 'totalProbability' in regionData) {
        const prob = regionData.totalProbability;
        totalProbability += prob;
        
        if (prob > maxProbability) {
          maxProbability = prob;
          maxRegion = region;
        }
        
        if (prob < minProbability) {
          minProbability = prob;
          minRegion = region;
        }
      }
    });

    return {
      total: regions.length,
      regions: regions,
      averageProbability: totalProbability / regions.length,
      maxProbability: {
        region: maxRegion,
        value: maxProbability
      },
      minProbability: {
        region: minRegion,
        value: minProbability
      }
    };
  }

  // Метод для удаления данных региона
  function removeRegionData(regionName) {
    if (regionName in Verdata.value) {
      delete Verdata.value[regionName];
      return true;
    }
    return false;
  }

  // Метод для очистки всех данных
  function clearAllData() {
    Verdata.value = {};
  }

  return { 
    getData, 
    setData, 
    getRegionData,
    getMultipleRegionsData,
    getAllRegions,
    hasRegionData,
    getRegionsStats,
    removeRegionData,
    clearAllData
  };
});

export default useDataStoreVer;