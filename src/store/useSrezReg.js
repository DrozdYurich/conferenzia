import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
const useSrezRegStore = defineStore("reg", () => {
  const reg = ref("Сбросить");
  const getReg = computed(() => {
    return reg.value;
  });
  function setReg(Newfo) {
    reg.value = Newfo;
    console.log(reg.value);
  }
  return { getReg, setReg };
});
export default useSrezRegStore;
