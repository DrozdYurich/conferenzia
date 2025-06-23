<template>
  <div
    :class="[
      'card',
      chartType === 'pie' || chartType === 'doughnut' ? 'small-chart' : '',
    ]"
  >
    <Chart
      :type="chartType"
      :data="chartData"
      :options="chartOptions"
      :width="chartType === 'pie' || chartType === 'doughnut' ? 160 : undefined"
      :height="
        chartType === 'pie' || chartType === 'doughnut' ? 160 : undefined
      "
      class="w-full h-full"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import Chart from "primevue/chart";

const props = defineProps({
  dataArray: {
    type: Array,
    required: true,
  },
  chartType: {
    type: String,
    default: "line",
  },
  selectedFactor: {
    type: String,
    required: true,
  },
  colors: {
    type: Array,
    default: () => ["#3366CC", "#DC3912", "#FF9900"], // дефолтные цвета
  },
});

function createGradient(ctx, area, color) {
  if (!area) {
    return color + "cc";
  }
  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
  gradient.addColorStop(0, color + "00");
  gradient.addColorStop(1, color + "cc");
  return gradient;
}

const chartData = computed(() => {
  const labels = props.dataArray.map((d) => d.year);
  const data = props.dataArray.map((d) => d.value);

  const baseColor = props.colors[0];
  const backgroundColors = labels.map(
    (_, i) => props.colors[i % props.colors.length] + "80"
  );
  const borderColors = labels.map(
    (_, i) => props.colors[i % props.colors.length]
  );

  if (
    props.chartType === "pie" ||
    props.chartType === "bar" ||
    props.chartType === "doughnut"
  ) {
    return {
      labels,
      datasets: [
        {
          label: props.selectedFactor,
          data,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 2,
          hoverOffset: 30,
          borderRadius: 5,
        },
      ],
    };
  } else {
    return {
      labels,
      datasets: [
        {
          label: props.selectedFactor,
          data,
          borderColor: baseColor,
          backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            return createGradient(ctx, chartArea, baseColor);
          },
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 8,
          borderWidth: 3,
          hoverBorderWidth: 4,
          hoverBackgroundColor: baseColor + "cc",
          barThickness: 2,
        },
      ],
    };
  }
});

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1000,
    easing: "easeOutQuart",
  },
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        font: {
          size: 14,
          weight: "600",
          family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        color: "#333",
      },
    },
    title: {
      display: true,
      text: props.selectedFactor,
      font: {
        size: 15,
        weight: "700",
      },
      color: "#222",

      padding: {
        top: 5,
        bottom: 10,
      },
    },
    tooltip: {
      enabled: true,
      mode: "nearest",
      intersect: false,
      backgroundColor: "#fff",
      titleColor: "#000",
      bodyColor: "#333",
      borderColor: "#ddd",
      borderWidth: 1,
      cornerRadius: 6,
      padding: 10,
      displayColors: false,
      bodyFont: {
        size: 12,
      },
    },
  },
  scales:
    props.chartType === "pie" || props.chartType === "doughnut"
      ? {}
      : {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 13,
              },
              color: "#666",
            },
            categoryPercentage: 0.5,
            barPercentage: 0.1,
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "#eee",
              borderDash: [5, 5],
            },
            ticks: {
              font: {
                size: 10,
              },
              color: "#666",
              stepSize: 1,
              callback: (value) => value + "%",
            },
            title: {
              display: true,
              text: "%",
              font: {
                size: 10,
                weight: "600",
              },
              color: "#444",
            },
          },
        },
}));
</script>

<style scoped>
.card {
  width: 300px;
  height: 350px;
  margin: 0 auto;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 20px rgb(0 0 0 / 0.1);
}

.chart-canvas {
  width: 100% !important;
  height: 100% !important;
}
.small-chart {
  width: 230px;
  height: 350px;
}
</style>
