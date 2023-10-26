<template>
  <div class="flex items-center gap-4 border border-slate-300 p-4 rounded-md">
    <div>
      <h3 class="text-2xl font-bold text-slate-900">{{ bookName }}</h3>
    </div>
    <div>
      <button
        @click="submitParent"
        class="px-4 py-2 bg-red-500 rounded-md text-white text-sm"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue"

const { bookName } = defineProps(["bookName"])

const emit = defineEmits(["submit"])

const submitParent = () => {
  emit("submit", bookName)
}
</script>

<style scoped></style>
