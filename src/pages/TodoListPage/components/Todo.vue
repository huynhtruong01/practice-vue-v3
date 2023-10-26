<template>
  <div
    class="flex-1 w-full flex justify-between items-center p-6 border border-slate-200 rounded"
  >
    <div>
      <h3
        :class="
          twMerge(
            'text-xl font-semibold mb-1 cursor-pointer',
            props.todo.isCompleted
              ? 'text-slate-400 line-through'
              : 'text-slate-900'
          )
        "
      >
        <span @click="handleToggleTodo">
          {{ props.todo.title }}
        </span>
      </h3>
      <p
        :class="
          twMerge(
            'text-sm max-w-[80%]',
            props.todo.isCompleted
              ? 'text-slate-400 line-through'
              : 'text-slate-600'
          )
        "
      >
        {{ props.todo.description }}
      </p>
      <div class="mt-3 flex gap-2.5">
        <span
          :class="
            twMerge(
              'inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1.5 rounded',
              statusTodo.bgColor,
              statusTodo.color
            )
          "
          ><span
            :class="
              twMerge(
                'w-1.5 h-1.5 rounded-full inline-block',
                statusTodo.bgStatusColor
              )
            "
          ></span>
          {{ statusTodo.text }}</span
        >
        <span
          :class="
            twMerge(
              'inline-block text-xs font-medium px-3 py-2 rounded-md',
              props.todo.isCompleted
                ? 'line-through text-slate-500 bg-slate-100'
                : 'text-blue-500 bg-blue-100'
            )
          "
          >{{ formatDate(props.todo.updatedAt) }}</span
        >
      </div>
    </div>
    <div class="flex gap-2">
      <button
        class="p-2 bg-blue-500 rounded hover:bg-blue-700 disabled:hover:bg-blue-500"
        @click="handleUpdateTodo"
        :disabled="props.todo.isCompleted"
      >
        <PencilSquareIcon class="w-4 h-4 text-white" />
      </button>
      <button
        class="p-2 bg-red-500 rounded hover:bg-red-700"
        @click="handleTodoDelete"
      >
        <TrashIcon class="w-4 h-4 text-white" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, defineEmits } from "vue"
import { ITodo } from "../../../models/index"
import { TrashIcon, PencilSquareIcon } from "@heroicons/vue/24/solid"
import { twMerge } from "tailwind-merge"
import { useStore } from "vuex"
import { formatDate } from "../../../utils/index"
import { StatusModalTodo } from "../../../enums"

const props = defineProps<{
  todo: ITodo
}>()
const emits = defineEmits(["updateTodo", "deleteTodo", "toggleCompleteTodo"])
const store = useStore()

const statusTodo = computed(() => {
  const text = props.todo.isCompleted ? "Completed" : "Uncompleted"
  const bgColor = props.todo.isCompleted ? "bg-green-100" : "bg-red-100"
  const bgStatusColor = props.todo.isCompleted ? "bg-green-500" : "bg-red-500"
  const color = props.todo.isCompleted ? "text-green-500" : "text-red-500"
  return { text, bgColor, color, bgStatusColor }
})

const handleUpdateTodo = () => {
  emits("updateTodo", StatusModalTodo.SHOW_UPDATE_MODAL, props.todo)
}

const handleTodoDelete = () => {
  emits("deleteTodo", StatusModalTodo.SHOW_DELETE_MODAL, props.todo)
}

const handleToggleTodo = () => {
  store.dispatch("todoListStore/updateTodo", {
    ...props.todo,
    isCompleted: !props.todo.isCompleted,
  })
  emits("toggleCompleteTodo")
}
</script>

<style scoped></style>
