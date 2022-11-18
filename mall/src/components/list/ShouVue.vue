<template>
  <!-- 首饰分类（重要） -->
  <li>
    <span><img :src="all.staus? '../../../public/images/fenye/a3.png' : '../../../public/images/fenye/a2.png'"
           alt=""
           @click="all.fn()"></span>
    <router-link to=""
                 class="baby">首饰分类（重要）</router-link>
    <ul v-show="all.staus">
      <li v-for="(item,index) in all.list"
          :key="index">
        <router-link to=""
                     class="dian">{{item}}</router-link>
      </li>
    </ul>
  </li>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'ShouVue',
  setup() {
    const all = reactive({
      list: [
        '项链',
        '手链',
        '耳饰',
        '戒指',
        '套装',
        '手表（腕表）',
        '手表（手表相关）...',
        '男士系列',
        '黑白系列',
      ],
      staus: true,
      fn() {
        all.staus = !all.staus
      },
    })
    return {
      all,
    }
  },
}
</script>

<style lang="less" scoped>
li {
  padding: 10px 0;
  background-color: #f9f9f9;
  span {
    margin-left: 15px;
    img {
      width: 20px;
      height: 20px;
      vertical-align: middle;
      // transform: translateY(-2px);
    }
  }
  .baby {
    font-weight: bolder;
    margin-left: 10px;
    font-size: 14px;
    color: #333;
    text-decoration: none;
  }
  ul {
    // display: flex;
    // justify-content: space-evenly;
    padding: 0 10px;
    border-top: 1px solid #e5e5e5;
    li {
      list-style: disc;
      font-size: 12px;
      margin-left: 30px;
      .dian {
        color: #666;
        text-decoration: none;
      }
    }
    li .dian:hover {
      color: red;
      text-decoration: underline;
    }
  }
}
li .baby:hover {
  color: red;
  text-decoration: underline;
}
</style>