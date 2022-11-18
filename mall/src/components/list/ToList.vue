<template>
  <!-- 侧边导航栏 -->
  <div class="list">
    <div class="nav">
      <div class="head">
        <h2>宝贝分类</h2>
      </div>
      <ul>
        <!-- 第一 -->
        <AllShop />
        <!-- 第二 -->
        <Hot />
        <!-- 第三 -->
        <ShouVue />
        <!-- 第四 -->
        <BabyVue />
        <!-- 第五 -->
        <HomeVue />
        <!-- 第六 -->
        <Exquisite />
        <!-- 第七 -->
        <Fw />
        <!-- 第八 -->
        <SS />
        <!-- 第九 -->
        <SSSVue />
        <!-- 第十 -->
        <Stylist />
        <!-- 第十一 -->
        <Price />
      </ul>

    </div>
  </div>
</template>

<script>
import AllShop from './AllShop.vue'
import Hot from './Hot.vue'
import BabyVue from './BabyVue.vue'
import Exquisite from './Exquisite.vue'
import Fw from './Fw.vue'
import HomeVue from './HomeVue.vue'
import SS from './SS.vue'
import ShouVue from './ShouVue.vue'
import SSSVue from './SSS.vue'
import Stylist from './Stylist.vue'
import Price from './Price.vue'
export default {
  name: 'ToList',
  components: {
    AllShop,
    Hot,
    BabyVue,
    Exquisite,
    Fw,
    HomeVue,
    SS,
    ShouVue,
    SSSVue,
    Stylist,
    Price,
  },
}
</script>

<style lang="less" scoped>
.list {
  width: 190px;
  margin: 30px auto;

  .nav {
    width: 100%;
    .head {
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
    > ul {
      width: 100%;
      margin-block-start: 0em;
      margin-block-end: 0em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      padding-inline-start: 0px;
      > li {
        list-style: none;
        border-bottom: 1px solid #e5e5e5;
      }
    }
  }
}
</style>