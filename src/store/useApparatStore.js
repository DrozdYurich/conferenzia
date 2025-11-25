import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
const useApparatStore = defineStore("apparat", () => {
  const nameFilter = ref("");
  const nameGroup = ref("");
  const getnameGroup = computed(() => {
    return nameGroup.value;
  });
  function setnameGroup(newData) {
    nameGroup.value = newData;
    console.log(nameGroup);
  }
  const getNameFilter = computed(() => {
    return nameFilter.value;
  });
  function setNameFilter(newData) {
    nameFilter.value = newData;
    console.log(nameFilter,'filterName');
  }

  return { getNameFilter, setNameFilter, setnameGroup, getnameGroup };
});
export default useApparatStore;
