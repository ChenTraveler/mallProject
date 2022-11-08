import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {//登入
    path: '/login',
    name: 'login',
    component: () => import(/*webpackChunKName:'Login'*/'../components/logInTo.vue')
  }
]

const router = createRouter({

  // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。

  history: createWebHashHistory(),

  routes, // `routes: routes` 的缩写

})

export default router