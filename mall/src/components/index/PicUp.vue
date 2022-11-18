<template>
  <div>
    <div class="picup"
         v-for="(emit,index) in data.data"
         :key="emit.number">

      <img :src="url+ emit.img"
           alt="" />

      <!-- <a href="javascript:;" @click="fn(emit)"></a> -->
      <router-link to="/page"
                   @click="data.detailsClick(index)"></router-link>
      <!-- <a href="javascript:;"  @click="data.indexCliK(emit.number)"></a> -->
    </div>
  </div>

</template>

<script>
import { ref, reactive, getCurrentInstance,  } from 'vue'
import bus from '../../bus.js' // 引入mitt
export default {
  setup() {
    // 解构代理
    const { proxy } = getCurrentInstance()

    // 定义一个空数组接收数据
    const data = reactive({
      data: [],
      // 点击传送数据
      detailsClick(v) {
        // console.log(v)
        setTimeout(() => {
          // bus.emit('pageClicK',v)
          bus.emit('pageClik', v + 2)
        }, 10)
      },
    })
    // 获取数据
    proxy.$axios
      .post('/seldata', { table: 'homepage',other:`where class="head"` })
      .then((d) => {
        data.data = d.data
        console.log(data.data);
      })
      .catch((err) => console.log(err))
    
 
    
      const url = ref('http://localhost:3000/')

    return {
      data,
      url,
    }
  },
}
</script>

<style lang="stylus" scoped>
.picup
  position relative
  a
    position absolute
    top 20%
    left 50%
    margin-left -600px
    display block
    width 1200px
    height 70%
  img
    width 100%
div
  margin-top -4px
</style>