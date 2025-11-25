<template>
  <AppDiv title="Состояние протестных настроений в субъектах РФ">
    <template #exel>
      <ExelImport @handleFileUpload="handleFileChange" />
    </template>
    <ErrorMsg v-if="errorMsg" :errormsg="errorMsg" />
    <div v-if="isLoading">Загрузка ...</div>
    <InfoHome :data="dataFiltered" />
    <template #federal>
      <FederalDistrict
        :activDistrict="activDistrict"
        @handleDistrict="handleDistrict"
      />
    </template>
  </AppDiv>
</template>
<script setup>
import AppDiv from "@/components/AppDiv.vue";
import ErrorMsg from "@/components/ErrorMsg.vue";
import ExelImport from "@/components/ExelImport.vue";
import FederalDistrict from "@/components/FederalDistrict.vue";
import InfoHome from "@/components/InfoHome.vue";
import useFileUpload from "@/use/useFileUpload";
import useDataStore from "@/store/useDataStore";
import { computed, provide, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import useFilterDistrict from "@/use/useFilterDistrict";

const dataStore = useDataStore();
const { data, errorMsg, handleFile, isLoading } = useFileUpload();
const { getData, getKey } = storeToRefs(useDataStore());
const handleFileChange = async (file) => {
  await handleFile(file);
};
const activDistrict = computed(() => getKey.value);
const dataFiltered = computed(() => useFilterDistrict());
const handleDistrict = async (name) => {
  await dataStore.sentFilterKey(name);
  useFilterDistrict();
};
const filtdt = computed(() => getData);
const activatorProps = ref(false);
</script>
<style scoped>
.card {
  margin-top: 10px;
}
</style>
