<template>
  <div>
    <ul>
      <li>
        <router-link to=""
                     @mousemove="xian.fn()"
                     @mouseleave="xian.fn1()">
          <img src="../../../public/images/DetailPages/a51.png"
               alt="">
          <p>手机购买</p>
        </router-link>
      </li>
      <li>
        <router-link to="">
          <img src="../../../public/images/DetailPages/a52.png"
               alt="">
          <p>消息</p>
        </router-link>
      </li>
      <li>
        <router-link to="/shopCar">
          <img src="../../../public/images/DetailPages/a53.png"
               alt="">
          <p>购物车</p>
        </router-link>
      </li>
      <li>
        <router-link to="">
          <img src="../../../public/images/DetailPages/a54.png"
               alt="">
          <p>反馈</p>
        </router-link>
      </li>
      <li :style="xian.status===true? '':'border-bottom-left-radius:15px'">
        <router-link to="">
          <img src="../../../public/images/DetailPages/a55.png"
               alt="">
          <p>举报</p>
        </router-link>
      </li>
      <li :style="xian.status===true? 'border-bottom-left-radius:15px':'padding:0'">
        <router-link to=""
                     v-show="xian.status"
                     @click="xian.fn2()">
          <img src="../../../public/images/DetailPages/a56.png"
               alt="">
          <p>回顶部</p>
        </router-link>
      </li>
    </ul>
    <div v-show="xian.sao">
      <img src="../../../public/images/DetailPages/a6.png"
           alt="">
      <p>扫一扫,去手机购买</p>
    </div>
  </div>
</template>

<script>
import bus from '../../bus.js'
import { onMounted, reactive } from 'vue'
export default {
  name: 'Aside',
  setup() {
    onMounted(() => {
      bus.on('height', (x) => {
        xian.status = x
      })
    })
    const xian = reactive({
      status: false,
      sao: false,
      fn() {
        xian.sao = true
      },
      fn1() {
        xian.sao = false
      },
      fn2() {
        bus.emit('top', true)
      },
    })
    return {
      xian,
    }
  },
}
</script>

<style lang="less" scoped>
.aside {
  position: relative;
  ul {
    li {
      list-style: none;
      background-color: #fff;
      padding: 5px 10px;
      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: #000;
        font-size: 12px;
        img {
          width: 24px;
          height: 24px;
        }
      }
    }
    li:nth-child(1) {
      border-top-left-radius: 20px;
      padding-top: 20px;
    }
  }
  > div {
    position: absolute;
    top: 18px;
    left: -90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    padding: 10px;
    border-radius: 15px;
    img {
      width: 100px;
      height: 100px;
    }
    p {
      font-size: 12px;
    }
  }
}
</style>