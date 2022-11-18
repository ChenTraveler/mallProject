<template>
  <!-- 宝贝分类页（重要） -->
  <li>
    <span><img :src="all.staus? '../../../public/images/fenye/a3.png' : '../../../public/images/fenye/a2.png'"
           alt=""
           @click="all.fn()"></span>
    <router-link to=""
                 class="baby">宝贝分类页（重要）</router-link>
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
import { reactive } from '@vue/reactivity'
export default {
  name: 'BabyVue',
  setup() {
    const all = reactive({
      list: [
        '挂饰',
        '耳环',
        '耳钉',
        '耳线',
        '手链',
        '手镯',
        '手饰',
        '分类首饰...',
        '节日送礼',
        '送礼-玩味童趣',
        '耳夹',
      ],
      staus: false,
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