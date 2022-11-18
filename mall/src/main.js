import { createApp } from 'vue'
import axios from '../src/axios.js'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'

const app= createApp(App)
app.config.globalProperties.$axios = axios;
app.use(router).use(store).mount('#app')
