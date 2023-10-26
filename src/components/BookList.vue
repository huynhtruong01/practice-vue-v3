<template>
  <div>
    <ul>
      <li v-for="book of bookList" :key="book.id">
        <slot name="book" :book="book"></slot>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue"

const bookList: Ref<
  {
    name: string
    subDescription: string
    id: number
  }[]
> = ref([
  {
    id: 1,
    name: "Harry poster",
    subDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
  },
  {
    id: 2,
    name: "Toi di code dao",
    subDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
  },
])
</script>

<style scoped></style>
