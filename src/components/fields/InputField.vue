<template>
  <FieldContainer
    :label="props.label"
    :name="props.name"
    :maxCharacters="props.maxCharacters"
    :isRequired="props.isRequired"
    :errorMsg="errorMessage || ''"
  >
    <template #input>
      <input
        v-model="value"
        :name="props.name"
        :type="props.type || 'text'"
        :id="props.name"
        :class="
          twMerge(
            'p-2 pr-8 border rounded outline-none',
            errorMessage ? 'border-red-500' : 'border-slate-200'
          )
        "
      />
    </template>
    <template #character>{{
      typeof value === "string" ? value.length : 0
    }}</template>
  </FieldContainer>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import { twMerge } from "tailwind-merge"
import { useField } from "vee-validate"
import FieldContainer from "./FieldContainer.vue"

const props = defineProps<{
  label: string
  name: string
  maxCharacters?: number
  isRequired?: boolean
  type?: string
}>()

const { value, errorMessage } = useField(props.name, undefined)
</script>

<style scoped></style>
