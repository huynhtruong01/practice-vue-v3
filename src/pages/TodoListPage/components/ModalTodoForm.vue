<template>
  <Modal class="flex justify-center items-center" :showModal="props.showModal">
    <ModalForm>
      <h2 class="text-slate-900 text-2xl font-bold text-center mb-6">
        Todo Form
      </h2>
      <form @submit.prevent="handleTodoSubmit">
        <div class="mb-4">
          <label
            for="title"
            class="inline-block text-sm mb-1.5 font-medium"
            :class="[titleError ? 'text-red-500' : 'text-slate-900']"
            >Title</label
          >
          <input
            type="text"
            id="title"
            placeholder="Enter title..."
            class="block p-3 border w-full text-slate-900 rounded focus:outline-slate-300"
            :class="[titleError ? 'border-red-500' : 'border-slate-200']"
            v-model="title"
          />
          <p class="text-sm pl-1 pt-2 text-red-500" v-if="titleError">
            {{ titleError }}
          </p>
        </div>
        <div>
          <label
            for="description"
            class="inline-block text-sm mb-1.5 font-medium"
            :class="[descriptionError ? 'text-red-500' : 'text-slate-900']"
            >Description</label
          >
          <textarea
            id="description"
            placeholder="Enter description..."
            class="block p-3 border rounded w-full text-slate-900 focus:outline-slate-300"
            :class="[descriptionError ? 'border-red-500' : 'border-slate-200']"
            v-model="description"
            rows="6"
          ></textarea>
          <p class="text-sm pl-2 pt-1 text-red-500" v-if="descriptionError">
            {{ descriptionError }}
          </p>
        </div>
        <div class="mt-6 flex gap-2">
          <button
            type="button"
            class="flex-1 p-2 uppercase border border-slate-200 rounded hover:bg-slate-100"
            @click="handleCloseModal"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="!isSubmit"
            :class="
              twMerge(
                'flex-1 p-2 uppercase border border-transparent rounded text-white disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-red-500',
                props.todoUpdate
                  ? 'bg-blue-500 hover:bg-blue-700'
                  : 'bg-red-500 hover:bg-red-700'
              )
            "
          >
            {{ props.todoUpdate ? "Update" : "Add" }}
          </button>
        </div>
      </form>
    </ModalForm>
  </Modal>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, ref, watch } from "vue"
import { Modal, ModalForm } from "../../../components/modals/index"
import { useStore } from "vuex"
import { twMerge } from "tailwind-merge"
import { toast } from "vue3-toastify"
import { StatusModalTodo } from "../../../enums"

const store = useStore()
const props = defineProps(["showModal", "todoUpdate"])

const title = ref("")
const description = ref("")
const titleError = ref("")
const descriptionError = ref("")

watch(props, () => {
  if (props.todoUpdate) {
    title.value = props.todoUpdate.title
    description.value = props.todoUpdate.description
  } else {
    resetValues()
  }
})

const emits = defineEmits(["closeModal"])

const unwatchTitle = watch(title, (newTitle: string) => {
  titleError.value = newTitle ? "" : "Please enter title."
})

const unwatchDescription = watch(description, (newDescription: string) => {
  descriptionError.value = newDescription ? "" : "Please enter description."
})

const isSubmit = computed(() => title.value && description.value)

const handleCloseModal = () => {
  emits("closeModal", StatusModalTodo.CLOSE_MODAL)
  resetValues()
}

const handleAddTodo = () => {
  store.dispatch("todoListStore/addTodo", {
    title: title.value,
    description: description.value,
  })
}

const handleUpdateTodo = () => {
  store.dispatch("todoListStore/updateTodo", {
    ...props.todoUpdate,
    title: title.value,
    description: description.value,
  })
  toast.success(`Update todo ${title.value} successfully`)
}

// handle submit
const handleTodoSubmit = () => {
  if (props.todoUpdate) {
    handleUpdateTodo()
  } else {
    handleAddTodo()
  }

  handleCloseModal()
}

const resetValues = () => {
  title.value = ""
  description.value = ""
  titleError.value = ""
  descriptionError.value = ""

  unwatchTitle()
  unwatchDescription()
}
</script>

<style scoped></style>
