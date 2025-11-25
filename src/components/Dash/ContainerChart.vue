<template>
  <div class="PriceHome">
    <AppChartVue
    v-if="dataDonePriceHome.selectedFactor"
      :selectedFactor="dataDonePriceHome.selectedFactor"
      :dataArray="dataDonePriceHome.data"
    />
  </div>
  <div class="PriceKorz">
    <AppChartVue
    v-if="dataDonePriceKorz.selectedFactor"
      :selectedFactor="dataDonePriceKorz.selectedFactor"
      :dataArray="dataDonePriceKorz.data"
    />
  </div>
  <div class="Job">
    <AppChartVue
    v-if="dataDoneJob.selectedFactor"
      :selectedFactor="dataDoneJob.selectedFactor"
      :dataArray="dataDoneJob.data"
    />
  </div>
  <div class="Many">
    <AppChartVue
    v-if="dataDoneMany.selectedFactor"
      :selectedFactor="dataDoneMany.selectedFactor"
      :dataArray="dataDoneMany.data"
    />
  </div>
  <div class="Prest">
    <AppChartVue
    v-if="dataDonePrest.selectedFactor"
      :selectedFactor="dataDonePrest.selectedFactor"
      :dataArray="dataDonePrest.data"
      chartType="bar"
    />
  </div>
  <div class="Row">
    <AppChartVue
    v-if="dataDoneRow.selectedFactor"
      :selectedFactor="dataDoneRow.selectedFactor"
      :dataArray="dataDoneRow.data"
      chartType="bar"
    />
  </div>
  <div class="Zak">
    <AppChartVue
    v-if="dataDoneZak.selectedFactor"
      :selectedFactor="dataDoneZak.selectedFactor"
      :dataArray="dataDoneZak.data"
      chartType="doughnut"
    />
  </div>
  <div class="Open">
    <AppChartVue
    v-if="dataDoneOpen.selectedFactor"
      :selectedFactor="dataDoneOpen.selectedFactor"
      :dataArray="dataDoneOpen.data"
      chartType="pie"
    />
  </div>
  <div class="Vlast">
    <AppChartVue
    v-if="dataDoneVlast.selectedFactor"
      :selectedFactor="dataDoneVlast.selectedFactor"
      :dataArray="dataDoneVlast.data"
      chartType="pie"
    />
  </div>
  <div class="Paccive">
    <AppChartVue
    v-if="dataDonePaccive.selectedFactor"
      :selectedFactor="dataDonePaccive.selectedFactor"
      :dataArray="dataDonePaccive.data"
      chartType="pie"
    />
  </div>
  <div class="Infl">
    <AppChartVue
    v-if="dataDoneInfl.selectedFactor"
      :selectedFactor="dataDoneInfl.selectedFactor"
      :dataArray="dataDoneInfl.data"
      chartType="bar"
    />
  </div>
  <div class="Social">
    <AppChartVue
    v-if="dataDoneSozial.selectedFactor"
      :selectedFactor="dataDoneSozial.selectedFactor"
      :dataArray="dataDoneSozial.data"
      chartType="bar"
    />
  </div>
    <div class="Vozrast">
    <AppChartVue
    v-if="dataDoneVozrast.selectedFactor"
      :selectedFactor="dataDoneVozrast.selectedFactor"
      :dataArray="dataDoneVozrast.data"
      chartType="bar"
    />
  </div>
      <div class="Konfesional">
    <AppChartVue
    v-if="dataDoneKonfesion.selectedFactor"
      :selectedFactor="dataDoneKonfesion.selectedFactor"
      :dataArray="dataDoneKonfesion.data"
      chartType="bar"
    />
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import AppChartVue from "./Chart/AppChartVue.vue";
import useDataStore from "@/store/useDataStore";
import { computed, ref } from "vue";
import { aggregatePercentGrowth, filterDataAgr } from "./Chart/helper";
import { filterDataByFO, filterDataByReg } from "./Adm/utils";
import useSrezFoStore from "@/store/useSrezFoStore";
import useSrezRegStore from "@/store/useSrezReg";
const { getFo } = storeToRefs(useSrezFoStore());
const { getReg } = storeToRefs(useSrezRegStore());
const { getData } = storeToRefs(useDataStore());
const dataAll = computed(() => getData.value);
function prepareChartsData(data) {
  const chartsArray = [];
  const chartTypes = ["line", "bar", "pie"];
  let chartTypeIndex = 0;
  console.log(data);
  for (const regionName in data) {
    const factorsData = data[regionName]["0"];
    const federalDistrict = data[regionName].federalDistr;
    const factorNamesSet = new Set();
    for (const key in factorsData) {
      const factorName = key.replace(/\s+за\s+\d{4}\s+год$/, "").trim();
      
      factorNamesSet.add(factorName);
    }
    
    factorNamesSet.forEach((factorName) => {
      const factorData = Object.entries(factorsData)
        .filter(([key]) => key.startsWith(factorName))
        .map(([key, value]) => {
          const year = key.match(/\d{4}/)?.[0];
          return year && value !== undefined ? { year, value } : null;
        })
        .filter((item) => item !== null);
      
      chartsArray.push({
        regionName,
        selectedFactor: factorName,
        data: factorData,
        federalDistrict,
        chartType: chartTypes[chartTypeIndex % chartTypes.length], // Циклически выбираем тип
      });
      chartTypeIndex++;
    });
  }

  return chartsArray;
}
const chartsData = ref(prepareChartsData(dataAll.value));
const filteredChartsData = computed(() => {
  return filterDataByReg(
    filterDataByFO(chartsData.value, getFo.value.label),
    getReg.value.label
  ).filter((n) => n && n.selectedFactor !== "undefined");
});

