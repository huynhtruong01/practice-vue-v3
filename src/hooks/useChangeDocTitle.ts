import { onMounted } from "vue"

export const useChangeDocTitle = (title: string) => {
  onMounted(() => (document.title = title))
}
