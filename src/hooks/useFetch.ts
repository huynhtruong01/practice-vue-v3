export const useFetch = async (url: string) => {
  let data: any[] = []
  let error: string | null = null

  try {
    const res = await fetch(url)
    data = await res.json()
  } catch (err) {
    error = err as string
  }

  return { data, error }
}
