<template>
  <div class="banner">
    <div class="top">
      <div class="left"><img src="../../../public/images/index/f1.jpg"
             alt="">
      </div>
      <div class="right">
        <img src="../../../public/images/index/f2.jpg"
             alt="">
        <!-- <div class="ss"><input type="text"
                 placeholder="项链">
          <i><img src="../../../public/images/index/ss.png"
                 alt=""></i>
        </div> -->
      </div>
    </div>
    <div class="nav">
      <div v-for="(item,index) in list.data"
           :key="index"
           :class="list.isnav==index?'navs':''"
           @click="list.nav(index)">{{item}}</div>
    </div>
    <!-- <hearVue></hearVue> -->
  </div>
</template>

<script>
// import hearVue from '../paging/hearVUe.vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const $router = useRouter()
    const list = reactive({
      data: ['首页', '所有商品', '购物车', '我的订单'],
      isnav: 0,
      nav(index) {
        list.isnav = index
        if (list.data[list.isnav] === '所有商品') {
          $router.push('/page')
        }

        if (list.data[list.isnav] === '购物车') {
          $router.push('/shopcar')
        }
        if (list.data[list.isnav] === '我的订单') {
          $router.push('/order')
        }
        if (list.data[list.isnav] === '首页') {
          $router.push('/index')
        }
      },
    })
    return {
      list,
    }
  },
}
</script>

<style lang="stylus" scoped>
.banner {
  width: 100%;
  min-width: 1920px;
  margin: 0 auto;
  background-color: #fff;
}

.top {
  width: 990px;
  margin: 0 auto;
  display: flex;
}

.left img {
  width: 738px;
  height: 124px;
}

.right {
  .ss {
    width: 250px;
    position: relative;

    input {
      width: 250px;
      height: 25px;
      font-size: 14;
      outline: none;
      border: 1px solid #000;
      padding-left: 5px;
    }

    img {
      width: 18px;
      position: absolute;
      right: 0;
      top: 5px;
    }
  }
}

.nav {
  width: 990px;
  height: 30px;
  font-size: 15px;
  margin: 0 auto;
  display: flex;
  color: #888;
  border-bottom: 1px solid #333;
  margin-bottom: 5px;
  cursor: pointer;

  div {
    text-align: center;
    width: 80px;
    margin: 5px 100px 0 70px;
  }

  .navs {
    border-bottom: 3px solid #000;
  }
}
</style>