<template>
  <Modal :showModal="props.showModal" class="flex justify-center items-center">
    <ModalForm>
      <h2 class="text-2xl font-semibold text-center mb-2">Delete Product</h2>
      <p class="text-center">
        Are you sure want to delete product
        <span class="text-red-500 font-medium">{{
          props.product?.name || ""
        }}</span
        >?
      </p>
      <div class="flex gap-2 mt-6">
        <button
          class="flex-1 p-2 uppercase border border-slate-200 rounded hover:bg-slate-100"
          @click="handleProductCloseModal"
        >
          Cancel
        </button>
        <button
          class="flex-1 p-2 uppercase border border-transparent rounded bg-red-500 text-white hover:bg-red-700"
          @click="handleProductDelete"
        >
          Delete
        </button>
      </div>
    </ModalForm>
  </Modal>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue"
import { Modal, ModalForm } from "../../../components/modals"
import { useStore } from "vuex"
import { IProduct } from "../../../models/product"
import { toast } from "vue3-toastify"

const props = defineProps<{
  showModal: boolean
  product: IProduct | null
}>()
const emits = defineEmits(["closeModal"])
const store = useStore()

const handleProductCloseModal = () => {
  emits("closeModal", false)
}

const handleProductDelete = () => {
  if (props.product) {
    store.dispatch("productListStore/deleteProduct", props.product.id)
    toast.success(`Delete product ${props.product.name}`)
  }
  handleProductCloseModal()
}
</script>

<style scoped></style>
