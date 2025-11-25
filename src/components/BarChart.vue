<template>
  <div class="div">
    <Chart
      type="line"
      :data="chartData"
      :options="chartOptions"
      class="h-[25rem]"
    />
  </div>
</template>
<script setup>
import { Bar } from "vue-chartjs";
import { ref } from "vue";
const props = defineProps({
  chartData: Object,
  chartOptions: Object,
});
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import Chart from "primevue/chart";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
</script>
<style scoped>
.div {
  height: 300px;
  width: 600px;
}
</style>
