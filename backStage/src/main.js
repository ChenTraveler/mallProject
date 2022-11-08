import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import router from './router'
import axios from '../plugins/axios.js'
// import VueAxios from 'vue-axios'

const app = createApp(App)


app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 全局挂载axios
app.config.globalProperties.$axios = axios;