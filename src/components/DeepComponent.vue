<template>
  <div class="border border-slate-500 rounded p-4">
    {{ message }}
  </div>
  <button @click="say" class="px-4 py-2 bg-indigo-700 text-white rounded">
    Say
  </button>
</template>

<script setup lang="ts">
import { inject } from "vue"

const { message, say } = inject("message")
</script>

<style scoped></style>
