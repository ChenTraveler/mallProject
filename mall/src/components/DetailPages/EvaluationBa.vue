<template>
  <!-- 宝贝评价页 -->
  <div class="evaluation">
    <!-- {{fn}} -->
    <div class="nav">
      <router-link to="/zoom/evaluation/all"
                   :class="isActive===1? 'bg': ''"
                   @click="states(1)">全部</router-link>
      <router-link to="/zoom/evaluation/picture"
                   :class="isActive===2? 'bg': ''"
                   @click="states(2)">有图/视频</router-link>
      <router-link to="/zoom/evaluation/zhui"
                   :class="isActive===3? 'bg': ''"
                   @click="states(3)">追评</router-link>
    </div>
    <div class="look">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'EvaluationBa',
  setup() {
    let isActive = ref(1)
    function states(a) {
      isActive.value = a
      window.localStorage.setItem('isActive', isActive.value)
      let c = window.localStorage.getItem('isActive')
      isActive.value = c * 1
      console.log(isActive.value)
    }
    return {
      states,
      isActive,
    }
  },
}
</script>

<style lang="less" scoped>
.evaluation {
  width: 100%;
  padding: 10px 15px 0;
  .nav {
    width: 100%;
    padding: 15px 0;
    a {
      display: inline-block;
      width: 50px;
      height: 36px;
      text-align: center;
      line-height: 36px;
      background-color: #f6f6f6;
      border-radius: 18px;
      text-decoration: none;
      color: #333;
      font-size: 14px;
      margin: 0 10px;
    }
    a:nth-child(2) {
      width: 80px;
    }
  }
  .bg {
    color: #fff !important;
    background-color: #ff5000 !important;
  }
}
</style>