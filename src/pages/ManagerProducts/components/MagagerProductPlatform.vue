<template>
  <div>
    <ManagerProductPlatformItem title="Lazada">
      <InputField name="firm" label="Firm" isRequired />
    </ManagerProductPlatformItem>
    <ManagerProductPlatformItem title="Website Store">
      <InputField name="discount" label="Discount" type="number" isRequired />
    </ManagerProductPlatformItem>
    <ManagerProductPlatformItem title="POS">
      <InputField name="brand" label="Brand" isRequired />
      <InputField name="provider" label="Provider" isRequired />
      <InputField name="barcode" label="Barcode" isRequired />
    </ManagerProductPlatformItem>
  </div>
</template>

<script setup lang="ts">
import ManagerProductPlatformItem from "./ManagerProductPlatformItem.vue"
import { InputField } from "../../../components/fields"
</script>

<style scoped></style>
