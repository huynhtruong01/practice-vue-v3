import { DataSelectTodo, StatusModalTodo } from "../enums"

export interface IOptionVal {
  name: string
  value: string
}

export interface IOptionMultiple {
  label: string
  value: string
}

export type IFilterTodoList =
  | DataSelectTodo.ALL
  | DataSelectTodo.COMPLETED
  | DataSelectTodo.UNCOMPLETED

export type IStatusModalTodo =
  | StatusModalTodo.CLOSE_DELETE_MODAL
  | StatusModalTodo.SHOW_DELETE_MODAL
  | StatusModalTodo.SHOW_MODAL
  | StatusModalTodo.SHOW_UPDATE_MODAL
  | StatusModalTodo.CLOSE_MODAL
  | StatusModalTodo.CLOSE_UPDATE_MODAL
