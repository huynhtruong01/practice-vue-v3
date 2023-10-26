<template>
  <tr>
    <td>{{ props.product.name }}</td>
    <td class="max-w-[500px]">
      <p v-if="props.product.description">{{ props.product.description }}</p>
      <p v-if="!props.product.description">No description</p>
    </td>
    <td>{{ convertCurrency(props.product.price) }}</td>
    <td>
      <div class="flex gap-2 flex-wrap">
        <span
          v-for="category in props.product.categories"
          :key="category"
          class="inline-block p-1 bg-green-500 text-white text-sm rounded"
          >{{ category }}</span
        >
      </div>
    </td>
    <td>
      {{ props.product.firm }}
    </td>
    <td>
      {{ discount }}
    </td>
    <td>
      {{ props.product.brand }}
    </td>
    <td>
      {{ props.product.provider }}
    </td>
    <td>
      {{ props.product.barcode }}
    </td>
    <td>
      <div class="flex gap-2 items-center h-full">
        <button
          class="p-2 bg-blue-500 rounded hover:bg-blue-700 disabled:hover:bg-blue-500"
          @click="handleUpdateProduct"
        >
          <PencilSquareIcon class="w-4 h-4 text-white" />
        </button>
        <button
          class="p-2 bg-red-500 rounded hover:bg-red-700"
          @click="handleDeleteProduct"
        >
          <TrashIcon class="w-4 h-4 text-white" />
        </button>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue"
import { IProduct } from "../../../models"
import { convertCurrency } from "../../../utils"
import { TrashIcon, PencilSquareIcon } from "@heroicons/vue/24/solid"

const props = defineProps<{
  product: IProduct
}>()
const emits = defineEmits(["showModalDelete", "showModalUpdate"])
const discount = computed(
  () => `${props.product.discount ? props.product.discount : "-"}%`
)
const handleDeleteProduct = () => {
  emits("showModalDelete", true, props.product)
}

const handleUpdateProduct = () => {
  emits("showModalUpdate", true, props.product)
}
</script>

<style scoped></style>
