<template>
  <div class="beijing">
      <!-- <router-view></router-view> -->
      <HearedVue></HearedVue>
      <div class="main">
        <div class="ban">
          <MainHead></MainHead>
          <MainMiddle></MainMiddle>
          <MainFoot></MainFoot>
        </div>
        <FooteVue></FooteVue>
      </div>
      
  </div>
</template>

<script>
import HearedVue from './ShopHead.vue';
import MainHead from './MainHead.vue';
import MainMiddle from './MainMiddle.vue'
import MainFoot from './MainFoot.vue'
import FooteVue from './FootVue.vue'
export default {
  components: {
    HearedVue,
    MainHead,
    MainMiddle,
    MainFoot,
    FooteVue
  },
  setup() {

  },
}
</script>

<style lang="stylus" scoped>
*
  user-select none

.beijing
  background url(../../../public/images/shopcar/back.png)
  height 100%
.main
  width 100%
  padding: 20px 0 0 0
  
  .ban
    width 1200px
    margin 0 auto
</style>

