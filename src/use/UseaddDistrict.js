import regions from "@/utils/region";
export default function useAddDistrict(data) {
  console.log(data,'DATA')
  regions.forEach((item) => {
    if (data.value[item.name]) {
      console.log(data.value[item.name],'data.value1111111111111111')
      data.value[item.name] = {
        ...data.value[item.name],
        federalDistr: item.federalDistrict,
        isCheck: false
      };
      console.log(data.value[item.name],'data.value')
    }
  });

  return data.value;
}
