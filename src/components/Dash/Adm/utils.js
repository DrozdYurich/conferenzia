import useSrezFoStore from "@/store/useSrezFoStore";
import useSrezRegStore from "@/store/useSrezReg";
import useSrezYearStore from "@/store/useSrezYearsStore";
import { storeToRefs } from "pinia";

export function filterDataByYear(dataArray) {
  const { getYear } = storeToRefs(useSrezYearStore());
  if (!getYear.value || getYear.value === "Сбросить") {
    return dataArray;
  }
  return dataArray.map((item) => {
    const filteredData = item.data.filter((d) => {
      return String(d.year.trim()) === String(getYear.value.trim());
    });

    return {
      ...item,
      data: filteredData,
    };
  });
}
export function filterDataByFO(dataArray, val) {
  console.log(dataArray);
  if (!val || val === "Сбросить") {
    return dataArray;
  }
  return dataArray.filter((item) => {
    const itemDistrict = item.federalDistrict
      ? item.federalDistrict.trim().toLowerCase()
      : "";
    const selectedDistrict = val.trim().toLowerCase();
    return itemDistrict === selectedDistrict;
  });
}
export function filterDataByReg(dataArray, val) {
  console.log("dataArray");
  if (!val || val === "Сбросить") {
    return dataArray;
  }
  return dataArray.filter((item) => {
    const itemDistrict = item.regionName
      ? item.regionName.trim().toLowerCase()
      : "";
    const selectedReg = val.trim().toLowerCase();
    return itemDistrict === selectedReg;
  });
}
