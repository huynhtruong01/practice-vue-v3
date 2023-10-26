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
        :readonly="!!props.readonly"
        :class="
          twMerge(
            'p-2 pr-8 border rounded outline-none',
            errorMessage ? 'border-red-500' : 'border-slate-200'
          )
        "
      />
      <button
        type="button"
        class="absolute top-1/2 right-0 px-4 h-full -translate-y-1/2 text-sm bg-gray-500 text-white rounded"
        @click="handleGenerateBarcode"
      >
        Generate
      </button>
    </template>
  </FieldContainer>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import { twMerge } from "tailwind-merge"
import { useField } from "vee-validate"
import FieldContainer from "./FieldContainer.vue"
import { generateBarcodeNumber } from "../../utils/common"

const props = defineProps<{
  label: string
  name: string
  maxCharacters?: number
  isRequired?: boolean
  type?: string
  readonly?: boolean
}>()

const { value, errorMessage, setValue } = useField(props.name, undefined)

const handleGenerateBarcode = () => {
  const value = generateBarcodeNumber()
  setValue(value)
}
</script>

<style scoped></style>
