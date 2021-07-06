export default function filterItem({ value = "", items = [], key = "name" }) {
  return items.filter((e) => e[key].search(value) !== -1);
}
