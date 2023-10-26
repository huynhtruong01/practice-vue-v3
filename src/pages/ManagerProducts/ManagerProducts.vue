<template>
  <Transition appear>
    <div class="py-8 m-auto">
      <div class="mb-6">
        <button
          class="bg-red-500 font-medium text-white rounded px-4 py-2 hover:bg-red-700"
          @click="handleShowModal(true)"
        >
          + Add new product
        </button>
      </div>
      <div>
        <table class="table-auto w-full" v-if="products.length">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Categories</th>
              <th>Firm</th>
              <th class="text-right">Discount</th>
              <th class="text-right">Brand</th>
              <th class="text-right">Provider</th>
              <th class="text-right">Barcode</th>
              <th class="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <Product
              v-for="product in products"
              :key="product.id"
              :product="product"
              @show-modal-delete="handleShowModalDelete"
              @show-modal-update="handleShowModal"
            />
          </tbody>
        </table>
        <div v-if="!products.length">
          <p class="text-center py-4 text-slate-600">No products here</p>
        </div>
      </div>
      <ManagerProductFormModal
        :showModal="showModal"
        :product="product"
        @close-modal="handleShowModal"
      >
        <template #step1>
          <ManagerProductInfoForm />
        </template>
        <template #step2>
          <ManagerProductPlatform />
        </template>
      </ManagerProductFormModal>
      <ModalDeleteProduct
        :showModal="showModalDelete"
        :product="product"
        @close-modal="handleShowModalDelete"
      />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import ManagerProductFormModal from "./components/ManagerProductsFormModal.vue"
import { Ref, ref, Transition } from "vue"
import { IProduct } from "../../models/product"
import Product from "./components/Product.vue"
import { useStore } from "vuex"
import ModalDeleteProduct from "./components/ModalDeleteProduct.vue"
import ManagerProductInfoForm from "./components/ManagerProductInfoForm.vue"
import ManagerProductPlatform from "./components/MagagerProductPlatform.vue"
import { useChangeDocTitle } from "../../hooks"

useChangeDocTitle("Manager Product")

const store = useStore()
const showModal: Ref<boolean> = ref(false)
const showModalDelete: Ref<boolean> = ref(false)
const product: Ref<IProduct | null> = ref(null)
const products: Ref<IProduct[]> = ref([
  ...store.state.productListStore.products,
])

const refetchProducts = () => {
  products.value = [...store.state.productListStore.products]
}

const handleShowModalDelete = (isShow: boolean, productItem = null) => {
  showModalDelete.value = isShow
  product.value = productItem
  refetchProducts()
}

const handleShowModal = (isShow: boolean, productItem = null) => {
  showModal.value = isShow
  product.value = productItem
  refetchProducts()
}
</script>

<style scoped></style>
