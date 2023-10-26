<template>
  <div :class="twMerge('w-[500px] bg-white rounded-md px-10 py-7', className)">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import { twMerge } from "tailwind-merge"

const { className } = defineProps<{
  className?: string
}>()
</script>

<style scoped></style>
