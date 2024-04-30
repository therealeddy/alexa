export const tinyStrToArray = (value: string[]) => {
  return [...value, ...value.map((item) => item.toLowerCase())]
}
