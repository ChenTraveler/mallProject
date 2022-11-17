<template v-cloak>
  <router-view></router-view>
</template>

<script>
import { ref } from 'vue'
import afterVue from './components/afterVue.vue'
export default {
  components: {
    afterVue
  },
  setup () { },
}
</script>

<style lang="less" scoped>
[v-cloak] {
  display: none !important;
}
*{
  background-color: #f7faf9;
}

</style>