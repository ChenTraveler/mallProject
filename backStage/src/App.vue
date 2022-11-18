<template v-cloak>
  <router-view></router-view>
</template>

<script>
import * as echarts from 'echarts'
import { provide } from 'vue'

export default {
  name: 'App',
  setup () {
    provide('ec', echarts)//provide
  },
  components: {
  }
}
</script>

<style lang="less" scoped>
[v-cloak] {
  display: none !important;
}
* {
  background-color: #f7faf9;
}

</style>