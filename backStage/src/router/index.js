// import Vue from 'vue'
import {createRouter,createWebHashHistory} from 'vue-router'
// Vue.use(VueRouter)

const routes = [
{
  path:'/',
  name:'index',
  component:()=>import('../components/afterVue.vue')
}
]

const router =  createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
