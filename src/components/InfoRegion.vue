<template>
  <div>
    <h2 class="h2">{{ nameregion }} {{ data.federalDistr }}</h2>
    <div class="info">
      <div class="accord">
        <AppAccordion />
      </div>
      <div class="infApp">
        <InfoApparat />
      </div>
      <div>
        <transition name="fade" mode="out-in">
          <BarChart
            v-if="nameMenu"
            :key="nameMenu"
            :chartData="chartData"
            :chartOptions="chartOptions"
          />
          <div v-else>Выберите фактор</div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import useDataOneRegion from "@/use/UseDataOneRedion";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import ThePagination from "./ThePagination.vue";
import BarChart from "./BarChart.vue";
import useDataKeys from "@/use/useRataKeys";
import AppAccordion from "./AppAccordion.vue";
import useApparatStore from "@/store/useApparatStore";
import { storeToRefs } from "pinia";
import InfoApparat from "./InfoApparat.vue";

import apparat from "@/data/apparat";
const route = useRoute();
const { getNameFilter, getnameGroup } = storeToRefs(useApparatStore());
const nameregion = route.params.name;
const data = computed(() => useDataOneRegion(nameregion));
const nameMenu = computed(() => {
  return getNameFilter.value;
});

const chartKeysAndValues = computed(() => {
  console.log(data.value[0],'data.value[0]')
  console.log(nameMenu.value,'nameMenu.value')
  return useDataKeys(data.value[0], nameMenu.value);
});

const chartData = computed(() => ({
  labels: chartKeysAndValues.value.keys.map((it) => it),
  datasets: [
    {
      label: nameMenu.value,
      data: chartKeysAndValues.value.values.map((it) => it),
      borderColor: "white",
      backgroundColor: ["white", "blue", "red"],
      borderRadius: 4,
    },
  ],
}));

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "bottom", display: false },
    title: {
      display: true,
      text: nameMenu.value,
    },
  },
  scales: {
    y: {
      title: { display: true, text: "%" },
      grid: { color: "gray" },
    },
  },
}));
</script>
<style scoped>
.infApp {
  width: 500px;
}
p {
  padding: 2px;
}
.accord {
  flex: 1, 3;
}
.pokaz {
  display: flex;
  gap: 15px;
  justify-content: space-between;
  padding: 2px 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  margin-bottom: 5px;
  border-radius: 8px;
}
.h2 {
  text-align: center;
  grid-area: h2;
  color: var(--act);
  font-size: 45px;
}
.infopokaz {
  grid-area: infopokaz;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
}
.info {
  display: grid;
  grid-template-columns: 1.5fr 2fr 1fr; /* например, первая колонка меньше */
  gap: 10px;
  width: 98%;
  background-color: var(--contentfon);
  border-radius: 8px;
  padding: 20px;
  color: var(--content-color);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
