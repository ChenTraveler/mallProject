import {createRouter,createWebHashHistory} from "vue-router";
import ProductDe from '../components/DetailPages/ProductDe.vue'
import EvaluationBa from '../components/DetailPages/EvaluationBa.vue'
import All from '../components/DetailPages/All.vue'
import picture from '../components/DetailPages/picture.vue'
import zhui from '../components/DetailPages/zhui.vue'
import Zoom from '../components/DetailPages/Zoom.vue'
import indexVue from '../components/index/indexVue.vue'
import mains from '../components/indent/mains.vue'
import page from '../components/paging/pageVue.vue'
import shopcar from '../components/ShopCar/ShopCar.vue'
import order from '../components/order/OrderVue.vue'
import login from '../components/login/loginVue.vue'
import res from '../components/login/RegisterVue.vue'

const routes = [
  {
    path:'/',
    name:'login',
    component:login
  },
  {
    path:'/res',
    component:res
  },
  {
    path:'/index',
    name:'index',
    component:indexVue
  },
  // 分页
  {
    path:'/page',
    component:page
  },
  // 详情页
  {
    path:'/zoom',
    component:Zoom,
    children:[
      // 宝贝详情
     {
    path:'product',
    component:ProductDe
     },
     // 宝贝评价
     {
    path:'evaluation',
    component:EvaluationBa,
    children:[
      {
        path:'all',
        component:All
      },
      {
        path:'zhui',
        component:zhui
      },
      {
        path:'picture',
        component:picture
      }
    ]
     },
    ]
  },
  // 购物车
  {
    path:'/shopcar',
    component:shopcar
  },
  // 订单页
  {
    path:'/order',
    component:order
  },
  
  // 结算
  {
    path:'/mains',
    component:mains
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
