<template>
  <div class="inf">
    <h1>Описание структуры:</h1>
    <h2 class="infP" v-if="nameGroup">
      <span>Группа факторов:</span> {{ nameGroup }}
    </h2>
    <h3 class="infP" v-if="nameKey"><span>Фактор:</span> {{ nameKey }}</h3>
    <div v-if="nameKey">
      <div class="infP">
        <span>Показатель:</span> {{ getFactorsByName[0]?.pokaz }}
      </div>
      <div class="infP">
        <span>Индикатор:</span> {{ getFactorsByName[0]?.kr }}
      </div>
      <div class="infP">
        <span>Критерий:</span> {{ getFactorsByName[0]?.indicator }}
      </div>
    </div>
  </div>
</template>
<script setup>
import apparat from "@/data/apparat";
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import useApparatStore from "@/store/useApparatStore";
const { getNameFilter, getnameGroup } = storeToRefs(useApparatStore());
const nameKey = computed(() => {
  return getNameFilter.value;
});
const nameGroup = computed(() => {
  return getnameGroup.value;
});
const getFactorsByName = computed(() => {
  const factors = [];
  apparat.forEach((group) => {
    group.factors.forEach((factor) => {
      if (factor.name === nameKey.value) {
        factors.push(factor);
      }
    });
  });
  return factors;
});
</script>
<style scoped>
h1 {
  font-size: 30px;
  color: var(--act);
}
span {
  color: var(--act);
}
.infP {
  font-size: 20px;
  padding: 7px;
}
</style>
