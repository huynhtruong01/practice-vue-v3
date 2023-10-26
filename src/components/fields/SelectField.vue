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
        :mode="props.mode || 'tags'"
        v-model="value"
        name="categories"
        :options="options"
        placeholder="Choose category"
        :searchable="true"
        :close-on-select="false"
        :create="true"
        :class="[errorMessage ? '!border-red-500' : '!border-slate-200']"
      ></Multiselect>
    </template>
  </FieldContainer>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import { useField } from "vee-validate"
import FieldContainer from "./FieldContainer.vue"
import { IOptionMultiple } from "../../models/common"
import Multiselect from "@vueform/multiselect"
import MultiselectProps from "@vueform/multiselect"

const props = defineProps<{
  label: string
  name: string
  maxCharacters?: number
  isRequired?: boolean
  options: IOptionMultiple[]
  mode?: MultiselectProps["mode"]
}>()

const { value, errorMessage } = useField(props.name, undefined)
</script>

<style scoped></style>
