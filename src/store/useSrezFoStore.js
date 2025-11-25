import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
const useSrezFoStore = defineStore("fo", () => {
  const fo = ref("");
  const getFo = computed(() => {
    return fo.value;
  });
  function setFo(Newfo) {
    fo.value = Newfo;
    console.log(fo.value);
  }
  return { getFo, setFo };
});
export default useSrezFoStore;
