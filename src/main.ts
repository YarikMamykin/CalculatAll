import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
app.provide('originHost', import.meta.env.VITE_HOST)
app.use(createPinia()).mount('#app')
