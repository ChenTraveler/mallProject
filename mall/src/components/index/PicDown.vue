<template>
  <div>
   <div
   class="picdown"
   v-for="(emit,index) in picdown"
   :key="index"
   >
    <img 
    :src=emit.src
    alt=""
    />

    <!-- <a href="javascript:;"></a> -->
    <router-link to="/page"></router-link>
   </div>
   <a href="javascript:;" @click="topUp">
    <img src="../../../public/images/index/foot1.jpg" alt="" class="f1">
   </a>
  </div>
 </template>
 
 <script>
 import { reactive } from 'vue'
 import bus from '../../bus.js'// 引入mitt
 export default {
 setup(){
 const picdown = reactive([
 {src:'../../../public/images/index/c2.png',id:'a7'},
 {src:'../../../public/images/index/c3.png',id:'a8'},{src:'../../../public/images/index/c4.png',id:'a9'},
 {src:'../../../public/images/index/c5.png',id:'a10'},{src:'../../../public/images/index/c6.png',id:'a11'},
 {src:'../../../public/images/index/c7.png',id:'a12'},{src:'../../../public/images/index/c8.png',id:'a13'}
 ])


 // 定义一个空数组接收数据
const data = reactive({
  data:[],
  // 点击传送数据
  detailsCliK(v){
    setTimeout(()=>{
      bus.emit('pageClick',v)
    })
  }
})

// 接收数据
bus.on('picDown',(v)=>{
data.data=v
})


 //返回顶部
function topUp(){
  document.documentElement.scrollTop = 0;
 }
 return {
  picdown,
  topUp
 }
 }
 };
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