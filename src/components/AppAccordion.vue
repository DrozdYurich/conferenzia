<template>
  <div>
    <h1 v-if="!type">Структура Критериально-оценочного аппарата</h1>
    <PanelMenu :model="items" @item-click="onItemSelect"></PanelMenu>
  </div>
</template>
<script setup>
import PanelMenu from "primevue/panelmenu";
import useApparatStore from "@/store/useApparatStore";
import { ref } from "vue";
const props = defineProps({
  type: { type: Boolean, default: false },
});
const storeApp = useApparatStore();
function onItemSelect(event) {
  console.log(event.item.label,'label');
  storeApp.setNameFilter(event.item.label);
}
function onItemSelectGroup(event) {
  storeApp.setNameFilter("");
  console.log(event.item.label);
  storeApp.setnameGroup(event.item.label);
}
const items = ref([
  {
    label: "Экономическая детерминация",
    command: onItemSelectGroup,
    items: [
      {
        label: "Материальное положение",
        icon: "pi pi-file",
        command: onItemSelect,
      },
      {
        label: "Цены на жилье",
        icon: "pi pi-image",
        command: onItemSelect,
      },
      {
        label: "Цены на предметы быта и обихода ",
        icon: "pi pi-image",
        command: onItemSelect,
      },
      {
        label: "Безработица",
        icon: "pi pi-image",
        command: onItemSelect,
      },
    ],
  },
  {
    label: "Абсентеистские настроения",
    command: onItemSelectGroup,
    items: [
      {
        label: "Акции протеста",
        command: onItemSelect,
      },
    ],
  },
  {
    label: "Городская среда",
    command: onItemSelectGroup,
    items: [
      {
        label: "Качество дорог",
        command: onItemSelect,
      },
       {
        label: "ЖКХ",
        command: onItemSelect,
      },
       {
        label: "Преступность",
        command: onItemSelect,
      },
    ],
  },
  {
    label: "Действия властей, подрывающие авторитет",
    command: onItemSelectGroup,
    items: [
      {
        label: "Коррупция",
        command: onItemSelect,
      },
      {
        label: "Бездействие властей",
        command: onItemSelect,
      },
    ],
  },
  {
    label: "Социальная дифференциация",
    command: onItemSelectGroup,
    items: [
      {
        label: "Социальная структура электората",
        command: onItemSelect,
      },
      {
        label: "Возрастная структура электората",
        command: onItemSelect,
      },
      {
        label: "Конфессиональная структура электората",
        command: onItemSelect,
      },
    ],
  },
]);
</script>
<style scoped>
h1 {
  font-size: 25px;
}
</style>
