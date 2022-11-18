<template>
  <div class="war">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
             v-for="(item, i) in data.data"
             :key="i">
          <img :src="url + item.img"
               @click="data.lunboCliK(item.number)" />
          <!-- <img :src="imgs.pic"
               @click="data.lunboCliK(item.number)" /> -->
        </div>
      </div>
      <!-- <div class="swiper-button-prev swiper-button-white"></div>
    <div class="swiper-button-next swiper-button-white"></div> -->
    </div>
  </div>
</template>
<script>
import { reactive, onMounted, getCurrentInstance, ref } from 'vue'
import bus from '../../bus.js' //引入mitt
import Swiper from 'swiper' // 引入库
import 'swiper/css/swiper.css' // 引入样式文件，注意5和6版本的样式文件不一致
import { useRouter } from 'vue-router'

export default {
  name: 'HomeSwiper',
  setup() {
    const $router = useRouter()
    // 解构代理
    const { proxy } = getCurrentInstance()

    // 定义一个空数组接收数据
    const data = reactive({
      data: [],
      // 点击传送数据
      lunboCliK(v) {
        setTimeout(() => {
          bus.emit('detailsClick', v)
          // 跳转相应页面
          $router.push('/zoom/product')
        })
      },
    })

    onMounted(() => {
      setTimeout(() => {
        var mySwiper = new Swiper('.swiper-container', {
          loop: true, // 循环模式选项
          slidesPerView: 3, // 轮播展示几张图
          spaceBetween: 50, // 图片间的距离
          autoplay: true, //自动滚动
          effect: 'carouse', //位移切换
          autoplay: {
            delay: 2000, //2秒切换一次
            disableOnInteraction: false, //拨动之后恢复自动
          },
        })
      }, 1000)
    })
    // let imgs = reactive([
    //   { pic: '../../../public/images/lunbo/01.jpg' },
    //   { pic: '../../../public/images/lunbo/02.jpg' },
    //   { pic: '../../../public/images/lunbo/03.jpg' },
    //   { pic: '../../../public/images/lunbo/04.jpg' },
    //   { pic: '../../../public/images/lunbo/05.jpg' },
    // ])

    // 获取数据
    proxy.$axios
      .post('/seldata', { table: 'homepage', other: `where class="swiper"` })
      .then((d) => {
        data.data = d.data
        console.log(data.data)
      })
      .catch((err) => console.log(err))

    const url = ref('http://192.168.3.21:3000/')

    return {
      // imgs,
      data,
      url,
    }
  },
}
</script>
<style lang="less">
.war {
  background-image: url(../../../public/images/index/b1.jpg);
  background-position: 0 -510px;
  margin: -4px 0 4px 0;

  .swiper-container {
    width: 1200px;
    height: 500px;

    .swiper-slide {
      width: 550px;

      img {
        width: 375px;
        height: 500px;
        object-fit: cover;
      }
    }
  }
}
</style>
