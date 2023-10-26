<template>
  <div class="border border-slate-500 rounded p-4">
    {{ data?.message }}
  </div>
  <button @click="data?.say" class="px-4 py-2 bg-indigo-700 text-white rounded">
    Say
  </button>
</template>

<script setup lang="ts">
import { inject } from "vue"

const data = inject<{
  message: string
  say: () => void
}>("message")
</script>

<style scoped></style>
