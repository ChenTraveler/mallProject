<template>
  <div>
    <div class="picmid">
      <ul>
        <li v-for="(emit,index) in data.data" :key="index">
          <img :src="url + emit.img" alt="">
          <!-- <a href="javascript:;"></a> -->
          <router-link to="/zoom/product" @click="data.detailsCliK(emit.number)"></router-link>
        </li>
      </ul>
    </div>
  </div>
  
 </template>
 
 <script>
 import { reactive,ref,getCurrentInstance } from 'vue'
 import bus from '../../bus.js'// 引入mitt

 export default {
 setup(){

  // 解构代理
  const { proxy } = getCurrentInstance()

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

// 获取数据
  proxy.$axios
      .post('/seldata', { table: 'homepage',other:`where class="jgg"` })
      .then((d) => {
        data.data = d.data
        console.log(data.data);
      })
      .catch((err) => console.log(err))

    const url = ref('http://192.168.3.21:3000/')

return {
  data,
  url
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