import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router"
import {
  HomePage,
  CalculatorPage,
  TodoListPage,
  ManagerProducts,
} from "./pages"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/calculator",
    component: CalculatorPage,
  },
  {
    path: "/todo-list",
    component: TodoListPage,
  },
  {
    path: "/manager-products",
    component: ManagerProducts,
  },
]

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: "active",
  routes,
})

export default router
