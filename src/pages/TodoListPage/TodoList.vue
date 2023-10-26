<template>
  <Transition appear>
    <div>
      <div class="max-w-[78%] m-auto">
        <h1
          class="py-6 border-b border-slate-200 text-3xl font-medium text-slate-900"
        >
          To-Do
        </h1>
        <div class="py-6">
          <div class="flex gap-4 items-center">
            <button
              class="flex justify-center items-center gap-2 p-2 pr-3 text-white font-medium rounded bg-red-500 hover:bg-red-700"
              @click="handleActionModal(StatusModalTodo.SHOW_MODAL)"
            >
              <PlusIcon class="w-5 h-5 text-white" /> New Todo
            </button>
            <SelectDataField
              :data="optionFilters"
              @filter-todo-value="handleFilterTodoList"
            />
          </div>
          <div
            class="flex flex-col items-center gap-6 mt-6"
            v-if="todoList.length"
          >
            <Todo
              v-for="todo in todoList"
              :key="todo.id"
              :todo="todo"
              @update-todo="handleActionModal"
              @delete-todo="handleActionModal"
              @toggle-complete-todo="handleToggleComplete"
            />
          </div>
          <div v-if="!todoList.length" class="flex justify-center py-6">
            <span>No todo list here</span>
          </div>
        </div>
      </div>
      <div>
        <ModalTodoForm
          :showModal="showModalTodoForm"
          :todoUpdate="todoAction"
          @close-modal="handleActionModal"
        />
        <div v-if="todoAction">
          <ModalTodoDelete
            :showModal="showModalDelete"
            :todo="todoAction"
            @cancel-modal="handleActionModal"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Ref, ref, Transition } from "vue"
import {
  ITodo,
  IOptionVal,
  IFilterTodoList,
  IStatusModalTodo,
} from "../../models/index"
import Todo from "./components/Todo.vue"
import { PlusIcon } from "@heroicons/vue/24/solid"
import ModalTodoForm from "./components/ModalTodoForm.vue"
import ModalTodoDelete from "./components/ModalTodoDelete.vue"
import { useStore } from "vuex"
import { SelectDataField } from "../../components/common/index"
import { DataSelectTodo, StatusModalTodo } from "../../enums/index"
import { useChangeDocTitle } from "../../hooks/useChangeDocTitle"

useChangeDocTitle("Todo List")

const showModalTodoForm = ref(false)
const showModalDelete = ref(false)
const filterTodo: Ref<IFilterTodoList> = ref(DataSelectTodo.ALL)
const todoAction: Ref<ITodo | null> = ref(null)
const store = useStore()
const optionFilters: Ref<IOptionVal[]> = ref([
  {
    name: "All",
    value: DataSelectTodo.ALL,
  },
  {
    name: "Completed",
    value: DataSelectTodo.COMPLETED,
  },
  {
    name: "Uncompleted",
    value: DataSelectTodo.UNCOMPLETED,
  },
])

const todoList: Ref<ITodo[]> = ref(store.state.todoListStore.todoList)

const handleFilterTodoList = (filterVal: IFilterTodoList) => {
  filterTodo.value = filterVal
  switch (filterVal) {
    case DataSelectTodo.UNCOMPLETED: {
      todoList.value = [...store.getters["todoListStore/uncompletedTodoList"]]
      break
    }
    case DataSelectTodo.COMPLETED: {
      todoList.value = [...store.getters["todoListStore/completedTodoList"]]
      break
    }
    default: {
      todoList.value = store.state.todoListStore.todoList
    }
  }
}

const handleActionModal = (statusModal: IStatusModalTodo, todo?: ITodo) => {
  switch (statusModal) {
    case StatusModalTodo.SHOW_MODAL: {
      handleShowModalForm(true)
      break
    }
    case StatusModalTodo.SHOW_UPDATE_MODAL: {
      if (todo) {
        todoAction.value = { ...todo }
        handleShowModalForm(true)
      }
      break
    }
    case StatusModalTodo.SHOW_DELETE_MODAL: {
      if (todo) {
        todoAction.value = { ...todo }
        handleShowModalDelete(true)
      }
      break
    }
    case StatusModalTodo.CLOSE_MODAL: {
      todoAction.value = null
      handleShowModalForm(false)
      break
    }
    case StatusModalTodo.CLOSE_DELETE_MODAL: {
      todoAction.value = null
      handleShowModalDelete(false)
    }
  }

  refetchTodoList()
}

const handleShowModalForm = (isShow: boolean) => {
  showModalTodoForm.value = isShow
}

const handleShowModalDelete = (isShow: boolean) => {
  showModalDelete.value = isShow
}

const refetchTodoList = () => {
  handleFilterTodoList(filterTodo.value)
}

const handleToggleComplete = () => {
  refetchTodoList()
}
</script>

<style scoped></style>
