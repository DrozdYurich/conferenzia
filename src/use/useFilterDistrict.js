import useDataStore from "@/store/useDataStore";
import regions from "@/utils/region";
import { storeToRefs } from "pinia";
import addProtestVerToAllRegions from "./useVeroytn";
export default function useFilterDistrict() {
  const res = {};
  const { getData, getKey } = useDataStore();
  console.log(getData,'getDATA')
  regions.forEach((item) => (item.isCheck = false));
  const copy = getData;
  for (const reg in copy) {
    if (getKey === "Все") {
      res[reg] = getData[reg];
    } else if (getData[reg].federalDistr === getKey) {
      res[reg] = { ...getData[reg], isCheck: true };
      const regionItem = regions.find((item) => item.name === reg);
      if (regionItem) {
        regionItem.isCheck = true;
      }
    }
  }
  const rs = addProtestVerToAllRegions(res);
  console.log(rs, "rs");
  return rs;
}
