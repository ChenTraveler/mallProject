<template>
 <div>
  <div
  class="picup"
  v-for="(emit) in data.data"
  :key="emit.number">
  
  <img 
  :src=emit.imgs
  alt=""/>

  <!-- <a href="javascript:;" @click="fn(emit)"></a> -->
  <router-link to="/page"  @click="data.detailsClick" ></router-link>
  <!-- <a href="javascript:;"  @click="data.indexCliK(emit.number)"></a> -->
  </div>
 </div>
 
</template>

<script>
import {reactive,getCurrentInstance,inject,onBeforeUnmount} from 'vue'
import bus from '../../bus.js'// 引入mitt
export default {
setup(){


// 解构代理
const { proxy } = getCurrentInstance();



  // 定义一个空数组接收数据
const data = reactive({
  sui:0,
  data:[],
  // 点击传送数据
  detailsClick(){
    data.sui=Math.floor(Math.random()*6)+3
    console.log(data.sui);
    setTimeout(()=>{
      // bus.emit('pageClicK',v) 
      bus.emit('pageClik',data.sui)
    })
  }
})


// 接收父组件传来的数据
bus.on('picUp',(v)=>{
  // console.log(v);
  data.data=v
  // console.log(data.data);
})
onBeforeUnmount(() => {
      bus.off('detailsCliK')
    })


return {
  data
}

}
};
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
div
  margin-top -4px
</style>