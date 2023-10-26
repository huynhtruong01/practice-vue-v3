export const useFetch = async (url: string) => {
  let data = null
  let error = null

  try {
    const res = await fetch(url)
    data = await res.json()
  } catch (err) {
    error = err
  }

  return { data, error }
}
