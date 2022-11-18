<template>
  <div class="wrap">
    <div class="warBanner">
      <HearedVue></HearedVue>
      <MainVue></MainVue>
      <FooterVue></FooterVue>
    </div>
  </div>
</template>

<script>
import HearedVue from './HearedVue.vue'
import MainVue from './MainVue.vue'
import FooterVue from '../public/FooterVue.vue'
import LunBo from './LunBo.vue'
import { onBeforeMount } from 'vue'
export default {
  components: {
    HearedVue,
    MainVue,
    FooterVue,
    LunBo,
  },
  setup() {
    onBeforeMount(() => {
      document.documentElement.scrollTop = 0
    })
  },
}
</script>

<style lang="stylus" scoped>
body {
  overflow-x: scroll !important;
}

.wrap {
  width: 1920px;
  margin: 0 auto;
}

.warBanner {
  min-width: 1920px;
}
</style>

