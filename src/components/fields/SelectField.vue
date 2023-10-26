<template>
  <FieldContainer
    :label="props.label"
    :name="props.name"
    :maxCharacter="props.maxCharacters"
    :isRequired="props.isRequired"
    :errorMsg="errorMessage ? errorMessage : ''"
  >
    <template #input>
      <Multiselect
        mode="tags"
        v-model="value"
        name="categories"
        :options="options"
        placeholder="Choose category"
        @select="handleSelectCategories"
        :searchable="true"
        :close-on-select="false"
        :create="true"
        :class="[errorMessage ? '!border-red-500' : '!border-slate-200']"
      ></Multiselect>
    </template>
  </FieldContainer>
</template>

<script setup lang="ts">
import { Ref, defineProps, ref } from "vue"
import { twMerge } from "tailwind-merge"
import { useField } from "vee-validate"
import FieldContainer from "./FieldContainer.vue"
import { IOptionMultiple } from "../../models/common"
import Multiselect from "@vueform/multiselect"

const props = defineProps<{
  label: string
  name: string
  maxCharacters?: number
  isRequired?: boolean
  options: IOptionMultiple[]
}>()

const categories: Ref<IOptionMultiple[]> = ref([])

const { value, errorMessage } = useField(props.name, undefined)

const handleSelectCategories = (value: string, option: IOptionMultiple) => {
  categories.value = [...categories.value, { ...option }]
}
</script>

<style scoped></style>
