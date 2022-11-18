<template>

  <div>
    <div class="picup"
         v-for="(emit,index) in data.data"
         :key="index">
      <img :src="url + emit.img"
           alt="" />

      <!-- <a href="javascript:;"></a> -->
      <router-link to="/zoom/product"
                   @click="data.detailsCliK(emit.number)"></router-link>
    </div>
  </div>

</template>
 
 <script>
import { reactive, getCurrentInstance,ref} from 'vue'
import bus from '../../bus.js' // 引入mitt
export default {
  setup() {
        // 解构代理
        const { proxy } = getCurrentInstance()
    // const picuptow = reactive([
    //   { src: '../../../public/images/index/a4.png', id: 'b1' },
    //   { src: '../../../public/images/index/a5.png', id: 'b2' },
    //   { src: '../../../public/images/index/a6.png', id: 'b3' },
    //   { src: '../../../public/images/index/a8.png', id: 'b4' },
    //   { src: '../../../public/images/index/a9.png', id: 'b5' },
    //   { src: '../../../public/images/index/a10.png', id: 'b6' },
    //   { src: '../../../public/images/index/a11.png', id: 'b7' },
    //   { src: '../../../public/images/index/a12.png', id: 'b8' },
    //   { src: '../../../public/images/index/a13.png', id: 'b9' },
    //   { src: '../../../public/images/index/a15.png', id: 'b10' },
    //   { src: '../../../public/images/index/a16.png', id: 'b11' },
    //   { src: '../../../public/images/index/a17.png', id: 'b12' },
    // ])

    // 定义一个空数组接收数据
    const data = reactive({
      data: [],
      // 点击传送数据
      detailsCliK(v) {
        setTimeout(() => {
          bus.emit('detailsClick', v)
        })
      },
    })
     // 获取数据
  proxy.$axios
      .post('/seldata', { table: 'homepage',other:`where class="main"` })
      .then((d) => {
        data.data = d.data
        console.log(data.data);
      })
      .catch((err) => console.log(err))

    const url = ref('http://192.168.3.21:3000/')

    return {
      
      data,
      url,
    }
  },
}
</script>
 
 <style lang="stylus" scoped>
 .picup {
   position: relative;

   a {
     position: absolute;
     top: 20%;
     left: 50%;
     margin-left: -600px;
     display: block;
     width: 1200px;
     height: 70%;
   }
 }

 div {
   margin-top: -4px;
 }
</style>