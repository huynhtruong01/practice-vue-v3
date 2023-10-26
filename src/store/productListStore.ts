import { QUERY_KEYS } from "../constants"
import { IProduct } from "../models"

export interface IStateProductListStore {
  products: IProduct[]
}

export const productListStore = {
  namespaced: true,
  state() {
    return {
      products: JSON.parse(
        localStorage.getItem(QUERY_KEYS.PRODUCT_LIST) || "[]"
      ),
    }
  },
  mutations: {
    ADD_PRODUCT(state: IStateProductListStore, data: Omit<IProduct, "id">) {
      const products = [...state.products]
      products.push({
        id: Date.now(),
        ...data,
      })
      state.products = products
      localStorage.setItem(QUERY_KEYS.PRODUCT_LIST, JSON.stringify(products))
    },
    UPDATE_PRODUCT(state: IStateProductListStore, data: IProduct) {
      const products = [...state.products]
      const newProducts = products.map((product) => {
        return product.id === data.id ? data : product
      })
      state.products = newProducts
      localStorage.setItem(QUERY_KEYS.PRODUCT_LIST, JSON.stringify(newProducts))
    },
    DELETE_PRODUCT(state: IStateProductListStore, id: number) {
      const products = [...state.products]
      const newProducts = products.filter((product) => product.id !== id)
      state.products = newProducts
      localStorage.setItem(QUERY_KEYS.PRODUCT_LIST, JSON.stringify(newProducts))
    },
  },
  actions: {
    addProduct({ commit }: any, data: Omit<IProduct, "id">) {
      commit("ADD_PRODUCT", data)
    },
    updateProduct({ commit }: any, data: IProduct) {
      commit("UPDATE_PRODUCT", data)
    },
    deleteProduct({ commit }: any, id: number) {
      commit("DELETE_PRODUCT", id)
    },
  },
}
