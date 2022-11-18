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
    redirect: '/login',
    children: [
      {//商品管理
        path: '/listOfGoods',
        name: 'goodlist',
        component: () => import('../components/listOfGoods.vue'),
        meta: { isAuth: true }
      },
      {//用户列表
        path: '/listOfUsers',
        name: 'users',
        component: () => import('../components/listOfUsers.vue'),
        meta: { isAuth: true }
      },
      //分类管理
      {
        path: '/manage',
        name: 'manage',
        component: () => import('../components/manage/manageVue.vue'),
        meta: { isAuth: true }
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
        component: () => import('../components/dataVue.vue'),
        meta: { isAuth: true }
      },
      //修改密码
      {
        path: '/pass',
        name: 'pass',
        component: () => import('../components/center/passVue.vue'),
        meta: { isAuth: true }
      },
      {
        path: '/userInfo',
        name: 'userInfo',
        component: () => import('../components/center/BasicInformation.vue'),
        meta: { isAuth: true }
      }
    ]
  },
]


const router = createRouter({
  // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    if (localStorage.getItem("token")) {
      next()
    } else {
      next({ name: 'login' })
    }

  } else {
    next()
  }
});

export default router
