<template>
  <div class="results">
    <headers />.
    <mains />
  </div>
</template>

<script>
import headers from './indent/headers.vue'
import mains from './indent/mains.vue'
export default {
  name: 'Results',
  components: { headers, mains },
}
</script>

<style lang="less" scoped>
.results {
  width: 990px;
  margin: 0 auto;
}
</style>