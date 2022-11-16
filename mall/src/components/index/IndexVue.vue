<template>
  <div>
    <div class="warBanner">
      <HearedVue></HearedVue>
      <MainVue></MainVue>
      <FooterVue></FooterVue>
    </div>
  </div>
</template>

<script>
import HearedVue from '../public/HearedVue.vue'
import MainVue from './MainVue.vue'
import FooterVue from '../public/FooterVue.vue'
import LunBo from './LunBo.vue'
export default {
  components: {
    HearedVue,
    MainVue,
    FooterVue,
    LunBo
  },
  setup() {
 
  },
}
</script>

<style lang="stylus" scoped>
.warBanner 
  min-width 1920px
</style>

