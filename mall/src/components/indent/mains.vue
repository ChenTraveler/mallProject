<template>
  <div class="mains">
    <headers />
    <div class="address">
      选择收货地址
    </div>
    <div class="xian">
      <div v-for="(i,index) in list.list"
           :key="index">
        <div>
          <span>{{i.p}}</span>
          <span>{{i.n}}</span>
        </div>
        <div>
          <span>{{i.d}}</span>
          <span>{{i.t}}</span>
        </div>
        <div @click="fn(index)">
          <xiou />
        </div>

      </div>
    </div>
    <div class="tian">
      <tan />
      <a href="#">管理收货地址</a>
    </div>
    <div class="em">确认订单信息</div>
    <shops />
    <!-- <Alerts /> -->

  </div>
</template>

<script>
import { reactive, ref, onBeforeMount } from 'vue'
import bus from '../../bus.js'
import headers from './headers.vue'
import shops from './shops.vue'
import xiou from './xiou.vue'
// import Alerts from './Alerts.vue'
import tan from './tan.vue'
export default {
  name: 'Mains',
  components: {
    headers,
    shops,
    //  Alerts,
    tan,
    xiou,
  },
  setup() {
    onBeforeMount(() => {
      document.documentElement.scrollTop = 0
    })
    // 控制遮罩层状态
    const zhe = ref(false)
    // 遮罩层弹出
    function hint() {
      zhe.value = true
    }
    // 取消
    function nos() {
      zhe.value = false
    }
    // 确定删除
    function del(id) {
      zhe.value = false
      store.commit('DEL', id)
    }
    let list = reactive({
      list: [],
    })
    setTimeout(() => {
      list.list = JSON.parse(localStorage.getItem('list'))
      // console.log(list.list)
    })

    bus.on('xiou', (x) => {
      console.log(x)
      list.list.push({ p: x[0], d: x[1], n: x[2], t: x[3] })
      // x[省，地址，姓名，电话]
      localStorage.setItem('list', JSON.stringify(list.list))
      list.list = JSON.parse(localStorage.getItem('list'))
      // console.log(list.list)
    })
    bus.on('xi', (x) => {
      list.list[x[4]].p = x[0]
      list.list[x[4]].d = x[1]
      list.list[x[4]].n = x[2]
      list.list[x[4]].t = x[3]
      localStorage.setItem('list', JSON.stringify(list.list))
      list.list = JSON.parse(localStorage.getItem('list'))
      console.log(x)
    })
    function fn(x) {
      bus.emit('index', x)
    }
    return {
      list,
      fn,
    }
  },
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.mains {
  width: 990px;
  margin: 0 auto;
  // padding: 0 30px;
  .address {
    width: 100%;
    font-weight: 700;
    font-size: 14px;
    padding-left: 35px;
    margin-top: 50px;
  }
  .xian {
    width: 100%;
    padding-left: 35px;
    display: flex;
    flex-wrap: wrap;

    > div {
      width: 237px;
      height: 106px;
      background: url(../../../public/images/indent/a7.png) no-repeat;
      padding: 10px;
      margin: 5px;
      position: relative;
      > div:nth-child(1) {
        span {
          font-weight: bold;
        }
      }
      > div:nth-child(2) {
        width: 100%;
        display: -webkit-box;
        /* 弹性伸缩盒子 */
        -webkit-box-orient: vertical;
        /* 用来检查伸缩盒子内子元素的排列顺序 */
        -webkit-line-clamp: 3;
        /* 用来控制一个块元素的文本行数 */
        overflow: hidden;
      }
      span {
        font-size: 12px;
        margin-left: 5px;
        white-space: nowrap;
      }
    }
  }
  .tian {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding: 0 17px;
    button {
      width: 86px;
      height: 28px;
      text-align: center;
      line-height: 28px;
      background-color: #fff;
      border-color: #c4c6cf;
      color: #333;
    }
    button:hover {
      background-color: #f2f3f7;
      border-color: #a0a2ad;
    }
    a {
      text-decoration: none;
      color: #c97;
      font-size: 14px;
    }
    a:hover {
      color: red;
    }
  }
  .em {
    width: 100%;
    margin-top: 20px;
    font-weight: 700;
    font-size: 14px;
    padding-left: 17px;
  }
}
</style>