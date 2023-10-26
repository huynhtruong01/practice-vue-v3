<template>
  <div>
    <ManagerProductPlatformItem title="Lazada">
      <InputField name="firm" label="Firm" isRequired />
    </ManagerProductPlatformItem>
    <ManagerProductPlatformItem title="Website Store">
      <InputField name="discount" label="Discount" type="number" isRequired />
    </ManagerProductPlatformItem>
    <ManagerProductPlatformItem title="POS">
      <SelectField
        name="brand"
        label="Brand"
        isRequired
        mode="single"
        :options="brandOptions"
      />
      <InputField name="provider" label="Provider" isRequired />
      <BarcodeField name="barcode" label="Barcode" isRequired readonly />
    </ManagerProductPlatformItem>
  </div>
</template>

<script setup lang="ts">
import ManagerProductPlatformItem from "./ManagerProductPlatformItem.vue"
import {
  InputField,
  SelectField,
  BarcodeField,
} from "../../../components/fields"
import { ref, Ref } from "vue"
import { IOptionMultiple } from "../../../models"

const brandOptions: Ref<IOptionMultiple[]> = ref([
  {
    label: "Ho Chi Minh",
    value: "ho-chi-minh",
  },
  {
    label: "Ha Noi",
    value: "ha-noi",
  },
  {
    label: "Da Nang",
    value: "da-nang",
  },
])
</script>

<style scoped></style>
