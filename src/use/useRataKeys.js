export default function useDataKeys(obj, nameKey) {

  const entries = Object.entries(obj).filter(([key]) => key.includes(nameKey));
  console.log(entries, "ent");
  return {
    keys: entries.map((key) => key[0]),
    values: entries.map((key) => key[1]),
  };
}
