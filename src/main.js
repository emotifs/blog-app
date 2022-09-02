import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import BaseDialog from "@/components/ui/BaseDialog";
import BaseButton from "@/components/ui/BaseButton";
import BaseSpinner from "@/components/ui/BaseSpinner";
import axios from 'axios'
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
const app = createApp(App)


app.use(store).use(router, axios);
app.use(Toast, {
    position : POSITION.TOP_RIGHT
})
app.component('base-dialog', BaseDialog)
app.component('base-button', BaseButton)
app.component('base-spinner', BaseSpinner)
app.mount('#app')
