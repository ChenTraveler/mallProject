<template>
  <div>
    <div>
      <!-- <router-view></router-view> -->
      <MainBig></MainBig>
      <MainSmaill></MainSmaill>
    </div>
  </div>
</template>

<script>
// import HearedVue from '../public/HearedVue.vue'
import MainBig from '../paging/MainBig.vue'
import MainSmaill from '../paging/MainSmaill.vue'
// import FooterVue from '../public/FooterVue.vue'
export default {
  components: {
    // HearedVue,
    MainBig,
    MainSmaill,
    // FooterVue
  },
  setup() {
    const a = 2
  },
}
</script>

<style lang="stylus" scoped></style>

