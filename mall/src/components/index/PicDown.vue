<template>
  <div>
    <div class="picdown"
         v-for="(emit,index) in data.data"
         :key="index">
      <img :src="url + emit.img"
           alt="" />

      <!-- <a href="javascript:;"></a> -->
      <router-link to="/page"
                   @click="data.detailsClick(index+2)"></router-link>
    </div>
    <a href="javascript:;"
       @click="topUp">
      <img src="../../../public/images/index/foot1.jpg"
           alt=""
           class="f1">
    </a>
  </div>
</template>
 
 <script>
import { reactive, ref,getCurrentInstance } from 'vue'
import bus from '../../bus.js' // 引入mitt
export default {
  setup() {
    const { proxy } = getCurrentInstance()
    // const picdown = reactive([
    //   { src: '../../../public/images/index/c2.png', id: 'a7' },
    //   { src: '../../../public/images/index/c3.png', id: 'a8' },
    //   { src: '../../../public/images/index/c4.png', id: 'a9' },
    //   { src: '../../../public/images/index/c5.png', id: 'a10' },
    //   { src: '../../../public/images/index/c6.png', id: 'a11' },
    //   { src: '../../../public/images/index/c7.png', id: 'a12' },
    //   { src: '../../../public/images/index/c8.png', id: 'a13' },
    // ])

    // 定义一个空数组接收数据
    const data = reactive({
      data: [],
      // 点击传送数据
      detailsClick(v) {
        setTimeout(() => {
          console.log(v)
          bus.emit('pageClick', v)
        }, 100)
      },
    })
  // 获取数据
  proxy.$axios
      .post('/seldata', { table: 'homepage',other:`where class="foot"` })
      .then((d) => {
        data.data = d.data
        console.log(data.data);
      })
      .catch((err) => console.log(err))

      const url = ref('http://192.168.3.21:3000/')
   

    //返回顶部
    function topUp() {
      document.documentElement.scrollTop = 0
    }
    return {
      data,
      topUp,
      url
    }
  },
}
</script>
 
<style lang="stylus" scoped>
.picdown
  position relative
  a
    position absolute
    top 5%
    left 50%
    margin-left -600px
    display block
    width 1200px
    height 80%
  img
    margin-top -4px
.f1
  margin-top -4px
</style>