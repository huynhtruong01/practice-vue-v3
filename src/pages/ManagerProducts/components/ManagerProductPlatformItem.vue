<template>
  <div class="p-3 border border-slate-300 rounded mb-4">
    <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue"

const { title } = defineProps<{ title: string }>()
</script>

<style scoped></style>
