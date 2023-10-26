<template>
  <div
    :class="
      twMerge(
        'fixed inset-0 bg-black bg-opacity-60 w-full h-full ease-in-out duration-200',
        props.class,
        showModal
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      )
    "
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import { twMerge } from "tailwind-merge"

const props = defineProps(["class", "showModal"])
</script>

<style scoped></style>
