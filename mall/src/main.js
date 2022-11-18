import { createApp } from 'vue'
import axios from './axios.js'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
// import mitt from 'mitt'
import './style.css'
import 'element-plus/dist/index.css'


const app = createApp(App)

// 全局导入miit
// app.config.globalProperties.$mitt = mitt();
// 全局导入axios
app.config.globalProperties.$axios = axios;

app.use(store).use(router).mount('#app')
