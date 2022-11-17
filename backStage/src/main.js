import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import * as ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import axios from '../plugins/axios.js'

// import "default-passive-events"
// import VueAxios from 'vue-axios'

const app = createApp(App)



app.use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.config.warnHandler = () => null;

// 全局挂载axios
app.config.globalProperties.$axios = axios;


app.mount('#app')
