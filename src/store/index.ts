import { IStateTodoListStore, todoListStore } from "./todoListStore"
import { IStateProductListStore, productListStore } from "./productListStore"
import { createStore } from "vuex"

export interface IStateStore {
  todoListStore: IStateTodoListStore
  productListStore: IStateProductListStore
}

const store = createStore<IStateStore>({
  modules: {
    todoListStore,
    productListStore,
  },
})

export default store
