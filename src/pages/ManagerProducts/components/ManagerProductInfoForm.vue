<template>
  <div class="w-full">
    <InputField label="Name" name="name" isRequired :maxCharacters="20" />
    <TextareaField
      label="Description"
      name="description"
      :maxCharacters="100"
    />
    <InputField label="Price" name="price" isRequired type="number" />
    <SelectField
      label="Categories"
      name="categories"
      isRequired
      :options="categoryOptions"
    />
  </div>
</template>

<script setup lang="ts">
import {
  InputField,
  TextareaField,
  SelectField,
} from "../../../components/fields"
import { Ref, ref } from "vue"
import { IOptionMultiple } from "../../../models"

const categoryOptions: Ref<IOptionMultiple[]> = ref([
  {
    label: "T-Shirt",
    value: "t-shirt",
  },
  {
    label: "Trouser",
    value: "trouser",
  },
  {
    label: "Shirt",
    value: "shirt",
  },
])
</script>

<style scoped></style>
