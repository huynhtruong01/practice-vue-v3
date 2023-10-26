<template>
  <div :class="twMerge('mb-2', props.className)">
    <label
      :for="props.name"
      class=""
      :class="
        twMerge(
          'inline-block text-sm font-medium mb-1.5',
          props.errorMsg ? 'text-red-500' : 'text-slate-900'
        )
      "
      >{{ props.label }}
      <span v-if="props.isRequired" class="text-red-500">*</span></label
    >
    <div class="relative w-full">
      <slot name="input"></slot>

      <div
        v-if="props.maxCharacters"
        :class="
          twMerge(
            'absolute bottom-2 right-4',
            props.errorMsg ? 'text-red-500' : 'text-slate-800'
          )
        "
      >
        <slot name="character"></slot>/<span>{{ props.maxCharacters }}</span>
      </div>
    </div>
    <p class="text-red-500 py-1.5 pl-1.5 text-sm">{{ props.errorMsg }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import { twMerge } from "tailwind-merge"

const props = defineProps<{
  label: string
  name: string
  maxCharacters?: number
  isRequired?: boolean
  errorMsg: string
  className?: string
}>()
</script>

<style scoped></style>
