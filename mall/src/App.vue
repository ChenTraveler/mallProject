<template>
  <FooterVue />
</template>

<script>
import FooterVue from './components/FooterVue.vue'
export default {
  components: {
    FooterVue,
  },
  setup() {
    const a = 2
  },
}
</script>

<style lang="less" scoped>
body {
  width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
  text-align: center;
  margin: 0;
  padding: 0;
}
</style>

