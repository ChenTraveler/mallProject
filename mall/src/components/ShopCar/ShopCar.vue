<template>
  <div class="beijing">
    <!-- <router-view></router-view> -->
    <HearedVue></HearedVue>
    <div class="main">
      <div class="ban">
        <MainHeads></MainHeads>
        <MainMiddles></MainMiddles>
        <MainFoots></MainFoots>
      </div>
      <FooteVue></FooteVue>
    </div>

  </div>
</template>

<script>
import HearedVue from './ShopHeads.vue'
import MainHeads from './MainHeads.vue'
import MainMiddles from './MainMiddle.vue'
import MainFoots from './MainFoots.vue'
import FooteVue from './FootVue.vue'
import { onBeforeMount } from 'vue'
export default {
  components: {
    HearedVue,
    MainHeads,
    MainMiddles,
    MainFoots,
    FooteVue,
  },
  setup() {
    onBeforeMount(() => {
      document.documentElement.scrollTop = 0
    })
  },
}
</script>

<style lang="stylus" scoped>
* {
  user-select: none;
}

.beijing {
  background: url('../../../public/images/shopcar/back.png');
  height: 100%;
}

.main {
  width: 100%;
  padding: 20px 0 0 0;

  .ban {
    width: 1200px;
    margin: 0 auto;
  }
}
</style>

