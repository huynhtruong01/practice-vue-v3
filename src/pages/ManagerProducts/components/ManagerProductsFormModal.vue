<template>
  <Modal :showModal="props.showModal">
    <div
      :class="
        twMerge(
          'relative max-w-[60%] bg-white h-screen overflow-y-auto p-8 ml-auto ease-in-out duration-300 delay-75',
          props.showModal ? 'right-0 opacity-100' : '-right-[70%] opacity-0'
        )
      "
    >
      <h2 class="text-xl text-slate-800 font-semibold mb-4">
        {{ props.product ? "Update Product" : "Add new product" }}
      </h2>
      <form @submit="handleSubmitProduct">
        <div>
          <div v-for="step in steps" :key="step" v-show="activeIdx == step">
            <slot :name="`step${step}`"></slot>
          </div>
        </div>
        <div
          class="absolute bottom-0 right-0 w-full p-4 flex justify-end gap-3 border-t border-slate-200"
        >
          <button
            type="button"
            class="px-6 py-2 rounded border border-slate-200 hover:bg-slate-50"
            @click="handleCancelModal"
            :disabled="isSubmitting"
          >
            Cancel
          </button>
          <button
            type="button"
            class="px-6 py-2 rounded text-white font-medium bg-gray-500 disabled:bg-gray-300"
            :disabled="activeIdx === 1"
            @click="handleBackStep"
          >
            Back
          </button>
          <button
            type="button"
            class="px-6 py-2 rounded text-white font-medium bg-red-500 disabled:bg-red-500 hover:bg-red-700"
            :disabled="activeIdx === steps"
            v-if="activeIdx < steps"
            @click="handleNextStep"
          >
            Next
          </button>
          <button
            :class="
              twMerge(
                'px-6 py-2 rounded text-white font-medium disabled:bg-red-500',
                props.product
                  ? 'bg-blue-500 hover:bg-blue-700'
                  : 'bg-red-500 hover:bg-red-700'
              )
            "
            :disabled="isSubmitting || !meta.dirty"
            v-show="activeIdx === steps"
          >
            {{ props.product ? "Update" : "Add" }}
          </button>
        </div>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import * as yup from "yup"
import { useForm } from "vee-validate"
import { twMerge } from "tailwind-merge"
import Modal from "../../../components/modals/Modal.vue"
import { defineProps, defineEmits, watch, ref, Ref } from "vue"
import { useStore } from "vuex"
import { IProduct, IProductForm } from "../../../models"
import { toast } from "vue3-toastify"

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter product name")
    .max(20, "Maximum 20 characters"),
  description: yup.string().default("").max(100, "Maximum 100 characters"),
  price: yup
    .number()
    .typeError("Please enter price number, not string")
    .required("Please enter product price"),
  categories: yup
    .array()
    .required("Please choose category")
    .min(1, "Please choose at least 1 category"),
  firm: yup.string().required("Please enter firm store"),
  discount: yup.number().typeError("Please enter discount number, not string"),
  brand: yup.string().required("Please enter brand"),
  provider: yup.string().required("Please enter provider"),
  barcode: yup.string().required("Please enter barcode"),
})
const steps: Ref<number> = ref(2)
const activeIdx: Ref<number> = ref(1)

const { handleSubmit, handleReset, meta, isSubmitting, setFieldValue } =
  useForm<IProductForm>({
    validationSchema: schema,
    initialValues: {
      name: "",
      description: "",
      price: 0,
      categories: [],
      firm: "",
      discount: 0,
      brand: "",
      provider: "",
      barcode: 0,
    },
  })
const props = defineProps<{
  showModal: boolean
  product: IProduct | null
}>()
const emits = defineEmits(["closeModal"])
const store = useStore()

watch(props, () => {
  if (props.product) {
    const product = { ...props.product }
    setFieldValue("name", product.name)
    setFieldValue("description", product.description || "")
    setFieldValue("price", product.price)
    setFieldValue("categories", [...product.categories])
    setFieldValue("firm", product.firm)
    setFieldValue("discount", product.discount)
    setFieldValue("brand", product.brand)
    setFieldValue("provider", product.provider)
    setFieldValue("barcode", product.barcode)
  } else {
    handleReset()
  }
})

const handleCancelModal = () => {
  emits("closeModal", false)
  handleReset()
  activeIdx.value = 1
}

const handleNextStep = () => {
  if (steps.value === activeIdx.value) return
  activeIdx.value += 1
}

const handleBackStep = () => {
  if (activeIdx.value <= 1) return
  activeIdx.value -= 1
}

const handleAddProduct = (values: IProductForm) => {
  store.dispatch("productListStore/addProduct", values)
}

const handleUpdateProduct = (values: IProductForm) => {
  if (props.product) {
    store.dispatch("productListStore/updateProduct", {
      ...values,
      description: values.description || "",
      id: props.product.id,
    })
  }
  toast.success(`Update product ${values.name}`)
}

const handleSubmitProduct = handleSubmit((values: any) => {
  if (props.product) {
    handleUpdateProduct(values)
  } else {
    handleAddProduct(values)
  }
  handleCancelModal()
})
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped></style>
