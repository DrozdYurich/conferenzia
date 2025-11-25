import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
const useSrezYearStore = defineStore("year", () => {
  const year = ref("");
  const getYear = computed(() => {
    return year.value;
  });
  function setYear(Newyear) {
    year.value = Newyear;
    console.log(year.value);
  }
  return { getYear, setYear };
});
export default useSrezYearStore;
