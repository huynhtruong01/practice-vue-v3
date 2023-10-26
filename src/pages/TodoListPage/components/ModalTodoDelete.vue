<template>
  <Modal :showModal="showModal" class="flex justify-center items-center">
    <ModalForm>
      <h2 class="text-2xl text-center font-bold text-slate-900">
        Delete Todo?
      </h2>
      <p class="mt-2 text-center text-slate-600">
        Are you want to delete todo
        <span class="text-red-500">{{ todo.title }}</span
        >?
      </p>
      <div class="flex gap-2 mt-6">
        <button
          class="flex-1 p-2 uppercase border border-slate-200 rounded hover:bg-slate-100"
          @click="handleCloseModal"
        >
          Cancel
        </button>
        <button
          class="flex-1 p-2 uppercase border border-transparent rounded bg-red-500 text-white hover:bg-red-700"
          @click="handleTodoDelete"
        >
          Delete
        </button>
      </div>
    </ModalForm>
  </Modal>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue"
import { Modal, ModalForm } from "../../../components/modals/index"
import { ITodo } from "../../../models"
import { useStore } from "vuex"
import { toast } from "vue3-toastify"
import { StatusModalTodo } from "../../../enums/statusModalTodo"

const { todo, showModal } = defineProps<{
  todo: ITodo
  showModal: boolean
}>()
const emits = defineEmits(["cancelModal"])
const store = useStore()

const handleCloseModal = () => {
  emits("cancelModal", StatusModalTodo.CLOSE_DELETE_MODAL)
}

const handleTodoDelete = () => {
  store.dispatch("todoListStore/deleteTodo", todo.id)
  toast.success(`Delete todo ${todo.title} successfully`)
  handleCloseModal()
}
</script>

<style scoped></style>
