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
    component: () => import(/*webpackChunKName*/'../components/afterVue.vue'),
    redirect: '/listOfGoods',
    children: [
      {//商品管理
        path: '/listOfGoods',
        name: 'goodlist',
        component: () => import('../components/listOfGoods.vue')
      },
      {//用户列表
        path: '/listOfUsers',
        name: 'users',
        component: () => import('../components/listOfUsers.vue')
      },
      //分类管理
      {
        path: '/manage',
        name: 'manage',
        component: () => import('../components/manage/manageVue.vue')
      },
      // 商品列表
      {
        path: '/list',
        name: 'list',
        component: () => import('../components/manage/listVue.vue')
      },
      //数据分析
      {
        path: '/data',
        name: 'data',
        component: () => import('../components/dataVue.vue')
      },
      //修改密码
      {
        path: '/pass',
        name: 'pass',
        component: () => import('../components/center/passVue.vue')
      },
    ]
  },
]

const router = createRouter({
  // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})


// 路由守卫
// router.beforeEach((to, from, next) => {
//   localStorage.setItem('token', 'sdfdsfrefas4123')
//   const { token } = localStorage;
//   console.log(token, localStorage)
//   token || to.name === "login" ? next() : next({ name: "login" });
// });

export default router
