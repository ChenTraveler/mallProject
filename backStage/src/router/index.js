import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {//登入
    path: '/login',
    name: 'login',
    component: () => import(/*webpackChunKName:'Login'*/'../components/logInTo.vue')
  },
  {//首页
    path: '/',
    name: 'home',
    component: () => import(/*webpackChunKName*/'../components/afterVue.vue')
  },
  {//商品列表
    path: '/listOfGoods',
    name: 'goodlist',
    component: () => import('../components/listOfGoods.vue')
  },
  {//用户列表
    path: '/listOfUsers',
    name: 'users',
    component: () => import('../components/listOfUsers.vue')
  },
  {
    path:'/',
    name:'index',
    component:()=>import('../components/afterVue.vue')
  }
]

const router = createRouter({
  // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})


// 路由守卫
router.beforeEach((to, from, next) => {
  localStorage.setItem('token', 'sdfdsfrefas4123')
  const { token } = localStorage;
  console.log(token, localStorage)
  token || to.name === "login" ? next() : next({ name: "login" });
});

export default router
