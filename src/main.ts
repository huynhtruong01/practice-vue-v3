import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "vue3-toastify/dist/index.css"
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify"
import { toast } from "vue3-toastify"

const app = createApp(App)

app.use(router)
app.use(store)
app.use(Vue3Toastify, {
  autoClose: 3000,
  position: toast.POSITION.TOP_CENTER,
} as ToastContainerOptions)
app.mount("#app")
