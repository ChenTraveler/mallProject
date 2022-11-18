<template>
  <div class="banner">
    <ul>
      <li v-for="(emit,index) in data.data"
          :key="index">
        <!-- 图片 -->
        <router-link to="/zoom/product"
                     @click="detailsCliK(emit.number)"
                     class="pic"><img :src="url + emit.imgs"
               alt=""></router-link>
        <!-- 商品介绍 -->
        <p class="details">
          <router-link to="/zoom/product"
                       @click="detailsCliK(emit.number)">{{emit.title}}</router-link>
        </p>
        <!-- 价格 -->
        <p class="price">￥{{emit.price}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, getCurrentInstance, inject, watch, ref } from 'vue'
import bus from '../../bus.js'

export default {
  setup() {
    const { proxy } = getCurrentInstance()
    const data = reactive({
      data: [],
      // nzs(n) {
      //   return n < 100
      //     ? n
      //     : n < 1000
      //     ? parseInt(n / 100) + '00+'
      //     : n < 10000
      //     ? parseInt(n / 1000) + '000+'
      //     : parseInt(n / 10000) + '万+'
      // },
    })
    proxy.$axios
      .post('/seldata', { table: 'goods' })
      .then((d) => {
        data.data = d.data
        console.log(data.data)
      })
      .catch((err) => console.log(err))
    // data.data = inject('data')
    bus.on('data', (i) => {
      data.data = i
    })
    // console.log(data.data)

    // watch(
    //   () => data.data,
    //   () => console.log(12321312)
    // )

    // const list = reactive([
    //   { src: '../../../public/images/paging/all01.jpg' },
    //   { src: '../../../public/images/paging/all02.jpg' },
    //   { src: '../../../public/images/paging/all03.jpg' },
    //   { src: '../../../public/images/paging/all04.jpg' },
    //   { src: '../../../public/images/paging/all05.jpg' },
    //   { src: '../../../public/images/paging/all06.jpg' },
    //   { src: '../../../public/images/paging/all07.jpg' },
    //   { src: '../../../public/images/paging/all08.jpg' },
    //   { src: '../../../public/images/paging/all09.jpg' },
    //   { src: '../../../public/images/paging/all010.jpg' },
    // ])
    //详情传输数据
    function detailsCliK(v) {
      setTimeout(() => {
        bus.emit('detailsClick', v)
      })
    }
    const url = ref('http://localhost:3000/')
    return {
      data,
      detailsCliK,
      url,
    }
  },
}
</script>

<style lang="stylus" scoped>
.banner {
  width: 100%;
  margin: 0 auto;
  padding-left: 20px;

  ul {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;

    li {
      width: 100%;
      height: 90px;
      padding-bottom: 5px;
      list-style: none;
      display: flex;
      align-items: center;
      margin-top: 10px;
      border-bottom: 2px dotted #999;

      .pic {
        width: 80px;
        height: 80px;

        img {
          width: 80px;
          height: 80px;
        }
      }

      .details {
        margin-left: 10px;
      }

      a {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        color: #666;
        width: 400px;
        font-size: 12px;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      .price {
        color: #c00;
        font-size: 14px;
        font-weight: 700;
      }
    }
  }
}
</style>