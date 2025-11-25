<template>
  <div class="p-2 bg-blue-500 text-white rounded menu">
    <div
      v-for="n in items"
      class="p-1 cursor-pointer"
      :class="{ 'active-menu-item': active === n.label }"
      @click="onselect(n)"
    >
      <h2>{{ n.label }}</h2>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps({
  items: {
    type: Array,
  },
});
const emit = defineEmits(["year"]);
const active = ref("Сбросить");
const onselect = (value) => {
  active.value = value.label;
  emit("year", value);
};
</script>
<style scoped>
.menu {
  min-height: 350px;
  max-height: 350px; /* или любое нужное значение */
  overflow-y: auto;
}

.active-menu-item {
  background-color: rgba(255, 255, 255, 0.8);
  color: black;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
/* Стиль скроллбара для WebKit (Chrome, Safari) */
.menu::-webkit-scrollbar {
  width: 8px;
}

.menu::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 4px;
}

.menu::-webkit-scrollbar-thumb {
  background-color: #4a90e2;
  border-radius: 4px;
  border: 2px solid #f0f0f0;
}

.menu::-webkit-scrollbar-thumb:hover {
  background-color: #357abd;
}
</style>
