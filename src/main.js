import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import BaseDialog from "@/components/ui/BaseDialog";
import BaseButton from "@/components/ui/BaseButton";
import BaseSpinner from "@/components/ui/BaseSpinner";
const app = createApp(App)
app.use(store).use(router);
app.component('base-dialog', BaseDialog)
app.component('base-button', BaseButton)
app.component('base-spinner', BaseSpinner)
app.mount('#app')
