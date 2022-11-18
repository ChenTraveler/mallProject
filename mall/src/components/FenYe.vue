<template>
  <!-- 顶部搜素栏 -->
  <div class="li">
    <!-- <div class="search">
      <div class="head">
        <h2>本店搜索</h2>
      </div>
      <div class="main">
        <div class="head">
          <span>关键字</span><input type="text"
                 v-model="a">
        </div>
        <div class="price">
          <span>价格</span>
          <input type="text"
                 placeholder="￥">-<input type="text"
                 placeholder="￥">
        </div>
      </div>
      <router-link to=""
                   class="tiao"
                   @click="fn">
        <img src="../../public/images/fenye/a1.png"
             alt="">
      </router-link>
    </div> -->
    <!-- <ToListVue /> -->
    <Top />
  </div>

</template>

<script>
import ToListVue from './list/ToList.vue'
import Top from './list/Top.vue'
import { onMounted, ref } from 'vue'
import bus from '../bus.js'
export default {
  name: 'FenYe',
  components: { ToListVue, Top },
  setup() {
    let a = ref('')
    function fn() {
      // console.log(a.value)
      bus.emit('cz', a.value)
      a.value = ''
    }
    onMounted(() => {
      bus.on('cz', (v) => {
        console.log(v)
      })
    })
    return {
      a,
      fn,
    }
  },
}
</script>

<style lang="less" scoped>
.li {
  .search {
    width: 190px;
    margin: 0 auto;
    border: 1px solid #ccc;
    > .head {
      background-color: #000;
      h2 {
        color: #fff;
        font-size: 14px;
        margin-left: 16px;
        line-height: 25px;
        margin-block-start: 0em;
        margin-block-end: 0em;
      }
    }
    .main {
      width: 100%;
      .head {
        margin-top: 10px;
        padding: 0 15px;
        span {
          width: 30%;
          font-size: 12px;
        }
        input {
          width: 70%;
          margin-left: 4px;
        }
      }
      .price {
        margin-top: 10px;
        padding: 0 15px;
        span {
          width: 15%;
          font-size: 12px;
          margin-left: 12px;
          padding-right: 4px;
        }
        input {
          width: 30%;
        }
      }
    }
    .tiao {
      display: block;
      width: 60px;
      height: 20px;
      background-color: #000;
      margin: 15px 0 30px 55px;
      img {
        width: 20px;
        height: 20px;
        padding: 0px 20px;
      }
    }
  }
}
</style>