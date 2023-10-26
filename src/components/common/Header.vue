<template>
  <header class="fixed top-0 left-0 w-full bg-white/50 backdrop-blur-md">
    <Container class="flex justify-between items-center py-4">
      <div>
        <router-link to="/" class="text-2xl font-bold text-slate-900"
          >Home</router-link
        >
      </div>
      <nav>
        <ul class="flex items-center gap-6">
          <li v-for="navLink in navLinks" :key="navLink.link" class="link">
            <router-link
              :to="navLink.link"
              class="relative p-2 font-medium text-slate-900"
            >
              {{ navLink.name }}
            </router-link>
          </li>
        </ul>
      </nav>
    </Container>
  </header>
</template>

<script setup lang="ts">
import { Container } from "./index"
import { Ref, ref } from "vue"
import { INavLink } from "../../models"

const navLinks: Ref<INavLink[]> = ref([
  {
    name: "Calculator",
    link: "/calculator",
  },
  {
    name: "Todo List",
    link: "/todo-list",
  },
  {
    name: "Manager Products",
    link: "/manager-products",
  },
])
</script>

<style scoped>
.link > a.active {
  @apply text-green-500 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:rounded-md before:bg-green-500;
}
</style>
