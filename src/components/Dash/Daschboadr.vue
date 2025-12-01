<template>
  <div class="w-full" v-if="getData">
    <div class="adm"><AppSrez /></div>
    <div class="chart"><ContainerChart /></div>
  </div>
  <div v-else class="empty-state">
    <svg
      class="upload-icon"
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      @click="gotoUpload"
    >
      <path
        d="M18 15V18H6V15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18ZM13 9L16 12H13V16H11V12H8L11 9H13Z"
        fill="currentColor"
      />
    </svg>

    <p class="empty-text">
      Пожалуйста, загрузите данные для отображения дашборда
    </p>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import AppSrez from "./Adm/AppSrez.vue";
import ContainerChart from "./ContainerChart.vue";
import useDataStore from "@/store/useDataStore";
import { useRouter } from "vue-router";
const { getData } = storeToRefs(useDataStore());
const router = useRouter();
function gotoUpload() {
  router.push({ name: "Home" });
}
</script>
<style scoped>
.w-full {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  height: 80vh;
}

.adm {
  width: 550px;
}
.chart {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  height: 90vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #4a90e2 #f0f0f0;
}
.upload-icon {
  cursor: pointer;
  color: #bbb;
  transition: color 0.5s;
}

.upload-icon:hover {
  color: #4a90e2;
  /* Можно добавить дополнительные эффекты */
  /* filter: drop-shadow(0 2px 8px rgba(74,144,226,0.2)); */
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  color: #666;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.25rem;
  font-weight: 500;
  text-align: center;
  padding: 1rem;
  user-select: none;
}

.empty-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 1rem;
  color: #bbb;
  transition: color 0.3s ease;
}

.empty-state:hover .empty-icon {
  color: #4a90e2;
}

.empty-text {
  max-width: 320px;
  line-height: 1.5;
}
</style>
