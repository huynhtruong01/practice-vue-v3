import { QUERY_KEYS } from "../constants"
import { ITodo } from "./../models/todo"

export interface IStateTodoListStore {
  todoList: ITodo[]
}

export const todoListStore = {
  namespaced: true,
  state() {
    return {
      todoList: JSON.parse(localStorage.getItem(QUERY_KEYS.TODO_LIST) || "[]"),
    }
  },
  getters: {
    completedTodoList(state: IStateTodoListStore) {
      return state.todoList.filter((todo) => todo.isCompleted)
    },
    uncompletedTodoList(state: IStateTodoListStore) {
      return state.todoList.filter((todo) => !todo.isCompleted)
    },
  },
  mutations: {
    ADD_TODO(
      state: IStateTodoListStore,
      todo: Pick<ITodo, "title" | "description">
    ) {
      const todoList = [...state.todoList]
      todoList.push({
        ...todo,
        id: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isCompleted: false,
      })

      state.todoList = todoList
      localStorage.setItem(QUERY_KEYS.TODO_LIST, JSON.stringify(todoList))
    },
    UPDATE_TODO(state: IStateTodoListStore, todo: ITodo) {
      const todoList = [...state.todoList]
      const newTodoList = todoList.map((todoItem) => {
        return todoItem.id === todo.id
          ? { ...todo, updatedAt: new Date() }
          : todoItem
      })
      state.todoList = newTodoList
      localStorage.setItem(QUERY_KEYS.TODO_LIST, JSON.stringify(newTodoList))
    },
    DELETE_TODO(state: IStateTodoListStore, id: number) {
      const todoList = [...state.todoList]
      const newTodoList = todoList.filter((todoItem) => todoItem.id !== id)
      state.todoList = newTodoList
      localStorage.setItem(QUERY_KEYS.TODO_LIST, JSON.stringify(newTodoList))
    },
  },

  actions: {
    addTodo({ commit }: any, todo: ITodo) {
      commit("ADD_TODO", todo)
    },
    updateTodo({ commit }: any, todo: ITodo) {
      commit("UPDATE_TODO", todo)
    },
    deleteTodo({ commit }: any, id: number) {
      commit("DELETE_TODO", id)
    },
  },
}
