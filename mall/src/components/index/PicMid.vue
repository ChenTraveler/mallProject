<template>
  <div>
    <div class="picmid">
      <ul>
        <li v-for="(emit,index) in picmidl" :key="index">
          <img :src=emit.src alt="">
          <!-- <a href="javascript:;"></a> -->
          <router-link to="/zoom/product" @click="data.detailsCliK(emit.number)"></router-link>
        </li>
      </ul>
    </div>
  </div>
  
 </template>
 
 <script>
 import { reactive } from 'vue'
 import bus from '../../bus.js'// 引入mitt

 export default {
 setup(){
const picmidl = reactive([
{src:'../../../public/images/index/b2.png',id:'b13'},{src:'../../../public/images/index/b3.png',id:'b14'},
{src:'../../../public/images/index/b4.png',id:'b15'},{src:'../../../public/images/index/b5.png',id:'b16'},
{src:'../../../public/images/index/b6.png',id:'b17'},{src:'../../../public/images/index/b7.png',id:'b18'},
{src:'../../../public/images/index/b8.png',id:'b19'},{src:'../../../public/images/index/b9.png',id:'b20'},
{src:'../../../public/images/index/b10.png',id:'b21'},
])


// 定义一个空数组接收数据
const data = reactive({
  data:[],
  // 点击传送数据
  detailsCliK(v){
    setTimeout(()=>{
      bus.emit('detailsClick',v)
    })
  }
})

// 接收数据
bus.on('picMid',(v)=>{
data.data=v
})





return {
  picmidl,
  data
}
 }
 };
 </script>
 
 <style lang="stylus" scoped>
.picmid
  width 1920px
  height 1870px
  margin-top -4px
  background-image url(../../public/images/index/b1.jpg)
  ul
    width 1208px
    margin 0 auto
    display flex
    flex-wrap wrap
    list-style none
    padding-top 377px
    li 
      position relative
      a 
        display block
        width 90%
        height 90%
        position absolute
        left 5%
        top 5%
 </style>