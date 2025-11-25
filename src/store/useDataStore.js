import { defineStore } from "pinia";
import regions from "@/utils/region";
import { computed, reactive, ref } from "vue";
const useDataStore = defineStore("data", () => {
  const alldata = ref();
  const filterkey = ref("Все");
  const getData = computed(() => {
    return alldata.value;
  });
  const getKey = computed(() => {
    return filterkey.value;
  });
  function loadData(newData) {
    alldata.value = newData;
    console.log(alldata);
  }
  async function sentFilterKey(key = "Все") {
    filterkey.value = key;
  }
  function addVer() {}
  return { alldata, getData, loadData, sentFilterKey, getKey };
});
export default useDataStore;
