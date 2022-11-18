<template>
  <div class="app">
    <router-view></router-view>
  </div>

</template>

<script>
import { onMounted } from 'vue'
export default {
  components: {},
  setup() {
    window.addEventListener('beforeunload', (e) => {
      window.scroll(0, 0)
    })
    onMounted(() => {
      window.addEventListener('beforeunload', (e) => {
        window.scroll(0, 0)
      })
    })
  },
}
</script>

<style lang="less">
html {
  // overflow-y: scroll;
}
body {
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
* {
  padding: 0;
  margin: 0;
}
</style>

