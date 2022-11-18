import {createRouter,createWebHashHistory} from "vue-router";
import IndexVue from "../components/index/IndexVue.vue";
import ShopCar from "../components/ShopCar/ShopCar.vue";
import OrderVue from '../components/order/OrderVue.vue'
import ProductDe from '../components/DetailPages/ProductDe.vue'
import EvaluationBa from '../components/DetailPages/EvaluationBa.vue'
import All from '../components/DetailPages/All.vue'
import picture from '../components/DetailPages/picture.vue'
import zhui from '../components/DetailPages/zhui.vue'
import Zoom from '../components/DetailPages/Zoom.vue'

const routes=[
  {
    // 首页路由
    path:"/index",
    component:IndexVue
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
{
  // 购物车路由
  path:"/shopcar",
  component:ShopCar
},
{
  // 订单页路由
  path:"/order",
  component:OrderVue
},
];
const router=createRouter({
    history: createWebHashHistory(),
    routes
})
export default router;
