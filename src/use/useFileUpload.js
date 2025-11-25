import { ref } from "vue";
import * as XLSX from "xlsx";
import useDataStore from "@/store/useDataStore";
import regions from "@/utils/region";
import useAddDistrict from "./UseaddDistrict";
export default function useFileUpload() {
  const dataStore = useDataStore();
  const isLoading = ref(false);
  const errorMsg = ref(null);
  const headers = ref([]);
  const cities = ref([]);
  const data = ref({});

  const handleFile = async (file) => {
    data.value = {};
    console.log(data,'DATA1111111111111')
    isLoading.value = true;
    errorMsg.value = null;
    try {
      if (!file) {
        throw new Error("Файл не выбран");
      }
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      if (workbook.SheetNames.length === 0) {
        throw new Error("Файл не содержит листов");
      }
      const firstSheetName = workbook.SheetNames[0];
      
      const worksheet = workbook.Sheets[firstSheetName];
      
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
     
      if (jsonData.length === 0) {
        throw new Error("Нет данных в файле");
      }
      headers.value = jsonData[0];
      if (jsonData.length < 2) {
        throw new Error("Нет данных для обработки");
      }
      cities.value = jsonData.slice(1).map((row) => row[0]);

      const result = {};
        console.log(result,'RESULT')
      jsonData.slice(1).forEach((row) => {
        const cityName = row[0];
             
        if (!result[cityName]) {
          result[cityName] = [];
        }
        const indicators = {};

        for (let i = 1; i < headers.value.length; i++) {
          const header = headers.value[i];
           
          indicators[header] = row[i] || null;
         
        }
       

        result[cityName].push(indicators);
         
      });

      data.value = result;
      // console.log(useAddDistrict(data));
      dataStore.sentFilterKey();

      dataStore.loadData(useAddDistrict(data));
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
      errorMsg.value = `Ошибка: ${error.message}`;
      data.value = {};
    } finally {
      isLoading.value = false;
    }
  };
  return {
    isLoading,
    errorMsg,
    headers,
    cities,
    data,
    handleFile,
  };
}
