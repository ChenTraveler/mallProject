<template>
  <!-- 查看所有宝贝 -->
  <li>
    <span><img :src="all.staus? '../../../public/images/fenye/a3.png' : '../../../public/images/fenye/a2.png'"
           alt=""
           @click="all.fn()"></span>
    <router-link to=""
                 class="baby">热卖推荐</router-link>
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
  name: 'AllShop',
  setup() {
    const all = reactive({
      list: [
        '跃动晶彩',
        '幸运守护',
        '经典天鹅',
        '浪漫告白',
        '十二星座',
        '经典套装',
        '迪士尼系列',
        '榜样好物',
        '超值套装',
        '韩剧热播同款',
        'sparkling',
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