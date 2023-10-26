export const convertCurrency = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}

export const generateBarcodeNumber = () => {
  return +`${Math.floor(Math.random() * 99)}${Date.now()}`
}
