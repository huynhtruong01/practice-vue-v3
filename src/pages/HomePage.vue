<template>
  <Container>
    <h1 class="text-3xl font-bold text-slate-900 text-center">
      Welcome to practice vue v3
    </h1>
    <BaseLayout>
      <template #header="{ message }">{{ message }}</template>
    </BaseLayout>
    <div>
      <BookList>
        <template #book="{ book }">
          <h3>{{ book.name }}</h3>
          <p>{{ book.subDescription }}</p>
        </template>
      </BookList>
    </div>
    <DeepComponent />
    <div class="flex gap-6">
      <ul class="flex-1">
        <li
          v-for="post in posts"
          :key="post.id"
          class="py-4 border-b border-slate-700"
        >
          <h3 class="text-xl font-bold">{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </li>
      </ul>
      <ul class="flex-1">
        <li
          v-for="user in users"
          :key="user.id"
          class="py-4 border-b border-slate-700"
        >
          <h3 class="text-xl font-bold">{{ user.name }}</h3>
          <p>{{ user.website }}</p>
        </li>
      </ul>
    </div>
  </Container>
</template>

<script setup lang="ts">
import BaseLayout from "../components/BaseLayout.vue"
import BookList from "../components/BookList.vue"
import DeepComponent from "../components/DeepComponent.vue"
import { Container } from "../components/common/index"
import { Ref, onMounted, provide, ref } from "vue"
import { useFetch } from "../hooks"

const message: Ref<string> = ref("hi! nice to meet you")
const posts: Ref<any[]> = ref([])
const users: Ref<any[]> = ref([])
const say = () => {
  message.value = "how are you?"
}

provide("message", {
  message,
  say,
})

onMounted(async () => {
  const dataPosts = await useFetch("https://jsonplaceholder.typicode.com/posts")
  const dataUsers = await useFetch("https://jsonplaceholder.typicode.com/users")
  posts.value = dataPosts.data
  users.value = dataUsers.data
})
</script>

<style scoped></style>
