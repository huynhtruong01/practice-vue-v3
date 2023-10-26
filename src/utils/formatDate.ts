export const formatDate = (dateVal: Date) => {
  const convertDate = new Date(dateVal)
  const date = `0${convertDate.getDate()}`.slice(-2)
  const month = `0${convertDate.getMonth() + 1}`.slice(-2)
  const year = convertDate.getFullYear()

  return `${year}-${month}-${date}`
}