const agrData = computed(() =>
  aggregatePercentGrowth(filteredChartsData.value)
);
const dataDonePriceHome = computed(() =>
  filterDataAgr(agrData.value, "Цены на жилье")
);
const dataDonePriceKorz = computed(() =>
  filterDataAgr(agrData.value, "Цены на предметы быта и обихода")
);
const dataDoneJob = computed(() =>
  filterDataAgr(agrData.value, "Безработица")
);
const dataDoneMany = computed(() => filterDataAgr(agrData.value, "Материальное положение"));
const dataDonePrest = computed(() =>
  filterDataAgr(agrData.value, "Преступность")
);
const dataDoneRow = computed(() =>
  filterDataAgr(agrData.value, "Качество дорог")
);
const dataDoneZak = computed(() =>
  filterDataAgr(agrData.value, "Коррупция")
);
const dataDoneOpen = computed(() =>
  filterDataAgr(agrData.value, "Акции протеста")
);
const dataDoneVlast = computed(() =>
  filterDataAgr(agrData.value, "ЖКХ")
);
const dataDonePaccive = computed(() =>
  filterDataAgr(agrData.value, "Бездействие властей")
);
const dataDoneSozial = computed(() =>
  filterDataAgr(agrData.value, "Социальная структура электората")
);
const dataDoneVozrast = computed(() =>
  filterDataAgr(agrData.value, "Возрастная структура электората")
);
const dataDoneKonfesion = computed(() =>
  filterDataAgr(agrData.value, "Конфессиональная структура электората")
);
const dataDoneInfl = computed(() => filterDataAgr(agrData.value, "Инфляция"));
</script>
<style scoped>
.PriceHome {
  grid-area: PriceHome;
}
.PriceKorz {
  grid-area: PriceKorz;
}
.Job {
  grid-area: Job;
}
.Many {
  grid-area: Many;
}
.Prest {
  grid-area: Prest;
}
.Row {
  grid-area: Row;
}
.Zak {
  grid-area: Zak;
}
.Open {
  grid-area: Open;
}
.Vlast {
  grid-area: Vlast;
}
.Paccive {
  grid-area: Paccive;
}
.Infl {
  grid-area: Infl;
}

/* Стиль скроллбара для WebKit (Chrome, Safari) */
.w-fu::-webkit-scrollbar {
  width: 8px;
}

.w-fu::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 4px;
}

.w-fu::-webkit-scrollbar-thumb {
  background-color: #4a90e2;
  border-radius: 4px;
  border: 2px solid #f0f0f0;
}

.w-fu::-webkit-scrollbar-thumb:hover {
  background-color: #357abd;
}
</style>
