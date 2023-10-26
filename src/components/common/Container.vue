<template>
  <div :class="twMerge('max-w-[1150px] m-auto px-4', props.class)">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import { twMerge } from "tailwind-merge"

const props = defineProps<{
  class?: string
}>()
</script>

<style scoped></style>
