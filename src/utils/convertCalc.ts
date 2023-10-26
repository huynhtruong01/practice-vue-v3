export const convertCalc = (text: string) => {
  let result = text
  if (result.includes("\u00F7")) result = result.replaceAll("\u00F7", "/")
  if (result.includes("\u00D7")) result = result.replaceAll("\u00D7", "*")

  return result
}
